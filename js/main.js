// 主控制器：路由、答题交互、计时、音效、护眼提醒、PWA
(function () {
  const App = {
    screen: "boot", island: "ma", run: null, shopCat: "hair", shopExpr: "welcome",
    wrongFilter: "all", radarSubject: "ma", cardSubject: "cn",
    parentUnlocked: false, _navVisible: false, _achQueue: [], _lastBreak: 0, _lastLimitToast: 0, _tick: null,
    _hist: [],          // 页面返回栈

    // ===== 基础 UI =====
    setScreen(html, nav) {
      // 自动存档：任何页面渲染后保存当前进度（防退出丢档）
      if (Game.S) Game.save();
      // 返回上一页悬浮按钮（启动页和首页除外）
      if (this.screen && this.screen !== "boot" && this.screen !== "home" && !html.includes("app-back-btn")) {
        html = '<button class="btn small plain app-back-btn" id="appBackBtn" style="margin:0 4px 8px" onclick="App.back()">← 返回</button>' + html;
      }
      document.getElementById("app").innerHTML = html;
      this._navVisible = !!nav;
      const navEl = document.getElementById("nav");
      if (navEl) navEl.style.display = nav ? "flex" : "none";
      window.scrollTo(0, 0);
    },

    back() {
      // 答题页返回需确认（关卡会作废）
      if (this.screen === "quiz" && this.run && !this.run.finished) {
        this.modal("<h3>确定要退出吗？</h3><div class='muted' style='margin:6px 0'>退出后本次答题将作废，不计积分。</div>", () => {
          if (this._tick) { clearInterval(this._tick); this._tick = null; }
          Game.endPractice();
          this.run = null;
          const prev = this._hist.pop() || "home";
          this.go(prev === "quiz" ? "home" : prev);
        }, "退出");
        return;
      }
      const prev = this._hist.pop() || "home";
      this.go(prev === "quiz" ? "home" : prev);
    },
    toast(msg, ms) {
      const t = document.createElement("div");
      t.className = "toast"; t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), ms || 2200);
    },
    modal(html, onOk, okText) {
      const m = document.createElement("div");
      m.className = "modal-mask";
      m.innerHTML = '<div class="modal">' + html + '<div style="margin-top:14px"><button class="btn block" id="mOk">' + (okText || "好的") + '</button></div></div>';
      document.body.appendChild(m);
      m.querySelector("#mOk").onclick = () => { if (onOk) onOk(); m.remove(); };
    },

    // ===== 音效（WebAudio，默认关） =====
    beep(kind) {
      if (!Game.S || !Game.S.settings.sound) return;
      try {
        const ctx = this._audio || (this._audio = new (window.AudioContext || window.webkitAudioContext)());
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.frequency.value = kind === "ok" ? 880 : kind === "great" ? 1174 : 330;
        o.type = "sine";
        g.gain.setValueAtTime(.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .25);
        o.start(); o.stop(ctx.currentTime + .26);
      } catch (e) { }
    },

    // ===== 朗读 =====
    speak(text) {
      if (!("speechSynthesis" in window)) { this.toast("当前浏览器不支持朗读"); return; }
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; u.rate = .95;
      speechSynthesis.speak(u);
    },
    speakQ() {
      if (!this.run) return;
      const q = this.run.qs[this.run.idx];
      let t = q.stem;
      if (q.type === "choice" && q.options) t += "。选项：" + q.options.join("；");
      if (q.type === "judge") t += "。对，还是错？";
      if (q.audioText) t = "请听读：" + q.audioText + "。" + t;
      this.speak(t);
    },

    // ===== 路由 =====
    go(screen) {
      // 记录返回栈（同页跳转、回退不重复入栈）
      if (this.screen && this.screen !== screen && screen !== "quiz") this._hist.push(this.screen);
      if (screen === "boot") this._hist = [];
      this.screen = screen;
      if (this.run && this.run.mode === "level" && screen !== "quiz" && this._tick) { clearInterval(this._tick); this._tick = null; Game.endPractice(); }
      const map = { boot: "boot", home: "home", shop: "shop", tests: "tests", shengchu: "shengchu", cards: "cards", wrongbook: "wrongbook", report: "report", achs: "achs", parent: "parent", rank: "rank" };
      if (map[screen]) { Views[map[screen]](); }
      else if (screen === "quiz") Views.quiz();
      this.markNav(screen);
    },
    markNav(screen) {
      document.querySelectorAll(".bottom-nav button").forEach(b => {
        b.classList.toggle("active", b.dataset.go === screen || (screen === "shengchu" && b.dataset.go === "tests") || (screen === "achs" && b.dataset.go === "home") || (screen === "parent" && b.dataset.go === "home") || (screen === "cards" && b.dataset.go === "tests"));
      });
    },
    goIsland(s) { this.island = s; this.go("home"); },

    // ===== 存档 =====
    pickSlot(i) {
      const st = Store.load(i);
      Game.start(i, st);
      const html = document.documentElement;
      html.classList.toggle("fs-big", st.settings.fontSize === "big");
      html.classList.toggle("fs-huge", st.settings.fontSize === "huge");
      this.island = "ma";
      this.go("home");
      if (!st.settings.pin) this.modal("👋 欢迎来到学习岛！<div class='muted' style='margin-top:6px'>家长模式初始 PIN 为 1234，可在家长模式中修改。</div>");
    },
    newSlot(i) {
      this.modal("<h3>创建存档 " + (i + 1) + "</h3><input class='fill-input' id='nmIn' placeholder='给自己起个名字' maxlength='8'>", () => {
        const nm = (document.getElementById("nmIn").value || "小同学").trim().slice(0, 8);
        Game.start(i, Store.defaults(nm));
        this.go("home");
      }, "开始冒险");
    },

    // ===== 关卡 =====
    termOf(subject, unit) {
      const m = window.UNIT_META[subject];
      return unit <= m["6上"].length ? "6上" : "6下";
    },
    startLevel(unit, lv) {
      const s = this.island, term = this.termOf(s, unit);
      const qs = Engine.pickLevel(s, term, unit, lv);
      if (!qs.length) { this.toast("该单元题目准备中"); return; }
      this.run = {
        mode: "level", subject: s, term, unit, lv, qs, idx: 0,
        hearts: 3, streak: 0, score: 0, correct: 0, wrongCount: 0, wrongQs: [], answers: {},
        sel: null, cloze: null, matchPairs: null, orderSel: null
      };
      this.go("quiz");
    },
    startUnitTest(unit) {
      const s = this.island, term = this.termOf(s, unit);
      const qs = Engine.pickTest("unit", s, term, unit);
      this.run = {
        mode: "unit", subject: s, term, unit, qs, idx: 0, hearts: null,
        correct: 0, wrongQs: [], answers: {}, perQ: 5, maxScore: 100, timer: 30 * 60,
        sel: null, cloze: null, matchPairs: null, orderSel: null, back: "tests"
      };
      this.lastTest = JSON.parse(JSON.stringify({ kind: "unit", s, term, unit }));
      this.go("quiz"); this._startTimer();
    },
    startFinal(term) {
      const s = this.island;
      const qs = Engine.pickTest("final", s, term);
      this.run = { mode: "final", subject: s, term, qs, idx: 0, correct: 0, wrongQs: [], answers: {}, perQ: 2.5, maxScore: 100, timer: 40 * 60, sel: null, cloze: null, matchPairs: null, orderSel: null, back: "tests" };
      this.lastTest = { kind: "final", s, term };
      this.go("quiz"); this._startTimer();
    },
    startSC(s, i) {
      const qs = Engine.pickTest("sc", s);
      this.run = { mode: "sc", subject: s, qs, idx: 0, correct: 0, wrongQs: [], answers: {}, perQ: 2.5, maxScore: 100, timer: 60 * 60, sel: null, cloze: null, matchPairs: null, orderSel: null, back: "shengchu", scIdx: i };
      this.lastTest = { kind: "sc", s, i };
      this.go("quiz"); this._startTimer();
    },
    startSpecial(s, i) {
      const PACKS = {
        cn: [["字词", "读音", "字形", "近义词", "多音字"], ["古诗词默写", "文言文默写", "课文默写"], ["修改病句", "句式转换", "修辞辨析", "关联词"], ["阅读理解", "说明方法", "描写方法"]],
        ma: [["计算", "简算"], ["应用题", "百分数", "折扣", "利率"], ["比例", "比例尺", "正反比例", "圆", "圆柱"], ["行程", "工程问题", "和差倍", "浓度"]],
        en: [["一般现在时", "一般过去时", "一般将来时", "现在进行时"], ["过去式", "比较级", "词形变化"], ["完形填空"], ["书面表达", "句型", "阅读理解"]]
      };
      const qs = Engine.pickSpecial(s, PACKS[s][i], 10);
      this.run = { mode: "sp", subject: s, qs, idx: 0, correct: 0, wrongQs: [], answers: {}, sel: null, cloze: null, matchPairs: null, orderSel: null, back: "shengchu" };
      this.go("quiz");
    },
    startRetry() {
      const S = Game.S;
      const list = Object.values(S.wrong).filter(w => (this.wrongFilter === "all" || w.subject === this.wrongFilter));
      if (!list.length) { this.toast("错题本是空的，太棒了！"); return; }
      const qs = Engine.shuffle(list.map(w => Engine.ALL.find(q => q.id === w.qid)).filter(Boolean)).slice(0, 10);
      if (!qs.length) { this.toast("错题数据加载中"); return; }
      this.run = { mode: "retry", subject: this.wrongFilter === "all" ? qs[0].subject : this.wrongFilter, qs, idx: 0, hearts: null, correct: 0, wrongQs: [], answers: {}, gained: 0, sel: null, cloze: null, matchPairs: null, orderSel: null };
      Game.S.stats.retryCount = (Game.S.stats.retryCount || 0) + 0;
      this.go("quiz");
    },
    retest() {
      if (!this.lastTest) { this.go("tests"); return; }
      const t = this.lastTest;
      if (t.kind === "unit") { this.island = t.s; this.startUnitTest(t.unit); }
      else if (t.kind === "final") { this.island = t.s; this.startFinal(t.term); }
      else { this.startSC(t.s, t.i); }
    },

    _startTimer() {
      if (this._tick) clearInterval(this._tick);
      this._tick = setInterval(() => {
        const R = this.run;
        if (!R || R.timer === undefined || R.finished) { clearInterval(this._tick); this._tick = null; return; }
        R.timer--;
        const el = document.getElementById("timer");
        if (el) { el.textContent = "⏱ " + this.fmtTime(R.timer); el.classList.toggle("urgent", R.timer < 120); }
        if (R.timer <= 0) { R.finished = true; clearInterval(this._tick); this._tick = null; this.toast("⏰ 时间到！"); this._finishTest(true); }
      }, 1000);
    },
    fmtTime(s) { s = Math.max(0, s); const m = Math.floor(s / 60); return m + ":" + String(s % 60).padStart(2, "0"); },

    // ===== 答题 =====
    submitQ() {
      const R = this.run, q = R.qs[R.idx];
      if (!R.judged) {
        const ans = Engine.read(q, R);
        const res = Engine.judge(q, ans);
        R.judged = true; R.res = res; R.myAns = ans;
        Engine.mark(q, R, res);
        if (res.ok) {
          R.streak = (R.streak || 0) + 1;
          R.correct++;
          R.answers[q.id] = true;
          Game.recordAnswer(q, true, ans, R.mode === "retry");
          this.beep(res.typo ? "err" : R.streak >= 3 ? "great" : "ok");
          if (R.mode === "level") {
            let pts = 10 * (q.difficulty || 1);
            if (R.streak >= 3) pts += Math.min((R.streak - 2) * 5, 30);
            R.score += pts;
          } else if (R.mode === "retry") { R.gained += 5; }
          if (res.typo) App.toast("✅ 正确！但注意有错别字哦～");
        } else {
          R.streak = 0;
          R.answers[q.id] = false;
          Game.recordAnswer(q, false, ans, R.mode === "retry");
          R.wrongQs.push(q);
          this.beep("err");
          if (R.mode === "level") { R.hearts--; R.wrongCount++; }
        }
        // 反馈
        const fb = document.getElementById("fb");
        const correctText = q.type === "match" ? q.options.left.map((l, i) => l + " → " + q.options.right[q.answer[i]]).join("；") : String(q.answer);
        fb.className = "feedback-banner " + (res.ok ? "good" : "bad");
        fb.innerHTML = (res.ok ? "🎉 回答正确！" + (R.streak >= 3 ? " 🔥连对 " + R.streak : "") : "💡 正确答案：" + Engine.esc(correctText)) + Engine.showAnalysis(q);
        document.getElementById("submitBtn").textContent = R.idx === R.qs.length - 1 ? "查看结算" : "下一题";
        // 心尽
        if (R.mode === "level" && R.hearts <= 0) {
          document.getElementById("submitBtn").textContent = "心尽啦，看看结果";
        }
        Game.save();
      } else {
        // 下一题 / 结算
        R.judged = false; R.sel = null;
        if (R.mode === "level" && R.hearts <= 0) { this._finishLevel(true); return; }
        if (R.idx < R.qs.length - 1) { R.idx++; this.go("quiz"); }
        else {
          if (R.mode === "level") this._finishLevel(false);
          else if (R.mode === "retry") this._finishRetry();
          else this._finishTest(false);
        }
      }
    },

    _finishLevel(failed) {
      const R = this.run;
      Game.endPractice();
      const res = Game.finishLevel(R.subject, R.term, R.unit, R.lv, R.wrongCount, R.qs.length, R.score, failed);
      const achs = Game.checkAchievements();
      if (res.stars > 0 && R.lv < 3 && failed === false) res.nextLevel = R.lv + 1;
      res.unit = R.unit; res.lv = R.lv; res.subject = R.subject;
      res.retry = true;
      res.statsLine = R.correct + " / " + R.qs.length;
      this.run = null;
      this.go("home");
      Views.result(res);
      this._showAchs(achs);
      if (failed) this.beep("err");
      if (Game.overLimit()) this.toast("⏰ 今日练习时长已达上限（家长设置），适当休息一下吧～", 3200);
    },

    _finishRetry() {
      const R = this.run;
      Game.endPractice();
      if (R.gained > 0) Game.addPoints(R.gained, "错题重练");
      const achs = Game.checkAchievements();
      this.run = null;
      this.modal("<h3>⚡ 重练完成</h3><div style='font-size:1.4rem;font-weight:900;color:var(--teal-dark);margin:8px 0'>答对 " + R.correct + " / " + R.qs.length + "</div><div class='muted'>获得 " + R.gained + " 积分（一半积分）· 连对 2 次自动移出错题本</div>", () => this.go("wrongbook"));
      this._showAchs(achs);
    },

    _finishTest(timeout) {
      const R = this.run;
      if (this._tick) { clearInterval(this._tick); this._tick = null; }
      Game.endPractice();
      const score = Math.round(R.correct * R.perQ);
      let key = null, kind = R.mode;
      if (R.mode === "unit") key = "ut-" + R.subject + "-" + R.term + "-" + R.unit;
      if (R.mode === "final") key = "final-" + R.subject + "-" + R.term;
      if (R.mode === "sc") key = "sc-" + R.subject + "-" + R.scIdx;
      let achs = [];
      if (key) { Game.recordTest(kind, key, score, R.maxScore, R.subject); achs = Game.checkAchievements(); }
      else { // 专项包：按答对给积分
        if (R.correct > 0) Game.addPoints(R.correct * 10, "专项突破");
        achs = Game.checkAchievements();
      }
      const pct = Math.round(score / R.maxScore * 100);
      this.run = null;
      this.go("home");
      Views.testReport({
        score, maxScore: R.maxScore, pct, qs: R.qs, answers: R.answers, wrongQs: R.wrongQs,
        canRetest: !!key, back: R.back
      });
      this._showAchs(achs);
    },
    _showAchs(list) {
      if (!list || !list.length) return;
      const items = list.map(id => window.ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean);
      this.modal("<h3>🏅 达成新成就！</h3>" + items.map(a => "<div style='font-size:1.9rem'>" + a.emoji + "</div><div style='font-weight:800'>" + a.name + "</div><div class='muted' style='margin:4px 0 10px'>" + a.desc + "</div>").join(""));
    },

    // ===== 装扮 =====
    shopCat(c) { this.shopCat = c; Views.shop(); },
    cycleShopExpr() { const list = ["welcome", "think", "surprise", "cheer", "sad", "encourage"]; this.shopExpr = list[(list.indexOf(this.shopExpr) + 1) % list.length]; Views.shop(); },
    buy(id) {
      const item = window.DRESSUP_BY_ID[id];
      if (Game.buy(id)) {
        if (item.cat === "pet") {
          this.shopCat = "pet"; // 自动切到宠物分类，展示喂养面板
          this.toast("🐣 已领养「" + item.name + "」，它出战啦！记得每天喂食哦");
        } else {
          Game.equip(item.cat, id);
          this.toast("🎉 已购买并穿上「" + item.name + "」");
        }
        this.beep("great");
        Game.save();
        Views.shop();
      } else this.toast("积分不足或暂未解锁");
    },
    equip(cat, id) { Game.equip(cat, id); this.toast("已穿戴"); Views.shop(); },

    // ===== 宠物 =====
    feedPet(id) {
      const res = Game.feedPet(id);
      if (res.ok) {
        this.beep(res.lvUp ? "great" : "ok");
        this.toast(res.lvUp ? "🎉 升级啦！宠物 Lv." + res.lv : "🍖 喂食成功，成长 +10");
        Views.shop();
      } else this.toast(res.msg);
    },
    equipPet(id) { Game.equipPet(id); Views.shop(); },
    equipPetAcc(paccId) {
      const res = Game.equipPetAcc(paccId);
      if (res.ok) { this.toast("已为宠物换上装扮"); Views.shop(); }
      else this.toast(res.msg);
    },

    // ===== 家长模式 =====
    tryPin() {
      const pin = document.getElementById("pinIn").value;
      const st = Game.S.settings.pin || "1234";
      if (pin === st) { this.parentUnlocked = true; this.go("parent"); }
      else this.toast("PIN 不正确");
    },
    changePin() {
      this.modal("<h3>修改 PIN</h3><input class='pin-input' id='npIn' type='password' inputmode='numeric' maxlength='4' placeholder='新 4 位 PIN'>", () => {
        const v = document.getElementById("npIn").value;
        if (/^\d{4}$/.test(v)) { Game.S.settings.pin = v; Game.save(); this.toast("PIN 已修改"); }
        else this.toast("必须是 4 位数字");
      }, "保存");
    },
    setLimit(m) { Game.S.settings.limitMin = m; Game.save(); this.toast("每日上限已设为 " + m + " 分钟"); Views.parent(); },
    setQuiet() {
      const s = +document.getElementById("qsH").value, e = +document.getElementById("qeH").value;
      Game.S.settings.quietStart = s; Game.S.settings.quietEnd = e; Game.save(); this.toast("免打扰时段已保存");
    },
    setFont(f) { Game.S.settings.fontSize = f; Game.save(); const html = document.documentElement; html.classList.toggle("fs-big", f === "big"); html.classList.toggle("fs-huge", f === "huge"); Views.parent(); },
    cycleFont() { const st = Game.S.settings; st.fontSize = st.fontSize === "std" ? "big" : st.fontSize === "big" ? "huge" : "std"; this.setFont(st.fontSize); this.toast("字号：" + (st.fontSize === "std" ? "标准" : st.fontSize === "big" ? "大" : "特大")); if (this.screen === "parent") Views.parent(); },
    toggleSound() { Game.S.settings.sound = !Game.S.settings.sound; Game.save(); this.toast("音效已" + (Game.S.settings.sound ? "开启" : "关闭")); Views.parent(); },
    resetSubject(s) {
      this.modal("<h3>⚠️ 确认重置</h3><div class='muted' style='margin:8px 0'>将清空「" + ({ cn: "语文", ma: "数学", en: "英语" }[s]) + "」的关卡星级、最佳成绩与错题记录。<b>积分与装扮保留。</b>此操作不可撤销。</div>", () => {
        const S = Game.S;
        Object.keys(S.stars).forEach(k => { if (k.startsWith(s + "|")) delete S.stars[k]; });
        Object.keys(S.best).forEach(k => { if (k.startsWith(s + "|")) delete S.best[k]; });
        Object.keys(S.wrong).forEach(k => { if (S.wrong[k].subject === s) delete S.wrong[k]; });
        Object.keys(S.stats.byUnit).forEach(k => { if (k.startsWith(s + "-")) delete S.stats.byUnit[k]; });
        Object.keys(S.testScores).forEach(k => { if (k.startsWith("ut-" + s + "-") || k.startsWith("final-" + s + "-") || k.startsWith("sc-" + s + "-")) delete S.testScores[k]; });
        Game.save(); this.toast("已重置该科进度"); Views.parent();
      }, "确认重置");
    },

    // ===== 护眼 & 时长（每分钟巡检，顺带自动存档） =====
    _patrol() {
      if (!Game.S || !this.run) return;
      Game.save(); // 定时自动存档，防浏览器被杀后台丢数据
      const mins = Game.todayMinutes();
      if (mins >= 25 && Date.now() - this._lastBreak > 25 * 60000) {
        this._lastBreak = Date.now();
        this.modal("<h3>👁️ 护眼休息时间</h3><div class='muted' style='margin:8px 0'>已经练习 25 分钟啦，<br>站起来看看远处，休息 20 秒～</div><div style='font-size:2rem;margin:6px 0'>🌿 🌳 ☀️</div>");
      }
      if (Game.overLimit() && Date.now() - this._lastLimitToast > 10 * 60000) {
        this._lastLimitToast = Date.now();
        this.toast("⏰ 已超过今日建议练习时长，记得休息哦（家长可在家长模式调整）", 3500);
      }
      const h = new Date().getHours();
      const st = Game.S.settings;
      const inQuiet = st.quietStart <= st.quietEnd ? (h >= st.quietStart && h < st.quietEnd) : (h >= st.quietStart || h < st.quietEnd);
      if (inQuiet && Date.now() - this._lastLimitToast > 10 * 60000) {
        this._lastLimitToast = Date.now();
        this.toast("🌙 免打扰时段：建议先休息，明早再来闯关～", 3500);
      }
    }
  };

  // 底部导航
  window.NAV_ITEMS = [
    { go: "home", icon: "🗺️", label: "小岛" },
    { go: "tests", icon: "📝", label: "测评" },
    { go: "wrongbook", icon: "📕", label: "错题本" },
    { go: "report", icon: "📈", label: "报告" },
    { go: "shop", icon: "🛍️", label: "装扮" }
  ];

  window.App = App;
  window.addEventListener("DOMContentLoaded", function () {
    // 底部导航
    const nav = document.getElementById("nav");
    nav.style.display = "none";
    NAV_ITEMS.forEach(it => {
      const b = document.createElement("button");
      b.dataset.go = it.go;
      b.innerHTML = '<span class="i">' + it.icon + '</span>' + it.label;
      b.onclick = () => App.go(it.go);
      nav.appendChild(b);
    });
    App.go("boot");
    // 巡检
    setInterval(() => App._patrol(), 60000);
    // PWA
    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
      navigator.serviceWorker.register("sw.js").catch(() => { });
    }
    window.addEventListener("beforeunload", () => { if (Game.S) { Game.endPractice(); Game.save(); } });
  });
})();
