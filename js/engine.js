// 题型引擎：抽题、渲染、判分（单选/判断/填空/连线/排序/完形）
(function () {
  const ALL = [];
  function init() {
    if (!ALL.length) ALL.push(...window.BANK_MA, ...window.BANK_CN, ...window.BANK_EN);
  }
  function byUnit(subject, term, unit) { init(); return ALL.filter(q => q.subject === subject && q.term === term && q.unit === unit); }
  function bySubject(subject) { init(); return ALL.filter(q => q.subject === subject); }

  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // 关卡抽题：lv1 基础 8 题 / lv2 进阶 10 题 / lv3 Boss 12 题
  function pickLevel(subject, term, unit, lv) {
    const pool = byUnit(subject, term, unit);
    const want = lv === 1 ? 8 : lv === 2 ? 10 : 12;
    let sel = [];
    if (lv === 1) sel = pool.filter(q => q.difficulty <= 1);
    else if (lv === 2) sel = pool.filter(q => q.difficulty === 2);
    else sel = pool.filter(q => q.difficulty >= 2 || (q.tags && q.tags.includes("易错")));
    if (sel.length < want) sel = pool.filter(q => !sel.includes(q)).concat(sel);
    return shuffle(sel).slice(0, Math.min(want, sel.length));
  }
  // 测验抽题
  function pickTest(kind, subject, term, unit) {
    let pool;
    if (kind === "unit") pool = byUnit(subject, term, unit);
    else if (kind === "final") pool = bySubject(subject).filter(q => q.term === term);
    else pool = bySubject(subject); // 小升初模拟
    return shuffle(pool).slice(0, Math.min(kind === "unit" ? 20 : 40, pool.length));
  }
  // 专项包：按关键词
  function pickSpecial(subject, keywords, count) {
    init();
    const pool = ALL.filter(q => q.subject === subject && q.kp.some(k => keywords.some(w => k.includes(w) || w.includes(k)))
      || (q.tags && q.tags.some(t => keywords.some(w => t.includes(w)))));
    return shuffle(pool.length >= count ? pool : ALL.filter(q => q.subject === subject)).slice(0, count);
  }

  // ===== 判分工具 =====
  function norm(s) { return String(s == null ? "" : s).replace(/[\s　,，.。;；:：'’"“”！?？、（）()]/g, "").toLowerCase(); }
  function isNum(s) { return /^[-+]?\d+(\.\d+)?$/.test(String(s).replace(/／/g, "/").trim()); }
  function numEq(a, b) { const x = parseFloat(a), y = parseFloat(b); if (isNaN(x) || isNaN(y)) return false; return Math.abs(x - y) < 0.011; }
  function similarity(a, b) {
    a = norm(a); b = norm(b);
    if (!a.length || !b.length) return 0;
    let hit = 0;
    const counts = {};
    for (const ch of a) counts[ch] = (counts[ch] || 0) + 1;
    for (const ch of b) { if (counts[ch] > 0) { hit++; counts[ch]--; } }
    return (2 * hit) / (a.length + b.length);
  }
  // 填空判分：支持 | 多答案；返回 {ok, typo}
  function checkFill(input, answer) {
    const alts = String(answer).split("|").map(s => s.trim());
    const val = norm(input);
    if (!val) return { ok: false, typo: false };
    for (const alt of alts) {
      const ans = norm(alt);
      if (val === ans) return { ok: true, typo: false };
      if (isNum(input) && isNum(alt) && numEq(input, alt)) return { ok: true, typo: false };
      if (ans && !isNum(ans) && similarity(input, ans) >= 0.82 && Math.abs(val.length - ans.length) <= 1) return { ok: true, typo: true };
    }
    return { ok: false, typo: false };
  }
  function judge(q, ans) {
    switch (q.type) {
      case "choice": case "judge": return { ok: ans === q.answer };
      case "fill": return checkFill(ans, q.answer);
      case "cloze": {
        const details = q.answer.map((a, i) => ({ ok: ans && ans[i] === a, picked: ans ? ans[i] : null }));
        return { ok: details.every(d => d.ok), details };
      }
      case "match": {
        if (!ans || !Array.isArray(ans)) return { ok: false };
        return { ok: ans.every((v, i) => v === q.answer[i]) };
      }
      case "order": {
        if (!ans || !Array.isArray(ans)) return { ok: false };
        return { ok: ans.length === q.answer.length && ans.every((v, i) => v === q.answer[i]) };
      }
    }
    return { ok: false };
  }

  // ===== 渲染 =====
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function renderQ(q, ctx) {
    const typeLabel = { choice: "选择题", fill: "填空题", judge: "判断题", match: "连线题", order: "排序题", cloze: "完形填空" }[q.type] || "题目";
    const typeTag = q.audioText ? '<span class="tag warn">🎧 听读句</span>' : "";
    let head = '<div class="muted" style="margin-top:6px"><span class="tag">' + typeLabel + '</span>' + typeTag + '<span class="tag pink">' + esc(q.kp.join(" / ")) + '</span></div>';
    let stem = '<div class="q-stem">' + esc(q.stem).replace(/____/g, '<span class="blank">____</span>') + '</div>';
    let body = "";
    if (q.type === "choice") {
      const multi = q.answer.length > 1;
      body = '<div id="ans" data-type="choice">' + q.options.map((o, i) =>
        '<button class="opt-btn" data-opt="' + "ABCD"[i] + '">' + (multi ? '☐' : '⭕') + " " + esc(o) + '</button>').join("") + '</div>';
    } else if (q.type === "judge") {
      body = '<div id="ans" data-type="judge"><button class="opt-btn" data-opt="对">✔️ 对</button><button class="opt-btn" data-opt="错">✖️ 错</button></div>';
    } else if (q.type === "fill") {
      // 题干用 ____ 或（　）占位；无占位符时按单空处理
      const blanks = Math.max(1, (q.stem.match(/____/g) || []).length);
      body = '<div id="ans" data-type="fill" data-blanks="' + blanks + '">' +
        Array.from({ length: blanks }, (_, i) => '<input class="fill-input" style="margin-bottom:10px" placeholder="在这里输入第 ' + (i + 1) + ' 空的答案" data-fill="' + i + '">').join("") + '</div>';
    } else if (q.type === "cloze") {
      body = '<div id="ans" data-type="cloze">';
      q.clozeItems.forEach((opts, bi) => {
        body += '<div style="margin-bottom:12px"><div class="muted" style="font-weight:700">第 ' + (bi + 1) + ' 空</div>' +
          opts.map(o => '<button class="opt-btn small" data-blank="' + bi + '" data-opt="' + o.slice(0, 1) + '" style="display:inline-block;width:auto;margin:4px 6px 4px 0;padding:9px 14px">' + esc(o) + '</button>').join("") + '</div>';
      });
      body += '</div>';
    } else if (q.type === "match") {
      body = '<div id="ans" data-type="match"><div class="muted">先点左边一项，再点右边配对</div><div class="row wrap" style="align-items:flex-start">';
      body += '<div style="flex:1">' + q.options.left.map((l, i) => '<div class="match-cell" data-side="L" data-i="' + i + '">' + esc(l) + '</div>').join("") + '</div>';
      body += '<div style="flex:1">' + q.options.right.map((r, i) => '<div class="match-cell" data-side="R" data-i="' + i + '">' + esc(r) + '</div>').join("") + '</div>';
      body += '</div></div>';
    } else if (q.type === "order") {
      body = '<div id="ans" data-type="order"><div class="muted">按正确顺序依次点击</div>' +
        q.options.map((o, i) => '<div class="order-item" data-i="' + i + '">' + esc(o) + '</div>').join("") + '</div>';
    }
    return head + stem + body;
  }

  // 读取当前作答
  function read(q, ctx) {
    const ansEl = document.getElementById("ans");
    if (!ansEl) return null;
    const t = ansEl.dataset.type;
    if (t === "choice") return ctx.sel || null;
    if (t === "judge") return ctx.sel || null;
    if (t === "fill") {
      const inputs = ansEl.querySelectorAll("input[data-fill]");
      if (inputs.length <= 1) return inputs[0] ? inputs[0].value : "";
      return Array.from(inputs).map(i => i.value).join(";;");
    }
    if (t === "cloze") return ctx.cloze || null;
    if (t === "match") return ctx.matchPairs || null;
    if (t === "order") return ctx.orderSel || null;
    return null;
  }

  // 标记正确/错误的 UI
  function mark(q, ctx, res) {
    const ansEl = document.getElementById("ans");
    if (!ansEl) return;
    if (q.type === "choice" || q.type === "judge") {
      ansEl.querySelectorAll(".opt-btn").forEach(b => {
        if (b.dataset.opt === q.answer) b.classList.add("correct");
        else if (b.classList.contains("sel") && !res.ok) b.classList.add("wrong");
        b.disabled = true;
      });
    } else if (q.type === "cloze") {
      ansEl.querySelectorAll(".opt-btn").forEach(b => { b.disabled = true; });
    } else if (q.type === "match") {
      ansEl.querySelectorAll(".match-cell").forEach(c => { c.classList.remove("sel"); c.classList.add("done"); });
    } else if (q.type === "order") {
      ansEl.querySelectorAll(".order-item").forEach(c => c.classList.remove("sel"));
    }
  }

  // 分步解析（数学题解析已含步骤）
  function showAnalysis(q) {
    const fb = document.getElementById("fb");
    fb.className = "feedback-banner";
    return '<div class="ana">📖 解析：' + esc(q.analysis) + '</div>';
  }

  window.Engine = { pickLevel, pickTest, pickSpecial, judge, checkFill, renderQ, read, mark, showAnalysis, norm, shuffle, byUnit, bySubject, esc, ALL };
  init(); // 数据文件先于本文件加载，直接初始化全量题库
})();
