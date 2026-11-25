// 小音角色：SVG 分层渲染（表情 6 种 + 发型/服装/配饰/背景/道具换装）
window.CHAR = (function () {
  const EX_LINES = {
    welcome: ["欢迎来到学习岛！", "今天也要元气满满哦～", "选一个存档开始冒险吧！"],
    think: ["这题有点意思……", "让我想一想～", "冷静分析一下！"],
    surprise: ["哇！答对啦！", "好厉害！！", "没想到你这么强！"],
    cheer: ["连击达成！太棒啦！", "一发入魂！", "你就是学习岛传说！"],
    sad: ["没关系，再来一次一定行！", "错了也没关系，吃一堑长一智～", "呜……下次注意哦"],
    encourage: ["稳住，我们能赢！", "深呼吸，看清楚题目～", "加油，最后一题了！"]
  };

  function grad(color, id) {
    if (color === "grad") return 'url(#hgrad' + id + ')';
    if (color === "aurora") return 'url(#haur' + id + ')';
    if (color === "rainbow") return 'url(#haur' + id + ')';
    return color;
  }

  function render(expr, size) {
    // 启动页尚未选择存档时 Game.S 为 null，使用默认装扮兜底
    const S = Game.S || { equipped: { hair: "hair-1", fit: "fit-1", acc: "acc-1", bg: "bg-1", title: null, prop: null } };
    const hair = window.DRESSUP_BY_ID[S.equipped.hair] || window.DRESSUP_BY_ID["hair-1"];
    const fit = window.DRESSUP_BY_ID[S.equipped.fit] || window.DRESSUP_BY_ID["fit-1"];
    const acc = window.DRESSUP_BY_ID[S.equipped.acc] || window.DRESSUP_BY_ID["acc-1"];
    const bg = window.DRESSUP_BY_ID[S.equipped.bg] || window.DRESSUP_BY_ID["bg-1"];
    const prop = S.equipped.prop ? window.DRESSUP_BY_ID[S.equipped.prop] : null;
    const hairColor = grad(hair.svg.color, "h");
    const accColor = acc.svg.kind === "hp" ? grad(acc.svg.color, "a") : "#39C5BB";
    const [sky1, sky2] = bg.svg.sky;

    // 眼睛和嘴
    let eyes = "", mouth = "";
    const eL = 143, eR = 177, eY = 112;
    if (expr === "surprise") {
      eyes = '<circle cx="' + eL + '" cy="' + eY + '" r="9" fill="#fff" stroke="#33404D" stroke-width="2"/><circle cx="' + eL + '" cy="' + eY + '" r="4" fill="#33404D"/>'
        + '<circle cx="' + eR + '" cy="' + eY + '" r="9" fill="#fff" stroke="#33404D" stroke-width="2"/><circle cx="' + eR + '" cy="' + eY + '" r="4" fill="#33404D"/>';
      mouth = '<ellipse cx="160" cy="132" rx="6" ry="8" fill="#B3596B"/>';
    } else if (expr === "cheer") {
      eyes = '<path d="M136 ' + eY + ' Q' + eL + ' ' + (eY - 10) + ' 150 ' + eY + '" stroke="#33404D" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
        + '<path d="M170 ' + eY + ' Q' + eR + ' ' + (eY - 10) + ' 184 ' + eY + '" stroke="#33404D" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M148 128 Q160 142 172 128" fill="#B3596B"/>';
    } else if (expr === "sad") {
      eyes = '<path d="M138 114 Q' + eL + ' ' + (eY + 8) + ' 150 ' + eY + '" stroke="#33404D" stroke-width="3" fill="none" stroke-linecap="round"/>'
        + '<path d="M182 114 Q' + eR + ' ' + (eY + 8) + ' 170 ' + eY + '" stroke="#33404D" stroke-width="3" fill="none" stroke-linecap="round"/>'
        + '<ellipse cx="150" cy="122" rx="3" ry="4.5" fill="#7FC7E8"/>'
        + '<ellipse cx="170" cy="122" rx="3" ry="4.5" fill="#7FC7E8"/>';
      mouth = '<path d="M152 136 Q160 128 168 136" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === "think") {
      eyes = '<circle cx="' + eL + '" cy="' + eY + '" r="5" fill="#33404D"/>'
        + '<path d="M170 ' + eY + ' Q' + eR + ' ' + (eY - 4) + ' 184 ' + eY + '" stroke="#33404D" stroke-width="3" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M154 133 Q160 131 166 132" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === "encourage") {
      eyes = '<circle cx="' + eL + '" cy="' + eY + '" r="5.5" fill="#33404D"/><circle cx="' + eR + '" cy="' + eY + '" r="5.5" fill="#33404D"/>'
        + '<path d="M134 100 L150 104" stroke="#33404D" stroke-width="2.5" stroke-linecap="round"/><path d="M186 100 L170 104" stroke="#33404D" stroke-width="2.5" stroke-linecap="round"/>';
      mouth = '<path d="M150 130 Q160 138 170 130" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else { // welcome / default
      eyes = '<circle cx="' + eL + '" cy="' + eY + '" r="5.5" fill="#33404D"/><circle cx="' + eR + '" cy="' + eY + '" r="5.5" fill="#33404D"/>';
      mouth = '<path d="M152 130 Q160 138 168 130" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }

    // 发型
    let hairShape = "";
    const hcol = hairColor;
    if (hair.svg.style === "pony") {
      hairShape = '<path d="M210 90 Q250 100 246 170 Q244 190 236 196 Q240 150 218 118 Z" fill="' + hcol + '"/>';
    } else if (hair.svg.style === "bob") {
      hairShape = '<path d="M112 105 Q110 150 122 160 L122 118 Z" fill="' + hcol + '"/><path d="M208 105 Q210 150 198 160 L198 118 Z" fill="' + hcol + '"/>';
    } else if (hair.svg.style === "long") {
      hairShape = '<path d="M116 92 Q96 160 104 250 Q112 258 126 250 Q114 170 124 100 Z" fill="' + hcol + '"/>'
        + '<path d="M204 92 Q224 160 216 250 Q208 258 194 250 Q206 170 196 100 Z" fill="' + hcol + '"/>';
    } else if (hair.svg.style === "braid") {
      hairShape = '<path d="M116 92 Q100 150 112 200 Q118 206 124 200 Q112 150 124 100 Z" fill="' + hcol + '"/>'
        + '<line x1="114" y1="130" x2="126" y2="134" stroke="rgba(255,255,255,.5)" stroke-width="2"/>'
        + '<line x1="112" y1="150" x2="124" y2="154" stroke="rgba(255,255,255,.5)" stroke-width="2"/>'
        + '<line x1="112" y1="172" x2="124" y2="176" stroke="rgba(255,255,255,.5)" stroke-width="2"/>'
        + '<path d="M204 92 Q220 150 208 200 Q202 206 196 200 Q208 150 196 100 Z" fill="' + hcol + '"/>';
    } else { // twin
      hairShape = '<path d="M114 92 Q88 130 92 190 Q94 210 106 214 Q98 160 116 104 Z" fill="' + hcol + '"/>'
        + '<path d="M206 92 Q232 130 228 190 Q226 210 214 214 Q222 160 204 104 Z" fill="' + hcol + '"/>';
    }

    // 背景装饰
    let deco = "";
    const d = bg.svg.deco;
    if (d === "house") deco = '<circle cx="50" cy="52" r="18" fill="#FFE08A" opacity=".8"/><rect x="18" y="250" width="60" height="46" rx="6" fill="#FFE3C8"/><path d="M14 252 L48 224 L82 252 Z" fill="#F5B899"/>';
    if (d === "school") deco = '<rect x="20" y="240" width="70" height="56" rx="6" fill="#CFE8FF"/><rect x="32" y="252" width="12" height="12" fill="#fff"/><rect x="54" y="252" width="12" height="12" fill="#fff"/><path d="M16 242 L55 218 L94 242 Z" fill="#9FC9F0"/>';
    if (d === "sea") deco = '<path d="M0 268 Q60 258 160 268 T320 268 V320 H0 Z" fill="#A8DFF2"/><path d="M0 278 Q80 268 160 278 T320 278" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>';
    if (d === "field") deco = '<circle cx="270" cy="60" r="20" fill="#FFB36B" opacity=".9"/><rect y="282" width="320" height="38" fill="#BFE8C4"/><ellipse cx="60" cy="284" rx="30" ry="10" fill="#A9DDB0"/>';
    if (d === "star") deco = '<circle cx="60" cy="50" r="2.5" fill="#fff" opacity=".9"/><circle cx="120" cy="34" r="2" fill="#fff" opacity=".7"/><circle cx="200" cy="46" r="2.5" fill="#fff" opacity=".9"/><circle cx="260" cy="30" r="2" fill="#fff" opacity=".7"/><circle cx="90" cy="80" r="1.8" fill="#fff" opacity=".6"/><circle cx="290" cy="90" r="1.8" fill="#fff" opacity=".6"/>';
    if (d === "sakura") deco = '<circle cx="46" cy="60" r="3" fill="#F7B6C8"/><circle cx="60" cy="44" r="4" fill="#F7B6C8"/><circle cx="280" cy="52" r="3" fill="#F7B6C8"/><circle cx="262" cy="70" r="2.5" fill="#F7B6C8"/><circle cx="250" cy="38" r="3.5" fill="#F7B6C8"/>';

    // 配饰
    let accessory = "";
    const kind = acc.svg.kind;
    if (kind === "glasses") {
      const gc = acc.svg.color;
      accessory = '<circle cx="' + eL + '" cy="' + eY + '" r="12" fill="rgba(255,255,255,.35)" stroke="' + gc + '" stroke-width="3"/>'
        + '<circle cx="' + eR + '" cy="' + eY + '" r="12" fill="rgba(255,255,255,.35)" stroke="' + gc + '" stroke-width="3"/>'
        + '<line x1="155" y1="' + eY + '" x2="165" y2="' + eY + '" stroke="' + gc + '" stroke-width="3"/>';
    } else if (kind === "pin") {
      accessory = '<circle cx="120" cy="78" r="6" fill="' + acc.svg.color + '" stroke="#fff" stroke-width="1.5"/>';
    } else if (kind === "band") {
      accessory = '<path d="M118 84 Q160 64 202 84" stroke="' + acc.svg.color + '" stroke-width="8" fill="none" stroke-linecap="round"/>'
        + '<circle cx="204" cy="84" r="7" fill="' + acc.svg.color + '" stroke="#F7B6C8" stroke-width="2"/>';
    } else if (kind === "bag") {
      accessory = '<rect x="214" y="180" width="26" height="34" rx="8" fill="' + acc.svg.color + '" stroke="#33404D" stroke-width="2"/>';
    }

    // 服装
    const cape = fit.svg.cape ? '<path d="M130 168 Q118 240 128 262 L192 262 Q202 240 190 168 Z" fill="' + fit.svg.cape + '" opacity=".85"/>' : "";
    const tie = fit.svg.tie ? '<path d="M155 162 L165 162 L162 172 L168 186 L160 196 L152 186 L158 172 Z" fill="' + fit.svg.tie + '"/>' : "";
    const collar = '<path d="M140 158 L160 168 L180 158" stroke="#E2EAEF" stroke-width="3" fill="none"/>';

    const svg = '<svg viewBox="0 0 320 320" width="' + (size || "100%") + '" xmlns="http://www.w3.org/2000/svg">'
      + '<defs>'
      + '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky1 + '"/><stop offset="1" stop-color="' + sky2 + '"/></linearGradient>'
      + '<linearGradient id="hgradh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#39C5BB"/><stop offset="1" stop-color="#F7B6C8"/></linearGradient>'
      + '<linearGradient id="haurh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#39C5BB"/><stop offset=".35" stop-color="#F7B6C8"/><stop offset=".7" stop-color="#B79CE8"/><stop offset="1" stop-color="#FFD166"/></linearGradient>'
      + '<linearGradient id="haura" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E86A6A"/><stop offset=".3" stop-color="#F5A623"/><stop offset=".6" stop-color="#4CAF7D"/><stop offset="1" stop-color="#39C5BB"/></linearGradient>'
      + '</defs>'
      + '<rect width="320" height="320" rx="24" fill="url(#sky)"/>'
      + deco
      + (prop ? '<text x="284" y="70" font-size="26">' + prop.emoji + '</text>' : '')
      + '<g class="floaty">'
      // 双马尾在头后
      + hairShape
      + cape
      // 身体
      + '<rect x="134" y="152" width="52" height="20" rx="8" fill="#FFF3E8"/>'
      + '<path d="M126 210 L194 210 L212 258 L108 258 Z" fill="' + fit.svg.skirt + '"/>'
      + '<rect x="122" y="158" width="76" height="58" rx="14" fill="' + fit.svg.top + '" stroke="rgba(51,64,77,.12)" stroke-width="2"/>'
      + collar + tie
      + '<rect x="106" y="166" width="14" height="46" rx="7" fill="' + fit.svg.top + '"/>'
      + '<rect x="200" y="166" width="14" height="46" rx="7" fill="' + fit.svg.top + '"/>'
      + '<circle cx="113" cy="214" r="7" fill="#FFF3E8"/><circle cx="207" cy="214" r="7" fill="#FFF3E8"/>'
      + '<rect x="136" y="258" width="14" height="34" rx="6" fill="#FFF3E8"/>'
      + '<rect x="170" y="258" width="14" height="34" rx="6" fill="#FFF3E8"/>'
      + '<rect x="132" y="288" width="21" height="10" rx="5" fill="#33404D"/>'
      + '<rect x="167" y="288" width="21" height="10" rx="5" fill="#33404D"/>'
      // 头
      + '<circle cx="160" cy="112" r="46" fill="#FFF3E8"/>'
      + '<path d="M114 106 Q118 62 160 60 Q202 62 206 106 Q196 92 178 88 Q160 84 142 88 Q124 92 114 106 Z" fill="' + hcol + '"/>'
      + '<path d="M114 100 Q114 128 118 140 Q126 128 124 104 Z" fill="' + hcol + '"/>'
      + '<path d="M206 100 Q206 128 202 140 Q194 128 196 104 Z" fill="' + hcol + '"/>'
      + eyes + mouth
      + '<circle cx="132" cy="124" r="6" fill="#F7B6C8" opacity=".55"/><circle cx="188" cy="124" r="6" fill="#F7B6C8" opacity=".55"/>'
      // 耳机 / 发箍
      + (kind === "band" ? '' : '<path d="M112 92 Q160 44 208 92" stroke="' + accColor + '" stroke-width="9" fill="none" stroke-linecap="round"/>'
        + '<rect x="104" y="98" width="16" height="26" rx="8" fill="' + accColor + '" stroke="rgba(51,64,77,.2)" stroke-width="2"/>'
        + '<rect x="200" y="98" width="16" height="26" rx="8" fill="' + accColor + '" stroke="rgba(51,64,77,.2)" stroke-width="2"/>')
      + accessory
      + '</g></svg>';
    return svg;
  }

  function line(expr) {
    const arr = EX_LINES[expr] || EX_LINES.welcome;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 宠物渲染：出战宠物 + 宠物装扮 + 等级徽章（无存档或未养宠物时返回空串）
  function renderPet(size) {
    const S = Game.S;
    if (!S || !S.pets || !S.pets.equipped) return "";
    const pet = window.DRESSUP_BY_ID[S.pets.equipped];
    if (!pet) return "";
    const st = (S.pets.st && S.pets.st[pet.id]) || { xp: 0, pacc: null };
    const lv = petLevelOf(st.xp);
    const acc = st.pacc ? window.DRESSUP_BY_ID[st.pacc] : null;
    return '<div style="display:inline-flex;flex-direction:column;align-items:center;margin-top:6px">'
      + '<div style="position:relative;width:' + (size || "84px") + ';height:' + (size || "84px") + ';background:rgba(255,255,255,.85);border-radius:18px;box-shadow:0 3px 10px rgba(57,197,187,.25);display:flex;align-items:center;justify-content:center">'
      + '<span style="font-size:' + (size ? Math.round(parseInt(size) * 0.5) + "px" : "2.4rem") + '">' + pet.emoji + '</span>'
      + (acc ? '<span style="position:absolute;top:2px;right:4px;font-size:1rem">' + acc.emoji + '</span>' : '')
      + '<span style="position:absolute;bottom:2px;left:4px;font-size:.62rem;font-weight:800;background:#39C5BB;color:#fff;border-radius:8px;padding:1px 6px">Lv' + lv + '</span>'
      + '</div><div class="muted" style="font-size:.68rem;margin-top:2px">' + pet.name + '</div></div>';
  }
  function petLevelOf(xp) {
    const R = window.PET_RULES || { LEVEL_STEP: 40, MAX_LEVEL: 10 };
    return Math.max(1, Math.min(R.MAX_LEVEL, Math.floor((xp || 0) / R.LEVEL_STEP) + 1));
  }

  return { render, line, EX_LINES, renderPet, petLevelOf };
})();
