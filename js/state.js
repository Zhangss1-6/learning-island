// 状态管理：三存档 localStorage、积分经济、星级、错题本、成就、每日任务、打卡
(function () {
  const PREFIX = "cnx_island_";
  const SLOT_KEY = (i) => PREFIX + "slot" + i;

  function defaultState(name) {
    return {
      name: name || "小同学",
      createdAt: Date.now(),
      points: 0,                       // 可花积分
      pointsEarned: 0,                 // 累计获得
      equipped: { hair: "hair-1", fit: "fit-1", acc: "acc-1", bg: "bg-1", title: null, prop: null },
      owned: ["hair-1", "fit-1", "acc-1", "bg-1"],
      stars: {},                       // key: subj|term|unit|lv -> 0..3
      best: {},                        // 关卡历史最好得分
      testScores: {},                  // 测评 key -> {score, at}
      flags: {},                       // 一次性奖励标记
      wrong: {},                       // qid -> {qid, times, lastMy, mastered, kp, subject, lastAt}
      masteredCount: 0,
      stats: {
        answered: 0, correct: 0,
        byUnit: {},                    // key subj-term-unit -> {a,c}
        days: {},                      // date -> {a,c,min,points}
        streak: 0, lastLogin: null, bestStreak: 0,
        taskDone: 0, retryCount: 0, retriedCorrect: 0,
        levelsDone: 0, bestStreakInRun: 0
      },
      purchases: 0,
      achievements: [],
      tasks: { date: null, list: [] },
      settings: { sound: false, fontSize: "std", limitMin: 30, quietStart: 21, quietEnd: 22, pin: null },
      minutesToday: 0, minutesDate: null, practiceStart: null
    };
  }

  const Store = {
    listSlots() {
      const out = [];
      for (let i = 0; i < 3; i++) {
        const raw = localStorage.getItem(SLOT_KEY(i));
        out.push(raw ? { i, data: JSON.parse(raw) } : { i, data: null });
      }
      return out;
    },
    load(i) { const raw = localStorage.getItem(SLOT_KEY(i)); return raw ? JSON.parse(raw) : null; },
    save(state, slot) { localStorage.setItem(SLOT_KEY(slot), JSON.stringify(state)); },
    removeSlot(i) { localStorage.removeItem(SLOT_KEY(i)); },
    defaults: defaultState
  };

  function todayStr() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function rand() { return Math.random(); }

  // ===== 每日任务池 =====
  const TASK_POOL = [
    { id: "t-answer30", text: "今日答对 30 题", target: 30, unit: "correct" },
    { id: "t-answer15", text: "今日答对 15 题", target: 15, unit: "correct" },
    { id: "t-levels2", text: "完成 2 个关卡", target: 2, unit: "levels" },
    { id: "t-levels1", text: "完成 1 个关卡", target: 1, unit: "levels" },
    { id: "t-unittest", text: "完成 1 次单元测", target: 1, unit: "unittest" },
    { id: "t-wrong5", text: "错题重练答对 5 题", target: 5, unit: "retrycorrect" },
    { id: "t-points150", text: "今日获得 150 积分", target: 150, unit: "points" },
    { id: "t-threestar", text: "获得 1 次三星通关", target: 1, unit: "threestar" }
  ];

  const Game = {
    slot: 0,
    S: null,

    start(slot, state) { this.slot = slot; this.S = state || defaultState(); this.login(); Store.save(this.S, slot); },
    save() { if (this.S) Store.save(this.S, this.slot); },

    // ===== 打卡 & 首登 =====
    login() {
      const S = this.S, today = todayStr();
      if (S.stats.lastLogin !== today) {
        const yest = new Date(); yest.setDate(yest.getDate() - 1);
        const ystr = yest.getFullYear() + "-" + String(yest.getMonth() + 1).padStart(2, "0") + "-" + String(yest.getDate()).padStart(2, "0");
        S.stats.streak = S.stats.lastLogin === ystr ? (S.stats.streak || 0) + 1 : 1;
        S.stats.lastLogin = today;
        S.stats.bestStreak = Math.max(S.stats.bestStreak || 0, S.stats.streak);
        this.addPoints(20, "每日首登");
        if (S.stats.streak >= 7) this.addPoints(40, "连续打卡 " + S.stats.streak + " 天");
      }
      // 刷新每日任务
      if (S.tasks.date !== today) {
        const pool = TASK_POOL.slice();
        const list = [];
        for (let i = 0; i < 3 && pool.length; i++) list.push(pool.splice(Math.floor(rand() * pool.length), 1)[0].id);
        S.tasks = { date: today, list: list.map(id => ({ id, prog: 0, done: false })) };
      }
      if (S.minutesDate !== today) { S.minutesDate = today; S.minutesToday = 0; }
      this.checkAchievements();
    },

    taskProg(unit, n) {
      const S = this.S, today = todayStr();
      if (S.tasks.date !== today) return;
      let changed = false;
      S.tasks.list.forEach(t => {
        const def = TASK_POOL.find(p => p.id === t.id);
        if (def && def.unit === unit && !t.done) {
          t.prog += n;
          if (t.prog >= def.target) { t.done = true; t.prog = def.target; this.addPoints(30, "每日任务：" + def.text); changed = true; }
        }
      });
      if (changed && S.tasks.list.every(t => t.done)) { S.stats.taskDone = (S.stats.taskDone || 0) + 3; }
      this.checkAchievements();
    },

    todayPoints() { const d = this.S.stats.days[todayStr()]; return d ? (d.points || 0) : 0; },

    // ===== 积分 =====
    addPoints(n, reason) {
      const S = this.S;
      S.points += n; S.pointsEarned += n;
      const d = S.stats.days[todayStr()] || (S.stats.days[todayStr()] = { a: 0, c: 0, min: 0, points: 0 });
      d.points = (d.points || 0) + n;
      if (reason) App.toast("＋" + n + " 积分 · " + reason);
      this.taskProg("points", n);
      this.checkAchievements();
    },

    // ===== 答题记录（关卡与测验共用） =====
    recordAnswer(q, correct, myAnswer, isRetry) {
      const S = this.S;
      S.stats.answered++; 
      const d = S.stats.days[todayStr()] || (S.stats.days[todayStr()] = { a: 0, c: 0, min: 0, points: 0 });
      d.a++;
      const ukey = q.subject + "-" + q.term + "-" + q.unit;
      const u = S.stats.byUnit[ukey] || (S.stats.byUnit[ukey] = { a: 0, c: 0 });
      u.a++;
      if (correct) {
        S.stats.correct++; d.c++; u.c++;
        if (isRetry) {
          S.stats.retriedCorrect = (S.stats.retriedCorrect || 0) + 1;
          this.taskProg("retrycorrect", 1);
          const w = S.wrong[q.id];
          if (w) { w.times = (w.times || 0) + 1; if (w.times >= 2 && !w.mastered) { w.mastered = true; S.masteredCount++; delete S.wrong[q.id]; App.toast("✅ 连续答对 2 次，已掌握！"); } }
        }
      } else {
        const w = S.wrong[q.id] || (S.wrong[q.id] = { qid: q.id, times: 0, kp: q.kp ? q.kp.join("、") : "", subject: q.subject, lastMy: "", mastered: false, lastAt: Date.now() });
        w.times = Math.max(0, (w.times || 0) - 0); // 重置连续答对
        if (isRetry) w.times = 0;
        w.lastMy = String(myAnswer || "").slice(0, 60);
        w.lastAt = Date.now();
        w.kp = q.kp ? q.kp.join("、") : "";
      }
      this.checkAchievements();
    },

    // ===== 关卡结算 =====
    finishLevel(subject, term, unit, lv, wrongCount, total, rawScore, failed) {
      const S = this.S;
      const key = subject + "|" + term + "|" + unit + "|" + lv;
      let stars = 0, gained = 0, isNewBest = false, note = "";
      if (failed) { stars = 0; note = "心尽未通关，积分不变，再来一次一定行！"; }
      else {
        stars = wrongCount <= 1 ? 3 : (wrongCount <= 3 ? 2 : 1);
        const oldBest = S.best[key];
        if (oldBest === undefined || rawScore > oldBest) {
          gained = oldBest === undefined ? rawScore : (rawScore - oldBest);
          S.best[key] = rawScore;
          isNewBest = oldBest !== undefined;
          if (oldBest !== undefined) note = "进步奖励：补差价 " + gained + " 分";
        } else { note = "未超历史最好成绩（" + oldBest + " 分），不扣分不加分"; gained = 0; }
        if (stars === 3 && S.stars[key] !== 3) { gained += 50; note += "；三星 +50"; }
        S.stars[key] = Math.max(S.stars[key] || 0, stars);
        const firstDone = oldBest === undefined;
        if (firstDone) { S.stats.levelsDone++; this.taskProg("levels", 1); if (stars === 3) this.taskProg("threestar", 1); }
        else if (stars === 3 && !S.flags["ts" + key]) { this.taskProg("threestar", 1); }
        if (stars === 3) S.flags["ts" + key] = true;
        if (gained > 0) this.addPoints(gained, "关卡结算");
      }
      S.stats.bestStreakInRun = 0;
      this.checkAchievements();
      Store.save(S, this.slot);
      return { stars, gained, note: note.trim(), isNewBest };
    },

    unitUnlocked(subject, term, unit) {
      const units = window.UNIT_META[subject][term];
      if (unit <= 1) return true;
      // 前一单元三关全通
      for (let lv = 1; lv <= 3; lv++) if (!(this.S.stars[subject + "|" + term + "|" + (unit - 1) + "|" + lv] > 0)) return false;
      return true;
    },
    stageUnlocked(subject, term, unit, lv) {
      if (lv === 1) return this.unitUnlocked(subject, term, unit);
      return (this.S.stars[subject + "|" + term + "|" + unit + "|" + (lv - 1)] > 0);
    },
    unitTestUnlocked(subject, term, unit) {
      for (let lv = 1; lv <= 3; lv++) if (!(this.S.stars[subject + "|" + term + "|" + unit + "|" + lv] > 0)) return false;
      return true;
    },
    subjectAllCleared(subject) {
      for (const term in window.UNIT_META[subject]) {
        const n = window.UNIT_META[subject][term].length;
        for (let u = 1; u <= n; u++) for (let lv = 1; lv <= 3; lv++) if (!(this.S.stars[subject + "|" + term + "|" + u + "|" + lv] > 0)) return false;
      }
      return true;
    },

    // ===== 测评 =====
    recordTest(kind, key, score, maxScore, subject) {
      const S = this.S;
      const prev = S.testScores[key];
      const best = prev ? Math.max(prev.score, score) : score;
      S.testScores[key] = { score: best, at: Date.now() };
      const pct = score / maxScore * 100;
      if (kind === "unit") {
        S.flags["ut-done"] = true;
        if (!S.flags["ut-pass" + key] && pct >= 60) { S.flags["ut-pass" + key] = true; this.addPoints(100, "单元测合格"); }
        if (!S.flags["ut-exc" + key] && pct >= 85) { S.flags["ut-exc" + key] = true; this.addPoints(200, "单元测优秀"); }
        this.taskProg("unittest", 1);
      }
      this.checkAchievements();
      Store.save(S, this.slot);
      return best;
    },

    // ===== 装扮 =====
    buy(id) {
      const S = this.S, item = window.DRESSUP_BY_ID[id];
      if (!item || S.owned.includes(id)) return false;
      if (item.ach && !S.achievements.includes(item.ach)) return false;
      if (S.points < item.price) return false;
      S.points -= item.price; S.owned.push(id); S.purchases++;
      this.checkAchievements(); Store.save(S, this.slot);
      return true;
    },
    equip(cat, id) { const S = this.S; S.equipped[cat] = id; if (cat === "title") S.equipped.title = id; Store.save(S, this.slot); },

    // ===== 成就 =====
    checkAchievements() {
      const S = this.S, got = [];
      const has = id => S.achievements.includes(id);
      const add = id => { if (!has(id)) { S.achievements.push(id); got.push(id); } };
      const correctRate = (subj, term, u) => { const s = S.stats.byUnit[subj + "-" + term + "-" + u]; return s && s.a ? s.c / s.a : -1; };
      if (S.stats.levelsDone >= 1) add("ach-firstlevel");
      if (Object.values(S.stars).some(v => v === 3)) add("ach-firstthreestar");
      if (S.stats.answered >= 100) add("ach-answer100");
      if (S.stats.answered >= 500) add("ach-answer500");
      if (S.stats.answered >= 1500) add("ach-answer1500");
      if (S.pointsEarned >= 500) add("ach-points500");
      if (S.pointsEarned >= 2000) add("ach-points2000");
      if (S.pointsEarned >= 5000) add("ach-points5000");
      if (S.purchases >= 1) add("ach-buyfirst");
      if (S.purchases >= 10) add("ach-buy10");
      if (Object.keys(S.wrong).length >= 1) add("ach-wrongfirst");
      if (S.masteredCount >= 10) add("ach-mastered10");
      if (S.stats.retriedCorrect >= 10) add("ach-retry10");
      if (S.stats.streak >= 1) add("ach-day1");
      if (S.stats.streak >= 7) add("ach-streak7");
      if (S.stats.streak >= 30) add("ach-streak30");
      if (S.stats.levelsDone >= 10) add("ach-level10");
      if (S.stats.levelsDone >= 30) add("ach-level30");
      if (Object.values(S.stars).some(v => v > 0)) { /* levels begun */ }
      if (S.flags["ut-done"]) add("ach-unittestfirst");
      if (Object.entries(S.testScores).some(([k, v]) => k.startsWith("ut-") && v.score >= 60)) add("ach-unittestpass");
      if (Object.entries(S.testScores).some(([k, v]) => k.startsWith("ut-") && v.score >= 85)) add("ach-unittestexcellent");
      if (Object.keys(S.testScores).some(k => k.startsWith("final-"))) add("ach-finalfirst");
      if (Object.keys(S.testScores).some(k => k.startsWith("sc-"))) add("ach-shengchufirst");
      if (Object.entries(S.testScores).some(([k, v]) => k.startsWith("sc-") && v.score >= 85)) add("ach-shengchu");
      if (this.subjectAllCleared("cn")) add("ach-subjectcn");
      if (this.subjectAllCleared("ma")) add("ach-subjectma");
      if (this.subjectAllCleared("en")) add("ach-subjecten");
      // 三科单元测全优
      const exc = s => Object.entries(S.testScores).some(([k, v]) => k.startsWith("ut-" + s + "-") && v.score >= 85);
      if (["cn", "ma", "en"].every(exc)) add("ach-subjectall");
      const fin = s => Object.entries(S.testScores).some(([k, v]) => k.startsWith("final-" + s + "-") && v.score >= 85);
      if (["cn", "ma", "en"].every(fin)) add("ach-finalallexcellent");
      if (S.achievements.filter(a => a !== "ach-achiever20").length >= 19) add("ach-achiever20");
      return got;
    },

    // ===== 错题重练积分（一半） =====
    retryPoint() { return 5; },

    // ===== 使用时长 =====
    beginPractice() { if (!this.S.practiceStart) this.S.practiceStart = Date.now(); },
    endPractice() {
      const S = this.S;
      if (S.practiceStart) {
        const mins = Math.round((Date.now() - S.practiceStart) / 60000);
        S.minutesToday += mins;
        const d = S.stats.days[todayStr()] || (S.stats.days[todayStr()] = { a: 0, c: 0, min: 0, points: 0 });
        d.min += mins;
        S.practiceStart = null;
        Store.save(S, this.slot);
        return mins;
      }
      return 0;
    },
    todayMinutes() { return this.S.minutesToday + (this.S.practiceStart ? Math.round((Date.now() - this.S.practiceStart) / 60000) : 0); },
    overLimit() { return this.todayMinutes() > this.S.settings.limitMin; }
  };

  window.Game = Game;
  window.Store = Store;
  window.todayStr = todayStr;
  window.TASK_DEFS = {};
  TASK_POOL.forEach(t => { window.TASK_DEFS[t.id] = t; });
})();
