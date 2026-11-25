// 全部页面视图
(function () {
  const SUBJ = { cn: { name: "语文岛", icon: "📖" }, ma: { name: "数学岛", icon: "➗" }, en: { name: "英语岛", icon: "🔤" } };
  const LV_NAMES = { 1: "基础关", 2: "进阶关", 3: "Boss关" };
  const esc = Engine.esc, H = Engine.norm;

  function starsText(n) { return n > 0 ? "★".repeat(n) + "☆".repeat(3 - n) : "☆☆☆"; }

  const Views = {

    // ============ 启动页 ============
    boot() {
      const slots = Store.listSlots();
      let html = '<div class="boot"><div style="max-width:300px;margin:0 auto">' + CHAR.render("welcome") + '</div>'
        + '<div class="bubble">' + CHAR.line("welcome") + '</div>'
        + '<h1>初音学习岛</h1><div class="muted" style="margin-bottom:16px">人教版六年级 · 语数英闯关练习</div>';
      slots.forEach(s => {
        if (s.data) {
          html += '<div class="card slot-card" onclick="App.pickSlot(' + s.i + ')"><div class="info">'
            + '<div class="name">📁 存档 ' + (s.i + 1) + ' · ' + esc(s.data.name) + '</div>'
            + '<div class="meta">积分 ' + s.data.points + ' · 打卡 ' + (s.data.stats.streak || 0) + ' 天 · 通关 ' + (s.data.stats.levelsDone || 0) + ' 关</div></div>'
            + '<button class="btn small">继续</button></div>';
        } else {
          html += '<div class="card slot-card" onclick="App.newSlot(' + s.i + ')"><div class="info">'
            + '<div class="name" style="color:var(--teal-dark)">➕ 存档 ' + (s.i + 1) + ' · 空位</div>'
            + '<div class="meta">点击创建新存档</div></div><button class="btn small plain">新建</button></div>';
        }
      });
      html += '<div class="muted" style="margin-top:14px;font-size:.75rem">进度保存在本设备浏览器中 · 无需注册 · 不采集个人信息</div></div>';
      App.setScreen(html, false);
    },

    // ============ 主岛地图（首页） ============
    home() {
      const S = Game.S, cur = App.island;
      const title = S.equipped.title ? window.DRESSUP_BY_ID[S.equipped.title] : null;
      let html = '<div class="topbar"><div class="who">🐱 ' + esc(S.name)
        + (title ? ' <span class="tag pink">' + esc(title.text) + '</span>' : '')
        + '<span class="muted">连续打卡 ' + (S.stats.streak || 0) + ' 天</span></div>'
        + '<div class="row"><button class="btn small plain" onclick="App.cycleFont()" title="字号">Aa</button>'
        + '<span class="pts">✨ ' + S.points + '</span></div></div>';

      // 小音 + 每日任务
      html += '<div class="row" style="align-items:stretch"><div class="preview-box" style="flex:0 0 128px;margin-bottom:0;padding:6px">' + CHAR.render("encourage", "112px") + CHAR.renderPet("70px") + '</div>'
        + '<div style="flex:1">' + Views._tasksCard() + '</div></div>';

      html += '<div class="island-tabs" style="margin-top:12px">';
      for (const s in SUBJ) html += '<button class="' + (s === cur ? "active" : "") + '" onclick="App.goIsland(\'' + s + '\')">' + SUBJ[s].icon + ' ' + SUBJ[s].name.replace("岛", "") + '</button>';
      html += '</div>';

      const meta = window.UNIT_META[cur];
      for (const term of ["6上", "6下"]) {
        html += '<div class="muted" style="margin:10px 2px 8px;font-weight:800">' + term + ' · ' + meta[term].length + ' 个单元</div>';
        meta[term].forEach((uname, idx) => {
          const unit = idx + 1;
          const unlocked = Game.unitUnlocked(cur, term, unit);
          let done = 0;
          for (let lv = 1; lv <= 3; lv++) if ((S.stars[cur + "|" + term + "|" + unit + "|" + lv] || 0) > 0) done++;
          html += '<div class="unit-node ' + (unlocked ? (done === 3 ? "done" : "") : "locked") + '">'
            + '<div style="flex:1"><div class="row spread"><b>' + (unlocked ? (done === 3 ? "✅ " : "") : "🔒 ") + uname + '</b>'
            + '<span class="stars">' + (done === 3 ? "⭐×3关" : "") + '</span></div>'
            + '<div class="unit-stages">';
          for (let lv = 1; lv <= 3; lv++) {
            const st = S.stars[cur + "|" + term + "|" + unit + "|" + lv] || 0;
            const ok = unlocked && Game.stageUnlocked(cur, term, unit, lv);
            html += '<div class="stage-chip ' + (lv === 3 ? "boss " : "") + (ok ? "" : "locked") + (st > 0 ? " cleared" : "") + '" onclick="' + (ok ? 'App.startLevel(' + unit + ',' + lv + ')' : 'App.toast("先通过前面的关卡才能解锁哦")') + '">'
              + LV_NAMES[lv] + '<span class="st">' + (st > 0 ? starsText(st) : (ok ? "可挑战" : "未解锁")) + '</span></div>';
          }
          const tOk = unlocked && Game.unitTestUnlocked(cur, term, unit);
          html += '<div class="stage-chip ' + (tOk ? "" : "locked") + '" onclick="' + (tOk ? 'App.startUnitTest(' + unit + ')' : 'App.toast("三关全通后解锁单元测")') + '">📝 单元测<span class="st">' + (tOk ? (S.testScores["ut-" + cur + "-" + term + "-" + unit] ? "最高 " + S.testScores["ut-" + cur + "-" + term + "-" + unit].score + " 分" : "可测试") : "未解锁") + '</span></div>';
          html += '</div></div></div>';
        });
      }
      // 快捷入口
      html += '<div class="card"><div class="muted" style="font-weight:800;margin-bottom:8px">🎒 更多功能</div><div class="row wrap">'
        + '<button class="btn small pink" onclick="App.go(\'shengchu\')">🎯 小升初专区</button>'
        + '<button class="btn small plain" onclick="App.go(\'cards\')">🃏 速记卡</button>'
        + '<button class="btn small plain" onclick="App.go(\'rank\')">🏆 积分排行</button>'
        + '<button class="btn small plain" onclick="App.go(\'achs\')">🏅 成就 ' + S.achievements.length + '/' + window.ACHIEVEMENTS.length + '</button>'
        + '<button class="btn small plain" onclick="App.go(\'parent\')">👨‍👩‍👧 家长模式</button></div></div>';
      App.setScreen(html, true);
    },

    _tasksCard() {
      const S = Game.S;
      let html = '<div class="card" style="margin-bottom:0"><div class="row spread"><b>📅 每日任务</b><span class="tag">首登 +20 已领</span></div>';
      S.tasks.list.forEach(t => {
        const def = window.TASK_DEFS[t.id];
        if (!def) return;
        const pct = Math.min(100, Math.round(t.prog / def.target * 100));
        html += '<div class="bar-row"><div class="lbl"><span>' + (t.done ? "✅ " : "") + def.text + '</span><span class="muted">' + Math.min(t.prog, def.target) + '/' + def.target + '</span></div>'
          + '<div class="bar-track"><div style="width:' + pct + '%"></div></div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============ 关卡 / 测验共用答题页 ============
    quiz() {
      const R = App.run, q = R.qs[R.idx], S = Game.S;
      const isTest = R.mode !== "level" && R.mode !== "retry";
      Game.beginPractice();
      let top = '<div class="quiz-top">';
      if (R.mode === "level") top += '<span class="hearts">' + "❤️".repeat(R.hearts) + "🖤".repeat(3 - R.hearts) + '</span>';
      top += '<div class="pbar"><div style="width:' + Math.round((R.idx) / R.qs.length * 100) + '%"></div></div>'
        + '<span class="muted">' + (R.idx + 1) + '/' + R.qs.length + '</span>'
        + (R.streak >= 2 ? '<span class="streak-chip">🔥 连对 ' + R.streak + '</span>' : '');
      if (R.timer !== undefined) top += '<span class="timer-chip" id="timer">⏱ ' + App.fmtTime(R.timer) + '</span>';
      top += '<button class="btn small plain" onclick="App.speakQ()" title="朗读题目">🔊</button></div>';

      const modeName = R.mode === "retry" ? "错题重练" : isTest ? { unit: "单元测", final: "期末测", sc: "小升初模拟", sp: "专项突破" }[R.mode] : LV_NAMES[R.lv];
      let html = top + '<div class="card fade-in"><div class="row spread"><b>' + modeName + '</b>'
        + (R.mode === "retry" ? '<span class="tag">答对一半积分 · 连对 2 次移出错题本</span>' : isTest ? '<span class="tag pink">满分 ' + R.maxScore + '</span>' : '<span class="tag">答错扣 1 心</span>') + '</div>'
        + Engine.renderQ(q, R)
        + '<div class="feedback-banner" id="fb"></div>'
        + '<div id="qbtns" class="row"><button class="btn block" id="submitBtn" onclick="App.submitQ()">提交答案</button></div></div>';
      html += '<div class="muted" style="text-align:center">知识点：' + esc(q.kp.join(" · ")) + (q.tags.length ? ' · ' + q.tags.map(t => "#" + t).join(" ") : '') + '</div>';
      App.setScreen(html, false);
      Views._bindQuiz(q, R);
    },

    _bindQuiz(q, R) {
      const ansEl = document.getElementById("ans");
      if (!ansEl) return;
      const t = ansEl.dataset.type;
      if (t === "choice") {
        const multi = q.answer.length > 1;
        ansEl.querySelectorAll(".opt-btn").forEach(b => b.onclick = () => {
          if (multi) { /* 多选暂未使用 */ }
          ansEl.querySelectorAll(".opt-btn").forEach(x => x.classList.remove("sel"));
          b.classList.add("sel"); R.sel = b.dataset.opt;
        });
      } else if (t === "judge") {
        ansEl.querySelectorAll(".opt-btn").forEach(b => b.onclick = () => {
          ansEl.querySelectorAll(".opt-btn").forEach(x => x.classList.remove("sel"));
          b.classList.add("sel"); R.sel = b.dataset.opt;
        });
      } else if (t === "cloze") {
        R.cloze = R.cloze || {};
        ansEl.querySelectorAll(".opt-btn").forEach(b => b.onclick = () => {
          const bi = b.dataset.blank;
          ansEl.querySelectorAll('[data-blank="' + bi + '"]').forEach(x => x.classList.remove("sel"));
          b.classList.add("sel"); R.cloze[bi] = b.dataset.opt;
        });
      } else if (t === "match") {
        R.matchPairs = R.matchPairs || q.options.left.map(() => null);
        let selL = null;
        ansEl.querySelectorAll(".match-cell").forEach(c => c.onclick = () => {
          if (c.dataset.side === "L") {
            ansEl.querySelectorAll('[data-side="L"]').forEach(x => x.classList.remove("sel"));
            c.classList.add("sel"); selL = +c.dataset.i;
          } else if (selL !== null) {
            const lcell = ansEl.querySelector('[data-side="L"][data-i="' + selL + '"]');
            lcell.classList.remove("sel"); lcell.classList.add("done");
            R.matchPairs[selL] = +c.dataset.i; selL = null;
          }
        });
      } else if (t === "order") {
        R.orderSel = R.orderSel || [];
        ansEl.querySelectorAll(".order-item").forEach(c => c.onclick = () => {
          if (c.classList.contains("done")) return;
          c.classList.add("done"); c.classList.remove("sel");
          R.orderSel.push(+c.dataset.i);
        });
      }
    },

    // ============ 结算页 ============
    result(p) {
      const S = Game.S;
      const expr = p.stars >= 3 ? "cheer" : p.stars >= 1 ? "surprise" : "sad";
      let html = '<div class="card result-hero">'
        + '<div style="max-width:220px;margin:0 auto">' + CHAR.render(expr) + '</div>'
        + '<div class="bubble">' + CHAR.line(expr) + '</div>'
        + '<div class="result-stars">' + (p.stars > 0 ? "⭐".repeat(p.stars) + "☆".repeat(3 - p.stars) : "💫 加油") + '</div>'
        + '<div class="result-score">+' + p.gained + ' <span style="font-size:1rem">积分</span></div>'
        + (p.note ? '<div class="muted" style="margin-top:4px">' + esc(p.note) + '</div>' : '')
        + (p.scoreLine ? '<div class="muted" style="margin-top:4px">' + p.scoreLine + '</div>' : '')
        + '</div>';
      if (p.statsLine) html += '<div class="card"><div class="row spread"><span>答对 / 总题数</span><b>' + p.statsLine + '</b></div></div>';
      if (p.wrongQs && p.wrongQs.length) {
        html += '<div class="card wrong-list"><b style="color:var(--bad)">📝 本次错题（已进入错题本）</b>';
        p.wrongQs.forEach(q => {
          html += '<div class="w-item"><b>' + esc(q.stem) + '</b><br><span class="muted">✔ 正确答案：' + esc(q.type === "match" ? q.options.left.map((l, i) => l + "→" + q.options.right[q.answer[i]]).join("；") : String(q.answer)) + '</span><br><span class="muted">📖 ' + esc(q.analysis) + '</span></div>';
        });
        html += '<button class="btn pink block" onclick="App.go(\'wrongbook\')">去错题本重练</button></div>';
      }
      html += '<div class="row" style="margin-top:10px">'
        + (p.retry ? '<button class="btn plain block" onclick="App.startLevel(' + p.unit + ',' + p.lv + ')">🔄 再来一次</button>' : '')
        + '<button class="btn block" onclick="App.go(\'home\')">🏠 返回' + SUBJ[p.subject].name + '</button></div>';
      if (p.nextLevel) html += '<button class="btn pink block" style="margin-top:10px" onclick="App.startLevel(' + p.unit + ',' + p.nextLevel + ')">▶️ 下一关：' + LV_NAMES[p.nextLevel] + '</button>';
      App.setScreen(html, false);
    },

    // ============ 测评报告 ============
    testReport(p) {
      const S = Game.S;
      let html = '<div class="card result-hero">'
        + '<div style="max-width:200px;margin:0 auto">' + CHAR.render(p.pct >= 85 ? "cheer" : p.pct >= 60 ? "surprise" : "encourage") + '</div>'
        + '<div class="bubble">' + (p.pct >= 85 ? CHAR.line("cheer") : p.pct >= 60 ? "合格啦！继续冲优秀！" : CHAR.line("encourage")) + '</div>'
        + '<div class="result-score">' + p.score + ' <span style="font-size:1rem">/ ' + p.maxScore + '</span></div>'
        + '<div class="muted">' + (p.pct >= 85 ? "🏆 优秀！" : p.pct >= 60 ? "✅ 合格（85 分优秀）" : "💪 不合格可重测，只记最高分") + '</div>'
        + (p.timeUsed ? '<div class="muted">用时 ' + App.fmtTime(p.timeUsed) + '</div>' : '') + '</div>';
      html += Views._kpBars(p.qs, p.answers);
      if (p.wrongQs.length) {
        html += '<div class="card wrong-list"><b style="color:var(--bad)">📝 错题回看</b>';
        p.wrongQs.forEach(q => {
          html += '<div class="w-item"><b>' + esc(q.stem) + '</b><br><span class="muted">✔ ' + esc(String(q.answer)) + '</span><br><span class="muted">📖 ' + esc(q.analysis) + '</span></div>';
        });
        html += '</div>';
      }
      html += '<button class="btn block" onclick="App.go(\'' + (p.back || "home") + '\')">返回</button>';
      if (p.canRetest) html += '<button class="btn pink block" style="margin-top:10px" onclick="App.retest()">🔄 重新测试（只记最高分）</button>';
      App.setScreen(html, false);
    },

    _kpBars(qs, answers) {
      const map = {};
      qs.forEach(q => {
        const k = q.kp[0];
        map[k] = map[k] || { a: 0, c: 0 };
        map[k].a++;
        if (answers && answers[q.id] === true) map[k].c++;
      });
      let html = '<div class="card"><b>📊 各知识点得分率</b>';
      Object.entries(map).forEach(([k, v]) => {
        const pct = Math.round(v.c / v.a * 100);
        html += '<div class="bar-row"><div class="lbl"><span>' + esc(k) + '</span><span class="muted">' + pct + '%（' + v.c + '/' + v.a + '）</span></div>'
          + '<div class="bar-track ' + (pct < 60 ? "low" : "") + '"><div style="width:' + pct + '%"></div></div></div>';
      });
      html += '</div>';
      return html;
    },

    // ============ 装扮屋 ============
    shop() {
      const S = Game.S;
      const CATS = [{ id: "hair", name: "💇 发型" }, { id: "fit", name: "👗 服装" }, { id: "acc", name: "🎒 配饰" }, { id: "pet", name: "🐾 宠物" }, { id: "pacc", name: "🎀 宠物装扮" }, { id: "bg", name: "🏠 背景" }, { id: "title", name: "🏷️ 称号" }, { id: "prop", name: "🧸 道具" }];
      const expr = App.shopExpr || "welcome";
      let html = '<div class="topbar"><b>🛍️ 装扮屋</b><div class="row"><button class="btn small plain" onclick="App.cycleShopExpr()">😊 换表情</button><span class="pts">✨ ' + S.points + '</span></div></div>';
      html += '<div class="preview-box" id="previewBox" style="display:flex;align-items:center;gap:8px">'
        + '<div style="flex:1">' + CHAR.render(expr) + '</div>' + CHAR.renderPet("90px") + '</div>';
      // 宠物出战面板
      if (App.shopCat === "pet" || App.shopCat === "pacc") html += Views._petPanel();
      html += '<div class="shop-tabs">';
      CATS.forEach(c => html += '<button class="' + (c.id === App.shopCat ? "active" : "") + '" onclick="App.shopCat(\'' + c.id + '\')">' + c.name + '</button>');
      html += '</div>';
      window.DRESSUP.filter(d => d.cat === App.shopCat).forEach(d => {
        const owned = S.owned.includes(d.id);
        const achLocked = d.ach && !S.achievements.includes(d.ach);
        const achName = d.ach ? (window.ACHIEVEMENTS.find(a => a.id === d.ach) || {}).name : "";
        const rar = d.rarity >= 2 ? " r" + Math.min(d.rarity, 5) : "";
        const ic = d.cat === "pet" || d.cat === "pacc" ? d.emoji
          : d.cat === "prop" ? d.emoji : d.cat === "title" ? "🏷️" : d.cat === "bg" ? "🖼️" : d.cat === "acc" ? (d.svg.kind === "glasses" ? "👓" : d.svg.kind === "bag" ? "🎒" : d.svg.kind === "band" ? "🎀" : d.svg.kind === "pin" ? "📌" : "🎧") : d.cat === "fit" ? "👗" : "💇";
        const rarity = window.RARITY_NAMES[d.rarity] || "";
        html += '<div class="card shop-item"><div class="ic' + rar + '">' + ic + '</div><div style="flex:1"><b>' + esc(d.name) + '</b> '
          + (d.rarity >= 4 ? '<span class="tag warn">' + (d.rarity === 5 ? "限定" : "稀有") + '</span>' : '')
          + '<div class="muted" style="font-size:.66rem">' + rarity + '</div>'
          + '<div class="muted">' + esc(d.desc) + (achLocked ? ' · 🔒 需成就「' + achName + '」' : '') + '</div></div>';
        html += Views._shopBtn(d, owned, achLocked);
        html += '</div>';
      });
      html += '<div class="muted" style="text-align:center;margin-top:8px">全部明码标价 · 不设抽奖 · 不限时售卖 · 积分越多可解锁的档位越漂亮</div>';
      App.setScreen(html, true);
    },

    _shopBtn(d, owned, achLocked) {
      const S = Game.S;
      if (d.cat === "pet") {
        if (S.pets.owned.includes(d.id)) {
          const st = Game.petState(d.id), lv = CHAR.petLevelOf(st.xp);
          return '<button class="btn small ' + (S.pets.equipped === d.id ? "plain" : "") + '" onclick="App.equipPet(\'' + d.id + '\')">' + (S.pets.equipped === d.id ? "出战中" : "出战") + '</button>';
        }
        if (achLocked) return '<button class="btn small plain" disabled>🔒 未解锁</button>';
        if (S.points >= d.price) return '<button class="btn small pink" onclick="App.buy(\'' + d.id + '\')">🥚 领养 ' + d.price + '</button>';
        return '<button class="btn small plain" disabled>🥚 ' + d.price + '（积分不足）</button>';
      }
      if (d.cat === "pacc") {
        if (owned) return '<button class="btn small ' + (S.pets.equipped && S.pets.st[S.pets.equipped] && S.pets.st[S.pets.equipped].pacc === d.id ? "plain" : "") + '" onclick="App.equipPetAcc(\'' + d.id + '\')">给宠物穿</button>';
        if (achLocked) return '<button class="btn small plain" disabled>🔒 未解锁</button>';
        if (S.points >= d.price) return '<button class="btn small pink" onclick="App.buy(\'' + d.id + '\')">💰 ' + d.price + '</button>';
        return '<button class="btn small plain" disabled>💰 ' + d.price + '（积分不足）</button>';
      }
      const worn = S.equipped[d.cat] === d.id;
      if (worn) return '<button class="btn small plain" disabled>穿戴中</button>';
      if (owned) return '<button class="btn small" onclick="App.equip(\'' + d.cat + '\',\'' + d.id + '\')">穿戴</button>';
      if (achLocked) return '<button class="btn small plain" disabled>🔒 未解锁</button>';
      if (S.points >= d.price) return '<button class="btn small pink" onclick="App.buy(\'' + d.id + '\')">💰 ' + d.price + '</button>';
      return '<button class="btn small plain" disabled>💰 ' + d.price + '（积分不足）</button>';
    },

    // 出战宠物成长面板
    _petPanel() {
      const S = Game.S, R = window.PET_RULES;
      let html = '';
      if (!S.pets.equipped) {
        html += '<div class="card" style="text-align:center"><div style="font-size:2rem">🐾</div><b>还没有出战宠物</b><div class="muted" style="margin-top:4px">在「🐾 宠物」分类里领养一只，然后点「出战」。每天可以喂食 ' + R.FEEDS_PER_DAY + ' 次，宠物升级后能穿戴专属装扮！</div></div>';
        return html;
      }
      const pet = window.DRESSUP_BY_ID[S.pets.equipped];
      const st = Game.petState(pet.id);
      const lv = CHAR.petLevelOf(st.xp);
      const today = window.todayStr();
      if (st.fedDate !== today) { st.fedDate = today; st.fed = 0; }
      const curBase = (lv - 1) * R.LEVEL_STEP, nextBase = lv * R.LEVEL_STEP;
      const pct = lv >= R.MAX_LEVEL ? 100 : Math.min(100, Math.round((st.xp - curBase) / R.LEVEL_STEP * 100));
      html += '<div class="card"><div class="row spread"><b>' + pet.emoji + ' ' + esc(pet.name) + ' <span class="tag">Lv.' + lv + '</span></b>'
        + '<span class="muted">今日已喂 ' + st.fed + '/' + R.FEEDS_PER_DAY + '</span></div>'
        + '<div class="bar-row"><div class="lbl"><span>成长值</span><span class="muted">' + (lv >= R.MAX_LEVEL ? "已满级" : st.xp + " / " + nextBase + "（Lv" + (lv + 1) + "）") + '</span></div>'
        + '<div class="bar-track"><div style="width:' + pct + '%"></div></div></div>'
        + '<div class="row spread" style="margin-top:8px"><span class="muted">等级 2 级起可穿戴宠物装扮 · 每次喂食 +' + R.XP_PER_FEED + ' 成长</span>'
        + (lv >= R.MAX_LEVEL ? '<button class="btn small plain" disabled>满级啦 🎉</button>'
          : st.fed >= R.FEEDS_PER_DAY ? '<button class="btn small plain" disabled>今天吃饱啦</button>'
          : '<button class="btn small pink" onclick="App.feedPet(\'' + pet.id + '\')">🍖 喂食（' + R.FEED_COST + ' 分）</button>')
        + '</div></div>';
      return html;
    },

    // ============ 测评中心 ============
    tests() {
      const S = Game.S, cur = App.island;
      let html = '<div class="topbar"><b>📋 测评中心</b><span class="pts">✨ ' + S.points + '</span></div>';
      html += '<div class="island-tabs">';
      for (const s in SUBJ) html += '<button class="' + (s === cur ? "active" : "") + '" onclick="App.goIsland(\'' + s + '\')">' + SUBJ[s].icon + '</button>';
      html += '</div>';
      html += '<div class="muted" style="font-weight:800;margin:8px 2px">📅 ' + SUBJ[cur].name + ' · 期末测（40 题 · 限时 40 分钟）</div>';
      ["6上", "6下"].forEach(term => {
        const key = "final-" + cur + "-" + term;
        const rec = S.testScores[key];
        html += '<div class="card test-item" onclick="App.startFinal(\'' + term + '\')"><div class="ic">📄</div><div style="flex:1"><b>' + term + '期末测</b><div class="muted">满分 100 · 60 合格 · 85 优秀' + (rec ? ' · 最高 ' + rec.score + ' 分' : '') + '</div></div><button class="btn small">' + (rec ? "重测" : "开始") + '</button></div>';
      });
      html += '<div class="card test-item" onclick="App.go(\'shengchu\')"><div class="ic">🎯</div><div style="flex:1"><b>小升初专区</b><div class="muted">模拟卷 · 专项突破 · 速记卡 · 个人易错清单</div></div><button class="btn small pink">进入</button></div>';
      App.setScreen(html, true);
    },

    // ============ 小升初专区 ============
    shengchu() {
      const S = Game.S;
      let html = '<div class="topbar"><b>🎯 小升初专区</b><span class="pts">✨ ' + S.points + '</span></div>';
      html += '<div class="card"><b>📚 模拟综合卷</b><div class="muted" style="margin-bottom:8px">每套 40 题 · 限时 60 分钟 · 满分 100</div>';
      for (const s in SUBJ) {
        for (let i = 1; i <= 3; i++) {
          const key = "sc-" + s + "-" + i;
          const rec = S.testScores[key];
          html += '<div class="test-item" style="padding:8px 0;border-bottom:1px dashed #EAF0F2" onclick="App.startSC(\'' + s + '\',' + i + ')">'
            + '<div class="ic" style="width:40px;height:40px;font-size:1.1rem">' + SUBJ[s].icon + '</div><div style="flex:1"><b>模拟卷 ' + i + '</b> <span class="muted">' + SUBJ[s].name.replace("岛", "") + (rec ? ' · 最高 ' + rec.score + ' 分' : '') + '</span></div><button class="btn small plain">开考</button></div>';
        }
      }
      html += '</div>';
      const packs = {
        cn: [["字词", "读音", "字形", "近义词", "多音字"], ["古诗词默写", "文言文默写", "课文默写"], ["修改病句", "句式转换", "修辞辨析", "关联词"], ["阅读理解", "说明方法", "描写方法"]],
        ma: [["计算", "简算", "口算"], ["应用题", "百分数", "折扣", "利率"], ["比例", "比例尺", "正反比例", "圆", "圆柱"], ["行程", "工程问题", "和差倍", "浓度"]],
        en: [["一般现在时", "一般过去时", "一般将来时", "现在进行时"], ["过去式", "比较级", "词形变化", "三单"], ["完形填空"], ["书面表达", "句型", "阅读理解"]]
      };
      html += '<div class="card"><b>🧩 专项突破包</b><div class="muted" style="margin-bottom:8px">10 题一组，针对薄弱点集中练</div>';
      for (const s in SUBJ) {
        packs[s].forEach((kw, i) => {
          html += '<div class="test-item" style="padding:8px 0;border-bottom:1px dashed #EAF0F2" onclick="App.startSpecial(\'' + s + '\',' + i + ')">'
            + '<div class="ic" style="width:40px;height:40px;font-size:1.1rem">' + SUBJ[s].icon + '</div><div style="flex:1"><b>' + SUBJ[s].name.replace("岛", "") + '专项 ' + (i + 1) + '</b> <span class="muted">' + kw.join("/") + '</span></div><button class="btn small plain">练习</button></div>';
        });
      }
      html += '</div>';
      html += '<div class="card test-item" onclick="App.go(\'cards\')"><div class="ic">🃏</div><div style="flex:1"><b>高频考点速记卡</b><div class="muted">每科 30 张，翻卡自测</div></div><button class="btn small">去翻卡</button></div>';
      html += '<div class="card test-item" onclick="App.go(\'wrongbook\')"><div class="ic">⚠️</div><div style="flex:1"><b>个人易错清单</b><div class="muted">全部错题按知识点聚类 · 考前 30 分钟过一遍</div></div><button class="btn small pink">查看</button></div>';
      App.setScreen(html, true);
    },

    // ============ 速记卡 ============
    cards() {
      let html = '<div class="topbar"><b>🃏 速记卡</b><button class="btn small plain" onclick="App.go(\'home\')">🏠 返回</button></div>';
      const cur = App.cardSubject || "cn";
      html += '<div class="island-tabs">';
      for (const s in SUBJ) html += '<button class="' + (s === cur ? "active" : "") + '" onclick="App.cardSubject=\'' + s + '\';App.go(\'cards\')">' + SUBJ[s].icon + '</button>';
      html += '</div>';
      const cards = window.MEMO_CARDS[cur];
      html += '<div class="muted" style="margin-bottom:10px">点击卡片翻面 · 共 ' + cards.length + ' 张</div>';
      cards.forEach((c, i) => {
        html += '<div class="flip-card" onclick="this.classList.toggle(\'flipped\')"><div class="flip-inner">'
          + '<div class="flip-face">💡 ' + esc(c[0]) + '</div>'
          + '<div class="flip-face back">' + esc(c[1]) + '</div></div></div>';
      });
      App.setScreen(html, true);
    },

    // ============ 错题本 ============
    wrongbook() {
      const S = Game.S;
      let html = '<div class="topbar"><b>📕 错题本</b><span class="tag">' + Object.keys(S.wrong).length + ' 题待攻克</span></div>';
      const cur = App.wrongFilter || "all";
      html += '<div class="shop-tabs"><button class="' + (cur === "all" ? "active" : "") + '" onclick="App.wrongFilter=\'all\';App.go(\'wrongbook\')">全部</button>';
      for (const s in SUBJ) html += '<button class="' + (cur === s ? "active" : "") + '" onclick="App.wrongFilter=\'' + s + '\';App.go(\'wrongbook\')">' + SUBJ[s].icon + '</button>';
      html += '</div>';
      const wrongs = Object.values(S.wrong).filter(w => cur === "all" || w.subject === cur);
      if (!wrongs.length) {
        html += '<div class="card" style="text-align:center;padding:30px"><div style="font-size:2.5rem">🎉</div><b>错题本是空的！</b><div class="muted" style="margin-top:6px">答错的题会自动收进来，重练连对 2 次即可移出</div></div>';
      } else {
        html += '<button class="btn pink block" style="margin-bottom:12px" onclick="App.startRetry()">⚡ 错题重练（' + wrongs.length + ' 题）</button>';
        // 按知识点聚类（易错清单视角）
        const byKp = {};
        wrongs.forEach(w => { const k = w.kp || "其他"; byKp[k] = (byKp[k] || 0) + 1; });
        html += '<div class="card"><b>⚠️ 薄弱知识点（考前 30 分钟过一遍）</b>';
        Object.entries(byKp).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => {
          html += '<div class="row spread" style="padding:6px 0;border-bottom:1px dashed #EAF0F2"><span>' + esc(k) + '</span><span class="tag warn">' + n + ' 题</span></div>';
        });
        html += '</div>';
        html += '<div class="card wrong-list"><b>📋 全部错题</b>';
        wrongs.forEach(w => {
          const q = Engine.ALL.find(x => x.id === w.qid);
          if (!q) return;
          html += '<div class="w-item"><b>' + esc(q.stem) + '</b><br><span class="muted">✔ ' + esc(String(q.answer)) + '</span><br><span class="muted">📖 ' + esc(q.analysis) + '</span>'
            + '<div class="muted" style="margin-top:4px">知识点：' + esc(w.kp) + ' · 错 ' + (w.times || 0) + ' 次 · 上次答案：' + esc(w.lastMy || "—") + '</div></div>';
        });
        html += '</div>';
      }
      App.setScreen(html, true);
    },

    // ============ 学习报告 ============
    report() {
      const S = Game.S;
      let html = '<div class="topbar"><b>📈 学习报告</b><button class="btn small plain" onclick="App.cycleRadar()">🔄 切换科目</button></div>';
      const D = S.stats.days;
      function dkey(offset) { const d = new Date(); d.setDate(d.getDate() - offset); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
      let a7 = 0, c7 = 0, min7 = 0, a30 = 0, c30 = 0, min30 = 0;
      for (let i = 0; i < 30; i++) { const d = D[dkey(i)]; if (d) { a30 += d.a; c30 += d.c; min30 += d.min || 0; if (i < 7) { a7 += d.a; c7 += d.c; min7 += d.min || 0; } } }
      html += '<div class="stat-grid">'
        + '<div class="stat-cell"><div class="v">' + a7 + '</div><div class="k">近 7 天答题</div></div>'
        + '<div class="stat-cell"><div class="v">' + (a7 ? Math.round(c7 / a7 * 100) : 0) + '%</div><div class="k">近 7 天正确率</div></div>'
        + '<div class="stat-cell"><div class="v">' + min7 + '<span style="font-size:.9rem">分</span></div><div class="k">近 7 天学习时长</div></div>'
        + '<div class="stat-cell"><div class="v">' + (S.stats.streak || 0) + ' 天</div><div class="k">连续打卡</div></div></div>';
      // 各科单元正确率
      const cur = App.radarSubject || "ma";
      html += '<div class="card"><b>🕸 ' + SUBJ[cur].name + '知识点雷达</b><div class="radar-wrap">' + Views._radar(cur) + '</div></div>';
      // 最强最弱
      const rates = Object.entries(S.stats.byUnit).filter(([k, v]) => v.a >= 5).map(([k, v]) => [k, v.c / v.a]).sort((x, y) => y[1] - x[1]);
      if (rates.length) {
        function uname(k) { const [s, t, u] = k.split("-"); return (SUBJ[s] ? SUBJ[s].name.replace("岛", "") : s) + " " + t + " 第" + u + "单元"; }
        html += '<div class="card"><b>🏆 最强 / 最弱单元</b>'
          + '<div class="row spread" style="padding:6px 0"><span>💪 最强：' + esc(uname(rates[0][0])) + '</span><span class="tag">' + Math.round(rates[0][1] * 100) + '%</span></div>'
          + '<div class="row spread" style="padding:6px 0"><span>🌱 最弱：' + esc(uname(rates[rates.length - 1][0])) + '</span><span class="tag warn">' + Math.round(rates[rates.length - 1][1] * 100) + '%</span></div></div>';
      }
      html += '<div class="card"><b>✨ 累计数据</b><div class="row wrap spread">'
        + '<span class="muted">累计答题 <b style="color:var(--ink)">' + S.stats.answered + '</b></span>'
        + '<span class="muted">累计正确 <b style="color:var(--ink)">' + S.stats.correct + '</b></span>'
        + '<span class="muted">累计积分 <b style="color:var(--ink)">' + (S.stats.pointsEarned || 0) + '</b></span>'
        + '<span class="muted">通关关卡 <b style="color:var(--ink)">' + (S.stats.levelsDone || 0) + '</b></span>'
        + '<span class="muted">已掌握错题 <b style="color:var(--ink)">' + (S.masteredCount || 0) + '</b></span>'
        + '<span class="muted">累计成就 <b style="color:var(--ink)">' + S.achievements.length + '</b></span></div></div>';
      App.setScreen(html, true);
    },

    _radar(subject) {
      const S = Game.S, meta = window.UNIT_META[subject];
      const pts = [];
      const names = [];
      for (const term in meta) meta[term].forEach((n, i) => { names.push(term.replace("6", "") + "-" + (i + 1)); });
      const N = Math.min(names.length, 8);
      const cx = 130, cy = 130, R = 88;
      for (let i = 0; i < N; i++) {
        const key = Object.keys(S.stats.byUnit).find(k => k === subject + "-" + (i < 8 ? "6上" : "6下") + "-" + ((i % 8) + 1));
        const st = key ? S.stats.byUnit[key] : null;
        const rate = st && st.a ? st.c / st.a : 0;
        const ang = Math.PI * 2 * i / N - Math.PI / 2;
        pts.push([cx + Math.cos(ang) * R * Math.max(rate, 0.06), cy + Math.sin(ang) * R * Math.max(rate, 0.06)]);
      }
      let svg = '<svg width="260" height="260" viewBox="0 0 260 260">';
      for (let ring = 1; ring <= 4; ring++) {
        const r = R * ring / 4;
        let p = "";
        for (let i = 0; i < N; i++) { const ang = Math.PI * 2 * i / N - Math.PI / 2; p += (cx + Math.cos(ang) * r) + "," + (cy + Math.sin(ang) * r) + " "; }
        svg += '<polygon points="' + p + '" fill="none" stroke="#E2EAEF" stroke-width="1"/>';
      }
      for (let i = 0; i < N; i++) {
        const ang = Math.PI * 2 * i / N - Math.PI / 2;
        svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(ang) * R) + '" y2="' + (cy + Math.sin(ang) * R) + '" stroke="#E2EAEF"/>';
        const ang2 = Math.PI * 2 * i / N - Math.PI / 2;
        const lx = cx + Math.cos(ang2) * (R + 16), ly = cy + Math.sin(ang2) * (R + 14);
        svg += '<text x="' + lx + '" y="' + ly + '" font-size="10" text-anchor="middle" fill="#6B7A88">' + names[i] + '</text>';
      }
      let poly = "";
      pts.forEach(p => poly += p[0] + "," + p[1] + " ");
      svg += '<polygon points="' + poly + '" fill="rgba(57,197,187,.3)" stroke="#39C5BB" stroke-width="2.5"/>';
      pts.forEach(p => svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="#39C5BB"/>');
      svg += '</svg>';
      return svg;
    },

    // ============ 成就 ============
    achs() {
      const S = Game.S;
      let html = '<div class="topbar"><b>🏅 成就徽章</b><span class="tag">' + S.achievements.length + ' / ' + window.ACHIEVEMENTS.length + '</span></div>';
      html += '<div class="ach-grid">';
      window.ACHIEVEMENTS.forEach(a => {
        const got = S.achievements.includes(a.id);
        html += '<div class="ach-cell ' + (got ? "got" : "off") + '" title="' + esc(a.desc) + '"><div class="e">' + a.emoji + '</div><div class="n">' + esc(a.name) + '</div><div class="muted" style="font-size:.62rem">' + (got ? "已达成" : esc(a.desc).slice(0, 10)) + '</div></div>';
      });
      html += '</div>';
      App.setScreen(html, true);
    },

    // ============ 积分排行榜 ============
    rank() {
      const S = Game.S, curSlot = Game.slot;
      let html = '<div class="topbar"><b>🏆 积分排行榜</b><span class="pts">✨ ' + S.pointsEarned + '</span></div>';
      // 本机存档排行
      const slots = Store.listSlots().filter(s => s.data).sort((a, b) => (b.data.pointsEarned || 0) - (a.data.pointsEarned || 0));
      html += '<div class="card"><b>🏠 本机挑战者（' + slots.length + ' 个存档）</b>';
      slots.forEach((s, i) => {
        const d = s.data, me = s.i === curSlot;
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
        html += '<div class="row spread" style="padding:8px 0;border-bottom:1px dashed #EAF0F2' + (me ? ';background:rgba(57,197,187,.08);border-radius:10px;padding:8px' : '') + '">'
          + '<span>' + medal + ' ' + esc(d.name) + (me ? ' <span class="tag">我</span>' : '') + '</span>'
          + '<b>' + (d.pointsEarned || 0) + ' 分</b></div>';
      });
      html += '<div class="muted" style="margin-top:6px">在启动页创建 3 个存档，兄弟姐妹比一比谁积分高！</div></div>';
      // 模拟全国榜（纯前端估算）
      const pe = S.pointsEarned || 0;
      const tiers = [
        { pct: 90, min: 6000, tag: "顶尖选手" }, { pct: 75, min: 3500, tag: "实力强劲" },
        { pct: 50, min: 1500, tag: "稳步前进" }, { pct: 25, min: 500, tag: "刚刚起步" }
      ];
      const my = tiers.find(t => pe >= t.min);
      html += '<div class="card"><b>🌏 全国小学生模拟榜</b><div style="text-align:center;padding:8px 0">'
        + '<div style="font-size:1.8rem;font-weight:900;color:var(--teal-dark)">' + (my ? "超过 " + my.pct + "%" : "出发！") + '</div>'
        + '<div class="muted">' + (my ? my.tag + "（累计 " + pe + " 分）" : "答满 500 分即可进入全国模拟榜") + '</div></div>'
        + '<div class="bar-row"><div class="lbl"><span>500 分</span><span class="muted">入门</span></div><div class="bar-track ' + (pe >= 500 ? "" : "low") + '"><div style="width:' + Math.min(100, pe / 500 * 100) + '%"></div></div></div>'
        + '<div class="bar-row"><div class="lbl"><span>1500 分</span><span class="muted">中游</span></div><div class="bar-track"><div style="width:' + Math.min(100, pe / 1500 * 100) + '%"></div></div></div>'
        + '<div class="bar-row"><div class="lbl"><span>3500 分</span><span class="muted">强劲</span></div><div class="bar-track"><div style="width:' + Math.min(100, pe / 3500 * 100) + '%"></div></div></div>'
        + '<div class="bar-row"><div class="lbl"><span>6000 分</span><span class="muted">顶尖</span></div><div class="bar-track"><div style="width:' + Math.min(100, pe / 6000 * 100) + '%"></div></div></div>'
        + '<div class="muted" style="margin-top:6px">以上分档为模拟参考数据，非真实排名。</div></div>';
      // 三科强弱
      const SUBJ = window.SUBJ_META;
      html += '<div class="card"><b>⚔️ 三科积分实力</b>';
      for (const s in SUBJ) {
        let a = 0, c = 0;
        Object.entries(S.stats.byUnit).forEach(([k, v]) => { if (k.startsWith(s + "-")) { a += v.a; c += v.c; } });
        const pct = a ? Math.round(c / a * 100) : 0;
        html += '<div class="bar-row"><div class="lbl"><span>' + SUBJ[s].icon + ' ' + SUBJ[s].name.replace("岛", "") + '</span><span class="muted">' + pct + '%（' + a + ' 题）</span></div>'
          + '<div class="bar-track ' + (pct < 60 ? "low" : "") + '"><div style="width:' + pct + '%"></div></div></div>';
      }
      html += '</div>';
      App.setScreen(html, true);
    },

    // ============ 家长模式 ============
    parent() {
      const S = Game.S;
      if (!App.parentUnlocked) {
        App.setScreen('<div class="card" style="text-align:center;padding:24px"><div style="font-size:2.2rem">🔐</div><b>家长模式</b><div class="muted" style="margin:8px 0">请输入 4 位 PIN' + (S.settings.pin ? '' : '（初始 PIN 为 1234，进入后可修改）') + '</div>'
          + '<input class="pin-input" id="pinIn" type="password" inputmode="numeric" maxlength="4" placeholder="····">'
          + '<button class="btn block" style="margin-top:12px" onclick="App.tryPin()">解锁</button>'
          + '<button class="btn plain block" style="margin-top:10px" onclick="App.go(\'home\')">返回</button></div>', false);
        return;
      }
      const st = S.settings;
      let html = '<div class="topbar"><b>👨‍👩‍👧 家长模式</b><button class="btn small plain" onclick="App.parentUnlocked=false;App.go(\'parent\')">🔒 上锁</button></div>';
      html += '<div class="card"><b>⏰ 使用时长</b>'
        + '<div class="row spread" style="margin-top:10px"><span>今日已练习</span><b>' + Game.todayMinutes() + ' 分钟</b></div>'
        + '<div class="row spread" style="padding:8px 0"><span>每日时长上限</span><div>'
        + [15, 30, 45, 60].map(m => '<button class="btn small ' + (st.limitMin === m ? "" : "plain") + '" style="margin-left:6px" onclick="App.setLimit(' + m + ')">' + m + '分</button>').join("") + '</div></div>'
        + '<div class="muted">达到上限只提示不锁死；每练 25 分钟弹出护眼休息提醒。</div></div>';
      html += '<div class="card"><b>🌙 免打扰时段</b><div class="row" style="margin-top:10px"><span style="flex:1">开始 '
        + '<input class="fill-input" style="width:70px;display:inline-block;padding:8px" type="number" min="0" max="23" id="qsH" value="' + st.quietStart + '"> 点</span>'
        + '<span style="flex:1">结束 <input class="fill-input" style="width:70px;display:inline-block;padding:8px" type="number" min="0" max="23" id="qeH" value="' + st.quietEnd + '"> 点</span>'
        + '<button class="btn small" onclick="App.setQuiet()">保存</button></div></div>';
      html += '<div class="card"><b>🔔 学习报告摘要</b>'
        + '<div class="row spread" style="padding:6px 0"><span>累计答题</span><b>' + S.stats.answered + ' 题</b></div>'
        + '<div class="row spread" style="padding:6px 0"><span>总正确率</span><b>' + (S.stats.answered ? Math.round(S.stats.correct / S.stats.answered * 100) : 0) + '%</b></div>'
        + '<div class="row spread" style="padding:6px 0"><span>连续打卡</span><b>' + (S.stats.streak || 0) + ' 天</b></div>'
        + '<div class="row spread" style="padding:6px 0"><span>错题本</span><b>' + Object.keys(S.wrong).length + ' 题</b></div>'
        + '<button class="btn small pink block" onclick="App.go(\'report\')">查看完整学习报告</button></div>';
      html += '<div class="card"><b>⚙️ 其他设置</b>'
        + '<div class="row spread" style="padding:8px 0"><span>题目朗读音效开关</span><button class="btn small plain" onclick="App.toggleSound()">音效：' + (st.sound ? "开" : "关") + '</button></div>'
        + '<div class="row spread" style="padding:8px 0"><span>修改 PIN</span><button class="btn small plain" onclick="App.changePin()">修改</button></div>'
        + '<div class="row spread" style="padding:8px 0"><span>字号</span><div>'
        + [["std", "标准"], ["big", "大"], ["huge", "特大"]].map(f => '<button class="btn small ' + (st.fontSize === f[0] ? "" : "plain") + '" style="margin-left:6px" onclick="App.setFont(\'' + f[0] + '\')">' + f[1] + '</button>').join("") + '</div></div>'
        + '<div class="row spread" style="padding:8px 0"><span>重置进度</span><div>'
        + '<button class="btn small warn" onclick="App.resetSubject(\'cn\')">语文</button>'
        + '<button class="btn small warn" onclick="App.resetSubject(\'ma\')">数学</button>'
        + '<button class="btn small warn" onclick="App.resetSubject(\'en\')">英语</button></div></div>'
        + '<div class="muted">重置某科会清空该科关卡星级与错题记录（保留积分与装扮）。</div></div>';
      App.setScreen(html, true);
    }
  };

  window.Views = Views;
  window.SUBJ_META = SUBJ;
})();
