// 小音角色：Q 版大头造型（参考卡通形象：大眼睛+腮红+双马尾）
// SVG 分层渲染（表情 6 种 + 发型/服装/配饰/背景/道具换装）
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

  const SKIN = "#FFF3E8";
  const INK = "#2A3540";

  // ===== Q 版大眼睛（带高光）=====
  // mood: normal / surprise / happy / sad / side / firm
  function eye(cx, cy, mood, flip) {
    const s = mood === "surprise" ? 1.18 : 1;      // 惊讶时眼睛放大
    const rx = 10.5 * s, ry = 12.5 * s;
    let iris = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="url(#irisg)" stroke="' + INK + '" stroke-width="1.6"/>';
    if (mood === "surprise") iris += '<circle cx="' + cx + '" cy="' + cy + '" r="4.5" fill="' + INK + '"/>';
    else iris += '<ellipse cx="' + (cx + (mood === "side" ? (flip ? 3.5 : -3.5) : 0)) + '" cy="' + (cy + (mood === "sad" ? 2 : 0)) + '" rx="4.2" ry="5.2" fill="' + INK + '"/>';
    iris += '<circle cx="' + (cx - 3.6) + '" cy="' + (cy - 4.8) + '" r="3.4" fill="#fff"/>'
      + '<circle cx="' + (cx + 3.2) + '" cy="' + (cy + 4.2) + '" r="1.7" fill="#fff" opacity=".9"/>';
    if (mood === "sad") iris += '<ellipse cx="' + (cx - 1) + '" cy="' + (cy + 9) + '" rx="2.6" ry="4" fill="#8FCBE8"/>';
    if (mood === "firm") iris += '<path d="M' + (cx - 11) + ' ' + (cy - 13) + ' L' + (cx + 11) + ' ' + (cy - 9) + '" stroke="' + INK + '" stroke-width="2.4" stroke-linecap="round"/>';
    return iris;
  }
  // 开心眯眼（^ ^）
  function happyEye(cx, cy) {
    return '<path d="M' + (cx - 11) + ' ' + (cy + 3) + ' Q' + cx + ' ' + (cy - 12) + ' ' + (cx + 11) + ' ' + (cy + 3) + '" stroke="' + INK + '" stroke-width="3.6" fill="none" stroke-linecap="round"/>';
  }

  function render(expr, size) {
    // 启动页尚未选择存档时 Game.S 为 null，使用默认装扮兜底
    const S = Game.S || { equipped: { hair: "hair-1", fit: "fit-1", acc: "acc-1", bg: "bg-1", title: null, prop: null } };
    const hair = window.DRESSUP_BY_ID[S.equipped.hair] || window.DRESSUP_BY_ID["hair-1"];
    const fit = window.DRESSUP_BY_ID[S.equipped.fit] || window.DRESSUP_BY_ID["fit-1"];
    const acc = window.DRESSUP_BY_ID[S.equipped.acc] || window.DRESSUP_BY_ID["acc-1"];
    const bg = window.DRESSUP_BY_ID[S.equipped.bg] || window.DRESSUP_BY_ID["bg-1"];
    const prop = S.equipped.prop ? window.DRESSUP_BY_ID[S.equipped.prop] : null;
    const hcol = grad(hair.svg.color, "h");
    const accColor = acc.svg.kind === "hp" ? grad(acc.svg.color, "a") : "#39C5BB";
    const [sky1, sky2] = bg.svg.sky;

    // ===== 表情 =====
    let eyes = "", mouth = "";
    const eL = 138, eR = 182, eY = 134, mY = 154;
    if (expr === "surprise") {
      eyes = eye(eL, eY, "surprise") + eye(eR, eY, "surprise", true);
      mouth = '<ellipse cx="160" cy="' + (mY + 2) + '" rx="7" ry="9" fill="#B3596B"/>';
    } else if (expr === "cheer") {
      eyes = happyEye(eL, eY) + happyEye(eR, eY);
      mouth = '<path d="M148 ' + (mY - 2) + ' Q160 ' + (mY + 13) + ' 172 ' + (mY - 2) + ' Z" fill="#B3596B"/><path d="M152 ' + (mY + 2) + ' Q160 ' + (mY + 10) + ' 168 ' + (mY + 2) + ' Z" fill="#FF8FA3"/>';
    } else if (expr === "sad") {
      eyes = eye(eL, eY, "sad") + eye(eR, eY, "sad", true)
        + '<path d="M' + (eL - 11) + ' ' + (eY - 14) + ' Q' + eL + ' ' + (eY - 20) + ' ' + (eL + 11) + ' ' + (eY - 14) + '" stroke="' + INK + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
        + '<path d="M' + (eR - 11) + ' ' + (eY - 14) + ' Q' + eR + ' ' + (eY - 20) + ' ' + (eR + 11) + ' ' + (eY - 14) + '" stroke="' + INK + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M152 ' + (mY + 4) + ' Q160 ' + (mY - 3) + ' 168 ' + (mY + 4) + '" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === "think") {
      eyes = eye(eL, eY, "side") + eye(eR, eY, "side", true);
      mouth = '<path d="M154 ' + (mY + 1) + ' Q160 ' + (mY - 1) + ' 166 ' + (mY + 1) + '" stroke="#B3596B" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    } else if (expr === "encourage") {
      eyes = eye(eL, eY, "firm") + eye(eR, eY, "firm", true);
      mouth = '<path d="M150 ' + (mY - 1) + ' Q160 ' + (mY + 8) + ' 170 ' + (mY - 1) + '" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else { // welcome / default
      eyes = eye(eL, eY, "normal") + eye(eR, eY, "normal", true);
      mouth = '<path d="M152 ' + (mY - 1) + ' Q160 ' + (mY + 8) + ' 168 ' + (mY - 1) + '" stroke="#B3596B" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }

    // ===== 发型（头后层 + 头顶层）=====
    let hairBack = "", hairFront = "";
    if (hair.svg.style === "pony") {
      hairBack = '<path d="M212 86 Q268 110 262 210 Q258 244 240 252 Q252 160 206 106 Z" fill="' + hcol + '"/>'
        + '<path d="M244 250 Q252 238 250 220" stroke="rgba(255,255,255,.35)" stroke-width="4" fill="none" stroke-linecap="round"/>';
    } else if (hair.svg.style === "bob") {
      hairBack = '<path d="M100 112 Q94 168 116 186 Q126 176 118 140 Z" fill="' + hcol + '"/>'
        + '<path d="M220 112 Q226 168 204 186 Q194 176 202 140 Z" fill="' + hcol + '"/>';
    } else if (hair.svg.style === "long") {
      hairBack = '<path d="M102 90 Q78 170 88 262 Q92 276 110 272 Q98 170 116 104 Z" fill="' + hcol + '"/>'
        + '<path d="M218 90 Q242 170 232 262 Q228 276 210 272 Q222 170 204 104 Z" fill="' + hcol + '"/>';
    } else if (hair.svg.style === "braid") {
      hairBack = '<circle cx="96" cy="170" r="11" fill="' + hcol + '"/><circle cx="94" cy="192" r="10" fill="' + hcol + '"/><circle cx="94" cy="213" r="9" fill="' + hcol + '"/><circle cx="95" cy="232" r="8" fill="' + hcol + '"/>'
        + '<circle cx="224" cy="170" r="11" fill="' + hcol + '"/><circle cx="226" cy="192" r="10" fill="' + hcol + '"/><circle cx="226" cy="213" r="9" fill="' + hcol + '"/><circle cx="225" cy="232" r="8" fill="' + hcol + '"/>';
    } else { // twin：参考图同款大双马尾（向外飘）
      hairBack = '<path d="M108 84 Q30 118 36 222 Q39 258 66 262 Q50 158 100 102 Z" fill="' + hcol + '"/>'
        + '<path d="M212 84 Q290 118 284 222 Q281 258 254 262 Q270 158 220 102 Z" fill="' + hcol + '"/>'
        // 发丝高光
        + '<path d="M62 244 Q54 176 84 116" stroke="rgba(255,255,255,.4)" stroke-width="5" fill="none" stroke-linecap="round"/>'
        + '<path d="M258 244 Q266 176 236 116" stroke="rgba(255,255,255,.4)" stroke-width="5" fill="none" stroke-linecap="round"/>';
    }
    // 头顶发帽 + 刘海（发帽整圆盖头，脸部椭圆盖出刘海弧线）
    hairFront = '<circle cx="160" cy="118" r="64" fill="' + hcol + '"/>'
      + '<ellipse cx="160" cy="142" rx="50" ry="41" fill="' + SKIN + '"/>'
      // 刘海碎发
      + '<path d="M120 106 Q128 118 136 108" stroke="rgba(42,53,64,.18)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      + '<path d="M158 100 Q164 112 172 102" stroke="rgba(42,53,64,.18)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      + '<path d="M188 106 Q196 116 202 108" stroke="rgba(42,53,64,.18)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      // 双马尾发绳（粉黑配色，参考图同款）
      + (hair.svg.style === "twin" ? '<rect x="92" y="72" width="18" height="12" rx="6" fill="#E85D75" stroke="' + INK + '" stroke-width="2"/><rect x="210" y="72" width="18" height="12" rx="6" fill="#E85D75" stroke="' + INK + '" stroke-width="2"/>' : '')
      + (hair.svg.style === "pony" ? '<rect x="206" y="76" width="18" height="12" rx="6" fill="#E85D75" stroke="' + INK + '" stroke-width="2"/>' : '');

    // ===== 背景装饰 =====
    let deco = "";
    const d = bg.svg.deco;
    if (d === "house") deco = '<circle cx="50" cy="52" r="18" fill="#FFE08A" opacity=".8"/><rect x="18" y="250" width="60" height="46" rx="6" fill="#FFE3C8"/><path d="M14 252 L48 224 L82 252 Z" fill="#F5B899"/>';
    if (d === "school") deco = '<rect x="20" y="240" width="70" height="56" rx="6" fill="#CFE8FF"/><rect x="32" y="252" width="12" height="12" fill="#fff"/><rect x="54" y="252" width="12" height="12" fill="#fff"/><path d="M16 242 L55 218 L94 242 Z" fill="#9FC9F0"/>';
    if (d === "sea") deco = '<path d="M0 268 Q60 258 160 268 T320 268 V320 H0 Z" fill="#A8DFF2"/><path d="M0 278 Q80 268 160 278 T320 278" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>';
    if (d === "field") deco = '<circle cx="270" cy="60" r="20" fill="#FFB36B" opacity=".9"/><rect y="282" width="320" height="38" fill="#BFE8C4"/><ellipse cx="60" cy="284" rx="30" ry="10" fill="#A9DDB0"/>';
    if (d === "star") deco = '<circle cx="60" cy="50" r="2.5" fill="#fff" opacity=".9"/><circle cx="120" cy="34" r="2" fill="#fff" opacity=".7"/><circle cx="200" cy="46" r="2.5" fill="#fff" opacity=".9"/><circle cx="260" cy="30" r="2" fill="#fff" opacity=".7"/><circle cx="90" cy="80" r="1.8" fill="#fff" opacity=".6"/><circle cx="290" cy="90" r="1.8" fill="#fff" opacity=".6"/>';
    if (d === "sakura") deco = '<circle cx="46" cy="60" r="3" fill="#F7B6C8"/><circle cx="60" cy="44" r="4" fill="#F7B6C8"/><circle cx="280" cy="52" r="3" fill="#F7B6C8"/><circle cx="262" cy="70" r="2.5" fill="#F7B6C8"/><circle cx="250" cy="38" r="3.5" fill="#F7B6C8"/>';

    // ===== 配饰 =====
    let accessory = "";
    const kind = acc.svg.kind;
    if (kind === "glasses") {
      const gc = acc.svg.color;
      accessory = '<circle cx="' + eL + '" cy="' + eY + '" r="13" fill="rgba(255,255,255,.35)" stroke="' + gc + '" stroke-width="3"/>'
        + '<circle cx="' + eR + '" cy="' + eY + '" r="13" fill="rgba(255,255,255,.35)" stroke="' + gc + '" stroke-width="3"/>'
        + '<line x1="151" y1="' + eY + '" x2="169" y2="' + eY + '" stroke="' + gc + '" stroke-width="3"/>';
    } else if (kind === "pin") {
      accessory = '<circle cx="124" cy="82" r="6.5" fill="' + acc.svg.color + '" stroke="#fff" stroke-width="1.5"/>';
    } else if (kind === "band") {
      accessory = '<path d="M110 86 Q160 58 210 86" stroke="' + acc.svg.color + '" stroke-width="9" fill="none" stroke-linecap="round"/>'
        + '<circle cx="210" cy="86" r="7" fill="' + acc.svg.color + '" stroke="#F7B6C8" stroke-width="2"/>';
    } else if (kind === "bag") {
      accessory = '<rect x="216" y="190" width="26" height="34" rx="8" fill="' + acc.svg.color + '" stroke="' + INK + '" stroke-width="2"/>';
    }

    // ===== 服装（Q 版小身子）=====
    const cape = fit.svg.cape ? '<path d="M132 182 Q116 240 128 258 L192 258 Q204 240 188 182 Z" fill="' + fit.svg.cape + '" opacity=".85"/>' : "";
    const tie = fit.svg.tie ? '<path d="M157 190 L163 190 L161.5 197 L166 206 L160 212 L154 206 L158.5 197 Z" fill="' + fit.svg.tie + '"/>' : "";
    const collar = '<path d="M144 184 L160 194 L176 184" stroke="#E2EAEF" stroke-width="3" fill="none"/>';

    const svg = '<svg viewBox="0 0 320 320" width="' + (size || "100%") + '" xmlns="http://www.w3.org/2000/svg">'
      + '<defs>'
      + '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + sky1 + '"/><stop offset="1" stop-color="' + sky2 + '"/></linearGradient>'
      // 大眼睛虹膜渐变
      + '<linearGradient id="irisg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FDCDC"/><stop offset=".55" stop-color="#39B8C9"/><stop offset="1" stop-color="#1E7FA0"/></linearGradient>'
      + '<linearGradient id="hgradh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#39C5BB"/><stop offset="1" stop-color="#F7B6C8"/></linearGradient>'
      + '<linearGradient id="haurh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#39C5BB"/><stop offset=".35" stop-color="#F7B6C8"/><stop offset=".7" stop-color="#B79CE8"/><stop offset="1" stop-color="#FFD166"/></linearGradient>'
      + '<linearGradient id="haura" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E86A6A"/><stop offset=".3" stop-color="#F5A623"/><stop offset=".6" stop-color="#4CAF7D"/><stop offset="1" stop-color="#39C5BB"/></linearGradient>'
      + '</defs>'
      + '<rect width="320" height="320" rx="24" fill="url(#sky)"/>'
      + deco
      + (prop ? '<text x="284" y="70" font-size="26">' + prop.emoji + '</text>' : '')
      + '<g class="floaty">'
      // 后层长发
      + hairBack
      + cape
      // 身体（Q 版：头大身小）
      + '<rect x="137" y="254" width="13" height="32" rx="6" fill="' + SKIN + '"/>'
      + '<rect x="170" y="254" width="13" height="32" rx="6" fill="' + SKIN + '"/>'
      + '<rect x="132" y="284" width="23" height="11" rx="5.5" fill="' + INK + '"/>'
      + '<rect x="165" y="284" width="23" height="11" rx="5.5" fill="' + INK + '"/>'
      + '<path d="M128 222 L192 222 L206 256 L114 256 Z" fill="' + fit.svg.skirt + '"/>'
      // 百褶裙褶线
      + '<line x1="146" y1="224" x2="140" y2="255" stroke="rgba(42,53,64,.14)" stroke-width="2"/>'
      + '<line x1="160" y1="224" x2="160" y2="255" stroke="rgba(42,53,64,.14)" stroke-width="2"/>'
      + '<line x1="174" y1="224" x2="180" y2="255" stroke="rgba(42,53,64,.14)" stroke-width="2"/>'
      + '<rect x="134" y="180" width="52" height="46" rx="15" fill="' + fit.svg.top + '" stroke="rgba(51,64,77,.12)" stroke-width="2"/>'
      + collar + tie
      + '<rect x="118" y="186" width="12" height="36" rx="6" fill="' + fit.svg.top + '"/>'
      + '<rect x="190" y="186" width="12" height="36" rx="6" fill="' + fit.svg.top + '"/>'
      + '<circle cx="124" cy="226" r="6.5" fill="' + SKIN + '"/><circle cx="196" cy="226" r="6.5" fill="' + SKIN + '"/>'
      // ===== 大头 =====
      + '<circle cx="160" cy="118" r="62" fill="' + SKIN + '"/>'
      + hairFront
      + eyes + mouth
      // 腮红（参考图同款明显腮红）
      + '<ellipse cx="118" cy="150" rx="10" ry="7" fill="#F7B6C8" opacity=".65"/>'
      + '<ellipse cx="202" cy="150" rx="10" ry="7" fill="#F7B6C8" opacity=".65"/>'
      // 耳机（默认配饰；band 发箍时不叠加）——参考图同款：深色主体 + 粉色装饰条
      + (kind === "band" ? '' : '<path d="M104 96 Q160 40 216 96" stroke="#2A3540" stroke-width="11" fill="none" stroke-linecap="round"/>'
        + '<path d="M104 96 Q160 40 216 96" stroke="' + accColor + '" stroke-width="5" fill="none" stroke-linecap="round"/>'
        + '<rect x="96" y="98" width="18" height="30" rx="9" fill="#2A3540"/>'
        + '<rect x="99" y="101" width="12" height="24" rx="6" fill="' + accColor + '"/>'
        + '<rect x="96" y="110" width="18" height="5" rx="2.5" fill="#E85D75"/>'
        + '<rect x="206" y="98" width="18" height="30" rx="9" fill="#2A3540"/>'
        + '<rect x="209" y="101" width="12" height="24" rx="6" fill="' + accColor + '"/>'
        + '<rect x="206" y="110" width="18" height="5" rx="2.5" fill="#E85D75"/>')
      + accessory
      + '</g></svg>';
    return svg;
  }

  function line(expr) {
    const arr = EX_LINES[expr] || EX_LINES.welcome;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ===== Q 版宠物 SVG 渲染 =====
  // 每种宠物手绘卡通造型：大头圆身 + 大眼睛 + 腮红，与角色风格统一
  function petSVG(pet, size) {
    const c = (pet.svg && pet.svg.color) || "#FFD166";
    const INK = "#2A3540";
    const eyeCute = (x, y, s) => '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (4.5 * s) + '" ry="' + (5.5 * s) + '" fill="url(#pisg)" stroke="' + INK + '" stroke-width="1.2"/>'
      + '<circle cx="' + (x - 1.5) + '" cy="' + (y - 2) + '" r="1.6" fill="#fff"/>'
      + '<circle cx="' + (x + 1.4) + '" cy="' + (y + 1.8) + '" r=".9" fill="#fff" opacity=".9"/>';
    const blush = (x, y) => '<ellipse cx="' + x + '" cy="' + y + '" rx="4" ry="2.6" fill="#F7A6B8" opacity=".7"/>';
    const defs = '<defs><linearGradient id="pisg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FDCDC"/><stop offset="1" stop-color="#1E7FA0"/></linearGradient></defs>';
    const sp = (pet.svg && pet.svg.species) || "chick";
    let b = "";
    if (sp === "chick") {
      b = '<circle cx="50" cy="56" r="30" fill="' + c + '"/>'
        + '<circle cx="50" cy="52" r="22" fill="' + c + '"/>'
        + '<path d="M24 58 Q14 56 18 46 Q26 46 28 54 Z" fill="' + c + '"/><path d="M76 58 Q86 56 82 46 Q74 46 72 54 Z" fill="' + c + '"/>'
        + '<path d="M43 60 L57 60 L50 68 Z" fill="#F5A623"/>'
        + '<path d="M50 68 Q50 76 44 76 M50 68 Q50 76 56 76" stroke="#F5A623" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
        + '<circle cx="50" cy="46" r="3" fill="#E8A0B4" opacity=".8"/>'
        + eyeCute(40, 52, 1) + eyeCute(60, 52, 1) + blush(32, 60) + blush(68, 60);
    } else if (sp === "cat") {
      b = '<path d="M28 34 L32 14 L46 26 Z" fill="' + c + '"/><path d="M72 34 L68 14 L54 26 Z" fill="' + c + '"/>'
        + '<path d="M31 30 L33 20 L40 27 Z" fill="#FFB6C1"/><path d="M69 30 L67 20 L60 27 Z" fill="#FFB6C1"/>'
        + '<circle cx="50" cy="56" r="32" fill="' + c + '"/>'
        + '<path d="M50 64 Q44 64 43 68 M50 64 Q56 64 57 68 M46 70 Q50 73 54 70" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
        + '<ellipse cx="50" cy="68" rx="3.4" ry="2.4" fill="#E86A8A"/>'
        + '<path d="M26 60 L34 60 M26 66 L34 65 M74 60 L66 60 M74 66 L66 65" stroke="' + INK + '" stroke-width="1.2"/>'
        + '<path d="M80 62 Q94 66 90 80" stroke="' + c + '" stroke-width="8" fill="none" stroke-linecap="round"/>'
        + eyeCute(38, 54, 1) + eyeCute(62, 54, 1) + blush(30, 62) + blush(70, 62);
    } else if (sp === "dog") {
      b = '<circle cx="50" cy="56" r="31" fill="' + c + '"/>'
        + '<path d="M26 30 Q18 42 26 52 Q34 48 34 36 Z" fill="#B97A45"/><path d="M74 30 Q82 42 74 52 Q66 48 66 36 Z" fill="#B97A45"/>'
        + '<ellipse cx="50" cy="66" rx="16" ry="12" fill="#FFF6E8"/>'
        + '<ellipse cx="50" cy="62" rx="4.5" ry="3.5" fill="' + INK + '"/>'
        + '<path d="M50 66 Q50 72 45 72 M50 66 Q50 72 55 72" stroke="' + INK + '" stroke-width="1.8" fill="none" stroke-linecap="round"/>'
        + '<path d="M78 58 Q92 60 90 74 Q88 80 82 78" stroke="' + c + '" stroke-width="9" fill="none" stroke-linecap="round"/>'
        + eyeCute(38, 52, 1) + eyeCute(62, 52, 1) + blush(30, 60) + blush(70, 60);
    } else if (sp === "penguin") {
      b = '<ellipse cx="50" cy="58" rx="30" ry="32" fill="#3A4A5A"/>'
        + '<ellipse cx="50" cy="64" rx="20" ry="24" fill="#FFFDF8"/>'
        + '<path d="M42 48 L58 48 L50 58 Z" fill="#F5A623"/>'
        + '<path d="M36 86 L30 92 M64 86 L70 92" stroke="#F5A623" stroke-width="4" stroke-linecap="round"/>'
        + '<path d="M22 58 Q14 62 16 70 M78 58 Q86 62 84 70" stroke="#3A4A5A" stroke-width="7" fill="none" stroke-linecap="round"/>'
        + eyeCute(40, 44, 1) + eyeCute(60, 44, 1) + blush(32, 52) + blush(68, 52);
    } else if (sp === "panda") {
      b = '<circle cx="34" cy="30" r="11" fill="' + INK + '"/><circle cx="66" cy="30" r="11" fill="' + INK + '"/>'
        + '<circle cx="50" cy="56" r="31" fill="#FFFDF8"/>'
        + '<ellipse cx="38" cy="50" rx="9" ry="11" fill="' + INK + '" transform="rotate(-14 38 50)"/>'
        + '<ellipse cx="62" cy="50" rx="9" ry="11" fill="' + INK + '" transform="rotate(14 62 50)"/>'
        + '<ellipse cx="50" cy="66" rx="3.4" ry="2.6" fill="' + INK + '"/>'
        + '<path d="M50 69 Q50 74 45 74 M50 69 Q50 74 55 74" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
        + '<circle cx="40" cy="50" r="2.2" fill="#fff"/><circle cx="60" cy="50" r="2.2" fill="#fff"/>'
        + '<path d="M80 62 Q94 66 90 80" stroke="' + INK + '" stroke-width="8" fill="none" stroke-linecap="round"/>'
        + blush(28, 62) + blush(72, 62);
    } else if (sp === "fox") {
      b = '<path d="M26 36 L28 12 L44 26 Z" fill="' + c + '"/><path d="M74 36 L72 12 L56 26 Z" fill="' + c + '"/>'
        + '<path d="M30 30 L31 20 L38 26 Z" fill="' + INK + '"/><path d="M70 30 L69 20 L62 26 Z" fill="' + INK + '"/>'
        + '<circle cx="50" cy="56" r="31" fill="' + c + '"/>'
        + '<ellipse cx="50" cy="66" rx="15" ry="11" fill="#FFF6E8"/>'
        + '<ellipse cx="50" cy="61" rx="4" ry="3.2" fill="' + INK + '"/>'
        + '<path d="M50 65 Q50 71 45 71 M50 65 Q50 71 55 71" stroke="' + INK + '" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
        + '<path d="M80 58 Q98 62 92 84 Q86 90 80 84 Q88 72 78 64 Z" fill="' + c + '"/>'
        + eyeCute(38, 52, 1) + eyeCute(62, 52, 1) + blush(29, 60) + blush(71, 60);
    } else if (sp === "dragon") {
      b = '<path d="M28 44 Q10 40 12 26 Q26 26 32 36 Z" fill="#BFEAE2"/><path d="M72 44 Q90 40 88 26 Q74 26 68 36 Z" fill="#BFEAE2"/>'
        + '<circle cx="50" cy="56" r="31" fill="' + c + '"/>'
        + '<circle cx="50" cy="34" r="5" fill="#FFE08A"/><circle cx="62" cy="30" r="4" fill="#FFE08A"/>'
        + '<ellipse cx="50" cy="68" rx="18" ry="14" fill="#EAFBF7"/>'
        + '<path d="M42 62 Q50 58 58 62 M44 68 Q50 65 56 68 M46 74 Q50 71 54 74" stroke="#BFE0D8" stroke-width="2" fill="none"/>'
        + '<path d="M80 60 Q92 64 90 76" stroke="' + c + '" stroke-width="8" fill="none" stroke-linecap="round"/>'
        + eyeCute(38, 50, 1.1) + eyeCute(62, 50, 1.1) + blush(29, 58) + blush(71, 58);
    } else if (sp === "unicorn") {
      b = '<path d="M46 26 L50 10 L54 26 Z" fill="#FFD166" stroke="#E8B84B" stroke-width="1.5"/>'
        + '<path d="M28 32 Q20 44 26 54 L34 50 Z" fill="#F7B6C8"/><path d="M72 32 Q80 44 74 54 L66 50 Z" fill="#B79CE8"/>'
        + '<circle cx="50" cy="56" r="31" fill="#FFFDF8"/>'
        + '<path d="M30 40 Q22 60 30 78" stroke="#39C5BB" stroke-width="6" fill="none" stroke-linecap="round"/>'
        + '<path d="M70 40 Q78 60 70 78" stroke="#F7B6C8" stroke-width="6" fill="none" stroke-linecap="round"/>'
        + '<ellipse cx="50" cy="67" rx="3.4" ry="2.4" fill="#E86A8A"/>'
        + '<path d="M50 70 Q50 75 45 75 M50 70 Q50 75 55 75" stroke="' + INK + '" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
        + eyeCute(38, 52, 1) + eyeCute(62, 52, 1) + blush(30, 61) + blush(70, 61);
    } else { // qilin 小麒麟
      b = '<path d="M36 20 Q32 10 40 8 Q44 12 42 22 Z" fill="#D8B45A"/><path d="M64 20 Q68 10 60 8 Q56 12 58 22 Z" fill="#D8B45A"/>'
        + '<circle cx="50" cy="56" r="31" fill="' + c + '"/>'
        + '<path d="M26 44 Q18 56 24 68" stroke="#B97A2B" stroke-width="5" fill="none" stroke-linecap="round"/>'
        + '<path d="M74 44 Q82 56 76 68" stroke="#B97A2B" stroke-width="5" fill="none" stroke-linecap="round"/>'
        + '<ellipse cx="50" cy="67" rx="3.4" ry="2.4" fill="#8A5A2B"/>'
        + '<path d="M50 70 Q50 75 45 75 M50 70 Q50 75 55 75" stroke="' + INK + '" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
        + '<circle cx="50" cy="40" r="3" fill="#FFE08A"/><circle cx="58" cy="42" r="2.4" fill="#FFE08A"/>'
        + eyeCute(38, 52, 1) + eyeCute(62, 52, 1) + blush(29, 60) + blush(71, 60);
    }
    return '<svg viewBox="0 0 100 100" width="' + (size || "84px") + '" xmlns="http://www.w3.org/2000/svg">' + defs + b + '</svg>';
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
    const sz = size || "84px";
    return '<div style="display:inline-flex;flex-direction:column;align-items:center;margin-top:6px">'
      + '<div style="position:relative;width:' + sz + ';height:' + sz + ';background:rgba(255,255,255,.85);border-radius:18px;box-shadow:0 3px 10px rgba(57,197,187,.25);display:flex;align-items:center;justify-content:center">'
      + petSVG(pet, "86%")
      + (acc ? '<span style="position:absolute;top:0;right:2px;font-size:1.05rem">' + acc.emoji + '</span>' : '')
      + '<span style="position:absolute;bottom:2px;left:4px;font-size:.62rem;font-weight:800;background:#39C5BB;color:#fff;border-radius:8px;padding:1px 6px">Lv' + lv + '</span>'
      + '</div><div class="muted" style="font-size:.68rem;margin-top:2px">' + pet.name + '</div></div>';
  }
  function petLevelOf(xp) {
    const R = window.PET_RULES || { LEVEL_STEP: 40, MAX_LEVEL: 10 };
    return Math.max(1, Math.min(R.MAX_LEVEL, Math.floor((xp || 0) / R.LEVEL_STEP) + 1));
  }

  return { render, line, EX_LINES, renderPet, petSVG, petLevelOf };
})();
