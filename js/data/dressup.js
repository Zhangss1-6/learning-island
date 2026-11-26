// 装扮数据：全部明码标价，无抽奖无概率
// rarity 1-5 对应价格档 100/300/600/1000/1600
window.DRESSUP = [
  // ===== 发型 (8) =====
  { id: "hair-1", cat: "hair", name: "经典双马尾", price: 0, rarity: 0, svg: { style: "twin", color: "#39C5BB" }, desc: "小音的默认发型" },
  { id: "hair-2", cat: "hair", name: "高马尾", price: 100, rarity: 1, svg: { style: "pony", color: "#39C5BB" }, desc: "利落又精神" },
  { id: "hair-3", cat: "hair", name: "樱粉双马尾", price: 300, rarity: 2, svg: { style: "twin", color: "#F7B6C8" }, desc: "粉色系温柔" },
  { id: "hair-4", cat: "hair", name: "编发双辫", price: 300, rarity: 2, svg: { style: "braid", color: "#39C5BB" }, desc: "文艺气息" },
  { id: "hair-5", cat: "hair", name: "星空渐变", price: 600, rarity: 3, svg: { style: "twin", color: "grad" }, desc: "发尾泛星光" },
  { id: "hair-6", cat: "hair", name: "短波波头", price: 600, rarity: 3, svg: { style: "bob", color: "#39C5BB" }, desc: "清爽学生头" },
  { id: "hair-7", cat: "hair", name: "雪白长发", price: 1000, rarity: 4, svg: { style: "long", color: "#EAF6F6" }, desc: "冬日初雪" },
  { id: "hair-8", cat: "hair", name: "极光炫彩", price: 1600, rarity: 5, svg: { style: "twin", color: "aurora" }, desc: "限定：连续打卡 30 天", ach: "ach-streak30" },

  // ===== 服装 (12) =====
  { id: "fit-1", cat: "fit", name: "学院制服", price: 0, rarity: 0, svg: { top: "#FFFFFF", skirt: "#39C5BB", tie: "#39C5BB" }, desc: "小音的默认制服" },
  { id: "fit-2", cat: "fit", name: "樱粉水手服", price: 100, rarity: 1, svg: { top: "#FFF0F4", skirt: "#F7B6C8", tie: "#F7B6C8" }, desc: "春日粉" },
  { id: "fit-3", cat: "fit", name: "运动套装", price: 100, rarity: 1, svg: { top: "#BFE9E5", skirt: "#5ABFB8", tie: null }, desc: "上体育课啦" },
  { id: "fit-4", cat: "fit", name: "冬季棉服", price: 300, rarity: 2, svg: { top: "#DCEFFF", skirt: "#8FBFEF", tie: "#FFD98E" }, desc: "暖暖的" },
  { id: "fit-5", cat: "fit", name: "午后红茶裙", price: 300, rarity: 2, svg: { top: "#FFF6E8", skirt: "#E8A87C", tie: "#C76B4B" }, desc: "优雅放学后" },
  { id: "fit-6", cat: "fit", name: "校园合唱服", price: 600, rarity: 3, svg: { top: "#FFFFFF", skirt: "#7FD6CF", tie: "#FFB347" }, desc: "演出必备" },
  { id: "fit-7", cat: "fit", name: "雨后新绿", price: 600, rarity: 3, svg: { top: "#EAFBE7", skirt: "#77C98D", tie: "#4E9B63" }, desc: "植树节限定风" },
  { id: "fit-8", cat: "fit", name: "毕业礼服", price: 1000, rarity: 4, svg: { top: "#F5F0FF", skirt: "#B79CE8", tie: "#6E4FA3" }, desc: "献给毕业季" },
  { id: "fit-9", cat: "fit", name: "宇航员服", price: 1600, rarity: 5, svg: { top: "#F2F4F8", skirt: "#C7CFDC", tie: "#39C5BB" }, desc: "限定：三科单元测全优", ach: "ach-allexcellent" },
  { id: "fit-10", cat: "fit", name: "夏日泳圈风", price: 600, rarity: 3, svg: { top: "#FFF9DF", skirt: "#FFD166", tie: "#FF9F68" }, desc: "海边度假" },
  { id: "fit-11", cat: "fit", name: "披风小斗士", price: 1000, rarity: 4, svg: { top: "#FFFFFF", skirt: "#39C5BB", tie: "#39C5BB", cape: "#FFB6C1" }, desc: "错题克星披风" },
  { id: "fit-12", cat: "fit", name: "和风浴衣", price: 1600, rarity: 5, svg: { top: "#FFF1F1", skirt: "#E36A6A", tie: "#F7B6C8" }, desc: "限定：小升初模拟达标", ach: "ach-shengchu" },

  // ===== 配饰 (10) =====
  { id: "acc-1", cat: "acc", name: "经典耳机", price: 0, rarity: 0, svg: { kind: "hp", color: "#39C5BB" }, desc: "小音的默认耳机" },
  { id: "acc-2", cat: "acc", name: "樱桃发卡", price: 100, rarity: 1, svg: { kind: "pin", color: "#E85D75" }, desc: "甜一点的发卡" },
  { id: "acc-3", cat: "acc", name: "星星眼镜", price: 300, rarity: 2, svg: { kind: "glasses", color: "#33404D" }, desc: "学习委员标配" },
  { id: "acc-4", cat: "acc", name: "爱心墨镜", price: 300, rarity: 2, svg: { kind: "glasses", color: "#F26D9C" }, desc: "酷酷的" },
  { id: "acc-5", cat: "acc", name: "樱花书包", price: 600, rarity: 3, svg: { kind: "bag", color: "#F7B6C8" }, desc: "装下所有课本" },
  { id: "acc-6", cat: "acc", name: "星星发饰", price: 600, rarity: 3, svg: { kind: "pin", color: "#FFD166" }, desc: "闪闪发光" },
  { id: "acc-7", cat: "acc", name: "彩虹耳机", price: 1000, rarity: 4, svg: { kind: "hp", color: "rainbow" }, desc: "音质党专属" },
  { id: "acc-8", cat: "acc", name: "侦探背包", price: 1000, rarity: 4, svg: { kind: "bag", color: "#7B6BE8" }, desc: "限定：连对 10 题", ach: "ach-streak10" },
  { id: "acc-9", cat: "acc", name: "月兔发箍", price: 1600, rarity: 5, svg: { kind: "band", color: "#FFFDF8" }, desc: "限定：错题清零", ach: "ach-wrongclear" },
  { id: "acc-10", cat: "acc", name: "限定勋章发夹", price: 1600, rarity: 5, svg: { kind: "pin", color: "#39C5BB" }, desc: "限定：单科全通", ach: "ach-subjectall" },

  // ===== 背景场景 (6) =====
  { id: "bg-1", cat: "bg", name: "奶白小屋", price: 0, rarity: 0, svg: { sky: ["#FFFDF8", "#FFEFD8"], deco: "house" }, desc: "温馨默认背景" },
  { id: "bg-2", cat: "bg", name: "清晨教室", price: 100, rarity: 1, svg: { sky: ["#EAF6FF", "#CFE8FF"], deco: "school" }, desc: "早读的空气" },
  { id: "bg-3", cat: "bg", name: "海边假日", price: 300, rarity: 2, svg: { sky: ["#BFE9FF", "#E8FAFF"], deco: "sea" }, desc: "听浪的声音" },
  { id: "bg-4", cat: "bg", name: "黄昏操场", price: 300, rarity: 2, svg: { sky: ["#FFD9A8", "#FFF3E0"], deco: "field" }, desc: "放学铃响后" },
  { id: "bg-5", cat: "bg", name: "星空夜色", price: 600, rarity: 3, svg: { sky: ["#2C3E66", "#5A6FB5"], deco: "star" }, desc: "银河下的自习" },
  { id: "bg-6", cat: "bg", name: "樱花庭院", price: 1000, rarity: 4, svg: { sky: ["#FFEFF4", "#FFFDF8"], deco: "sakura" }, desc: "春天住进院子里" },

  // ===== 称号 (10) =====
  { id: "title-1", cat: "title", name: "岛民新芽", price: 100, rarity: 1, text: "岛民新芽", desc: "刚踏上学习岛" },
  { id: "title-2", cat: "title", name: "背诗小能手", price: 100, rarity: 1, text: "背诗小能手", desc: "古诗词进步显著" },
  { id: "title-3", cat: "title", name: "计算小达人", price: 100, rarity: 1, text: "计算小达人", desc: "口算又快又准" },
  { id: "title-4", cat: "title", name: "单词收藏家", price: 300, rarity: 2, text: "单词收藏家", desc: "词汇量稳步上升" },
  { id: "title-5", cat: "title", name: "错题终结者", price: 300, rarity: 2, text: "错题终结者", desc: "错题本越用越薄" },
  { id: "title-6", cat: "title", name: "闯关勇士", price: 600, rarity: 3, text: "闯关勇士", desc: "关卡 star 收集者" },
  { id: "title-7", cat: "title", name: "阅读小侦探", price: 600, rarity: 3, text: "阅读小侦探", desc: "阅读理解高手" },
  { id: "title-8", cat: "title", name: "小升初预备役", price: 1000, rarity: 4, text: "小升初预备役", desc: "综合模拟稳定发挥" },
  { id: "title-9", cat: "title", name: "毕业班优等生", price: 1600, rarity: 5, text: "毕业班优等生", desc: "限定：期末测三科全优", ach: "ach-finalallexcellent" },
  { id: "title-10", cat: "title", name: "初音学习岛传说", price: 1600, rarity: 5, text: "学习岛传说", desc: "限定：达成 20 个成就", ach: "ach-achiever20" },

  // ===== 小道具 (8) =====
  { id: "prop-1", cat: "prop", name: "小音抱枕", price: 100, rarity: 1, emoji: "🧸", desc: "放在桌角陪读" },
  { id: "prop-2", cat: "prop", name: "小盆栽", price: 100, rarity: 1, emoji: "🪴", desc: "休息时看看绿色" },
  { id: "prop-3", cat: "prop", name: "台灯", price: 300, rarity: 2, emoji: "💡", desc: "夜读好伙伴" },
  { id: "prop-4", cat: "prop", name: "猫咪摆件", price: 300, rarity: 2, emoji: "🐱", desc: "喵~" },
  { id: "prop-5", cat: "prop", name: "小闹钟", price: 600, rarity: 3, emoji: "⏰", desc: "计时练习不磨蹭" },
  { id: "prop-6", cat: "prop", name: "奖杯", price: 1000, rarity: 4, emoji: "🏆", desc: "限定：首次满分", ach: "ach-fullscore" },
  { id: "prop-7", cat: "prop", name: "火箭模型", price: 1600, rarity: 5, emoji: "🚀", desc: "限定：连对 10 题", ach: "ach-streak10" },
  { id: "prop-8", cat: "prop", name: "毕业相册", price: 1600, rarity: 5, emoji: "📔", desc: "限定：连续打卡 30 天", ach: "ach-streak30" },

  // ===== 宠物 (9)：明码标价领养，喂养升级（越贵越稀有）=====
  // svg.species 对应 Q 版卡通 SVG 造型，svg.color 为主色
  { id: "pet-1", cat: "pet", name: "咕咕小黄鸡", price: 100, rarity: 1, emoji: "🐥", svg: { species: "chick", color: "#FFE066" }, desc: "叽叽喳喳陪你刷题" },
  { id: "pet-2", cat: "pet", name: "小奶猫", price: 300, rarity: 2, emoji: "🐱", svg: { species: "cat", color: "#EAF0F4" }, desc: "练习时会趴在桌角" },
  { id: "pet-3", cat: "pet", name: "柴柴", price: 300, rarity: 2, emoji: "🐶", svg: { species: "dog", color: "#E8A761" }, desc: "汪！闯关必胜！" },
  { id: "pet-4", cat: "pet", name: "摇摇摆摆企鹅", price: 600, rarity: 3, emoji: "🐧", svg: { species: "penguin", color: "#3A4A5A" }, desc: "走路自带节奏感" },
  { id: "pet-5", cat: "pet", name: "滚滚小熊猫", price: 1000, rarity: 4, emoji: "🐼", svg: { species: "panda", color: "#FFFDF8" }, desc: "国宝级学习搭子" },
  { id: "pet-6", cat: "pet", name: "机灵小狐狸", price: 1000, rarity: 4, emoji: "🦊", svg: { species: "fox", color: "#F59B4C" }, desc: "难题难不倒它" },
  { id: "pet-7", cat: "pet", name: "云朵小飞龙", price: 1600, rarity: 5, emoji: "🐲", svg: { species: "dragon", color: "#7FD6C4" }, desc: "传说级坐骑" },
  { id: "pet-8", cat: "pet", name: "彩虹独角兽", price: 1600, rarity: 5, emoji: "🦄", svg: { species: "unicorn", color: "#FFFDF8" }, desc: "传说级幸运星" },
  { id: "pet-9", cat: "pet", name: "小麒麟", price: 1600, rarity: 5, emoji: "🦌", svg: { species: "qilin", color: "#E8C06B" }, desc: "限定：达成 20 个成就", ach: "ach-achiever20" },

  // ===== 宠物装扮 (6)：需宠物等级 ≥2 才可穿戴 =====
  { id: "pacc-1", cat: "pacc", name: "蝴蝶结", price: 100, rarity: 1, emoji: "🎀", desc: "宠物必备卖萌神器" },
  { id: "pacc-2", cat: "pacc", name: "小黄帽", price: 300, rarity: 2, emoji: "👒", desc: "遮阳又好看" },
  { id: "pacc-3", cat: "pacc", name: "条纹围巾", price: 300, rarity: 2, emoji: "🧣", desc: "冬天暖暖的" },
  { id: "pacc-4", cat: "pacc", name: "酷酷墨镜", price: 600, rarity: 3, emoji: "🕶️", desc: "宠物界的时尚顶流" },
  { id: "pacc-5", cat: "pacc", name: "小皇冠", price: 1000, rarity: 4, emoji: "👑", desc: "宠物中的王者" },
  { id: "pacc-6", cat: "pacc", name: "星光斗篷", price: 1600, rarity: 5, emoji: "✨", desc: "限定：错题清零", ach: "ach-wrongclear" }
];
window.DRESSUP_BY_ID = {};
window.DRESSUP.forEach(function (d) { window.DRESSUP_BY_ID[d.id] = d; });

// 档位名称（对应价格 100/300/600/1000/1600）
window.RARITY_NAMES = { 0: "默认", 1: "普通 · 100分档", 2: "进阶 · 300分档", 3: "稀有 · 600分档", 4: "史诗 · 1000分档", 5: "传说 · 1600分档" };

// 宠物成长规则
window.PET_RULES = {
  FEED_COST: 20,        // 每次喂食消耗积分
  XP_PER_FEED: 10,      // 每次喂食获得经验
  LEVEL_STEP: 40,       // 升级所需经验（累计）
  MAX_LEVEL: 10,        // 等级上限
  FEEDS_PER_DAY: 3      // 每只宠物每天最多喂 3 次
};
