// 英语题库（人教 PEP 六年级上下册）—— 单词、短语搭配、语法、完形填空、句型与书面表达
window.BANK_EN = [];
(function () {
  function reg(arr, term, unit) {
    arr.forEach(function (q, i) {
      q.subject = "en"; q.term = term; q.unit = unit;
      q.id = "en-" + (term === "6上" ? "6a" : "6b") + "-u" + unit + "-" + String(i + 1).padStart(3, "0");
      if (!q.tags) q.tags = [];
      if (!q.analysis) q.analysis = "";
      window.BANK_EN.push(q);
    });
  }

  // ========== 6上 Unit 1 How can I get there? ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：博物馆", options: ["museum", "cinema", "hospital", "bookstore"], answer: "A", analysis: "museum 博物馆；cinema 电影院；hospital 医院；bookstore 书店。", kp: ["单词"], audioText: "museum" },
    { type: "choice", difficulty: 1, stem: "「直走」的英文短语是（　）。", options: ["go straight", "turn right", "turn left", "go back"], answer: "A", analysis: "go straight 直走；turn left/right 左转/右转。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "—____ is the cinema? —It's next to the bookstore.", options: ["Where", "What", "How", "Who"], answer: "A", analysis: "问地点用 Where；答句 It's next to... 表示位置。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "How can I get ____ the hospital?", options: ["to", "at", "in", "of"], answer: "A", analysis: "get to + 地点，表示「到达某地」。", kp: ["介词搭配"] },
    { type: "choice", difficulty: 1, stem: "The restaurant is ____ the park.（紧挨着公园）", options: ["next to", "far from", "in front", "under"], answer: "A", analysis: "next to 紧挨着；far from 远离。", kp: ["介词"] },
    { type: "judge", difficulty: 1, stem: "「Turn left at the crossing.」意思是「在十字路口向右转」。", answer: "错", analysis: "Turn left 是向左转。", kp: ["句型判断"] },
    { type: "fill", difficulty: 2, stem: "填空：Excuse me. How can I get ____ the science museum?（填一个介词）", answer: "to", analysis: "get to sp. 到达某地。", kp: ["介词填空"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Mike wants to visit the museum. First, he goes ____ (1) and turns left at the second crossing. Then he goes straight. The museum is ____ (2) the library.", clozeItems: [["A. straight", "B. left", "C. back"], ["A. next to", "B. in", "C. on"]], answer: ["A", "A"], analysis: "go straight 直走；next to the library 紧挨着图书馆。", kp: ["完形填空", "短语"] },
    { type: "choice", difficulty: 2, stem: "问路时最有礼貌的开场语是（　）。", options: ["Excuse me, how can I get to...?", "Hey, where is...?", "Tell me the way!", "Where? Quick!"], answer: "A", analysis: "问路要先说 Excuse me，再礼貌提问。", kp: ["书面表达", "文化常识"] },
    { type: "choice", difficulty: 2, stem: "看提示选词：你可以用这个找到路，它叫 GPS，它的意思是（　）。", options: ["全球定位系统", "收音机", "手机", "地图"], answer: "A", analysis: "GPS＝Global Positioning System 全球定位系统。", kp: ["常识"] },
    { type: "judge", difficulty: 2, stem: "「Where is the...?」和「How can I get to...?」都可以用来问路。", answer: "对", analysis: "两者都是问路句型，后者更强调怎么走。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「指路」时应该（　）。", options: ["按先后顺序用 First, Then, Next 说清路线", "只说一句话", "说地名不说方向", "写得越复杂越好"], answer: "A", analysis: "指路要有顺序词：First...Then...Turn left/right...You can see...。", kp: ["书面表达"] }
  ], "6上", 1);

  // ========== 6上 Unit 2 Ways to go to school ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「by subway」的意思是（　）。", options: ["乘地铁", "乘公交", "步行", "骑自行车"], answer: "A", analysis: "by subway 乘地铁；by bus 乘公交。", kp: ["短语"] },
    { type: "choice", difficulty: 1, stem: "下列「步行」的正确表达是（　）。", options: ["on foot", "by foot", "on feet", "by feet"], answer: "A", analysis: "步行固定说法是 on foot，不能用 by foot。", kp: ["短语"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "I usually go to school ____ bike.", options: ["by", "on", "in", "at"], answer: "A", analysis: "by bike 骑自行车；注意 on foot 是特例。", kp: ["介词"] },
    { type: "choice", difficulty: 2, stem: "In China, on the right side of the road, you should look ____ before crossing.", options: ["left first, then right", "right first, then left", "back", "up"], answer: "A", analysis: "靠右行驶的国家过马路先看左边再看右边。", kp: ["常识", "阅读理解"] },
    { type: "judge", difficulty: 1, stem: "The traffic lights have three colours: red, yellow and green.", answer: "对", analysis: "红黄绿三种信号灯：红灯停、绿灯行、黄灯等一等。", kp: ["常识"] },
    { type: "choice", difficulty: 2, stem: "—How do you go to school? —____", options: ["By bus.", "At 7 o'clock.", "Yes, I do.", "I like it."], answer: "A", analysis: "How 提问交通方式，用 By bus / On foot 等回答。", kp: ["句型"] },
    { type: "fill", difficulty: 2, stem: "填空：Slow down and ____ at a yellow light.（填一个动词）", answer: "stop", analysis: "Slow down and stop at a yellow light. 黄灯要减速并停下。", kp: ["课文语句"] },
    { type: "fill", difficulty: 2, stem: "写出动词的第三人称单数形式：go → ____", answer: "goes", analysis: "go 以 o 结尾，三单加 es：goes。", kp: ["词形变化"], tags: ["易错"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Amy's home is not far. So she goes to school ____ (1). But her father works in a big city. He goes to work ____ (2) train.", clozeItems: [["A. on foot", "B. by ship", "C. by sled"], ["A. by", "B. on", "C. to"]], answer: ["A", "A"], analysis: "近就步行 on foot；远乘火车 by train。", kp: ["完形填空", "短语"] },
    { type: "choice", difficulty: 2, stem: "「Don't go at a red light!」的中文意思是（　）。", options: ["红灯时不要过马路！", "红灯时快走！", "绿灯不要走", "黄灯不要停"], answer: "A", analysis: "Don't... 否定祈使句：不要在红灯时通行。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "在美国，人们开车靠（　）行驶。", options: ["右边", "左边", "中间", "没有规定"], answer: "A", analysis: "中国、美国、德国等靠右行驶；英国、日本等靠左行驶。", kp: ["文化常识"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「上学方式」作文，好的结构是（　）。", options: ["先说方式，再说原因和路上的见闻", "只写一个词", "写很多无关的话", "全写天气"], answer: "A", analysis: "先点明交通方式，再写原因（远/近）和感受。", kp: ["书面表达"] }
  ], "6上", 2);

  // ========== 6上 Unit 3 My weekend plan ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「next week」的意思是（　）。", options: ["下周", "昨天", "今晚", "周末"], answer: "A", analysis: "next week 下周，常与 be going to 连用。", kp: ["时间短语"] },
    { type: "choice", difficulty: 2, stem: "I ____ visit my grandparents this weekend.", options: ["am going to", "goes to", "went to", "go to yesterday"], answer: "A", analysis: "this weekend 表将来，用 be going to 结构。", kp: ["一般将来时"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "填空：—____ are you going to do tomorrow? —I'm going to see a film.（填疑问词）", answer: "What|what", analysis: "What are you going to do? 问打算做什么。", kp: ["疑问词"] },
    { type: "choice", difficulty: 2, stem: "She is going to take ____ trip to Beijing.", options: ["a", "an", "the", "/"], answer: "A", analysis: "take a trip 去旅行，固定搭配。", kp: ["固定搭配"] },
    { type: "judge", difficulty: 1, stem: "「I'm going to buy a comic book.」中 comic book 是漫画书。", answer: "对", analysis: "comic book 漫画书；dictionary 词典；word book 单词书；postcard 明信片。", kp: ["单词"] },
    { type: "choice", difficulty: 2, stem: "—Where are you going? —____", options: ["I'm going to the supermarket.", "At 3 o'clock.", "By bus.", "I'm fine."], answer: "A", analysis: "Where 问地点，回答要去的地方。", kp: ["句型"] },
    { type: "fill", difficulty: 2, stem: "写出动词的现在分词形式：visit → ____", answer: "visiting", analysis: "visit 直接加 ing：visiting。", kp: ["词形变化"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Tomorrow is Saturday. Sarah ____ (1) going to clean her room in the morning. In the afternoon, she is going to the supermarket ____ (2) her mother.", clozeItems: [["A. is", "B. are", "C. am"], ["A. with", "B. and", "C. to"]], answer: ["A", "A"], analysis: "Sarah 第三人称用 is；with her mother 和妈妈一起。", kp: ["完形填空", "语法"] },
    { type: "judge", difficulty: 2, stem: "「be going to」后面要接动词原形。", answer: "对", analysis: "be going to + 动词原形，表示计划、打算。", kp: ["一般将来时"] },
    { type: "choice", difficulty: 1, stem: "「tonight」的意思是（　）。", options: ["今晚", "明天晚上", "昨晚", "今晚以后"], answer: "A", analysis: "tonight 今晚。", kp: ["时间短语"] },
    { type: "choice", difficulty: 2, stem: "选择题：We're going to have ____ art lesson this afternoon.", options: ["an", "a", "the", "some"], answer: "A", analysis: "art 以元音音素开头，用 an。", kp: ["冠词"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「周末计划」作文应（　）。", options: ["用 be going to 写清时间和要做的事", "全用过去式", "只写一句话", "写上周的事"], answer: "A", analysis: "周末计划是将来，用 be going to，按时间顺序写两三件事。", kp: ["书面表达"] }
  ], "6上", 3);

  // ========== 6上 Unit 4 I have a pen pal ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「pen pal」的意思是（　）。", options: ["笔友", "钢笔", "朋友的朋友", "邮递员"], answer: "A", analysis: "pen pal 笔友，也写作 pen friend。", kp: ["单词"] },
    { type: "fill", difficulty: 2, stem: "写出动词的第三人称单数形式：study → ____", answer: "studies", analysis: "study 以辅音字母+y 结尾，变 y 为 i 加 es：studies。", kp: ["词形变化"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "My pen pal ____ in Australia.", options: ["lives", "live", "living", "to live"], answer: "A", analysis: "主语第三人称单数，一般现在时动词加 s：lives。", kp: ["一般现在时"] },
    { type: "choice", difficulty: 2, stem: "He likes ____ kung fu.", options: ["doing", "do", "does", "did"], answer: "A", analysis: "like + doing（动名词）：likes doing kung fu。", kp: ["固定搭配"], tags: ["易错"] },
    { type: "judge", difficulty: 2, stem: "「Does he live in China?」的肯定回答是「Yes, he does.」", answer: "对", analysis: "Does 开头的一般疑问句，答语用 does/didn't 对应。", kp: ["一般现在时", "句型"] },
    { type: "fill", difficulty: 2, stem: "写出动词的第三人称单数形式：teach → ____", answer: "teaches", analysis: "以 ch, sh, o, s, x 结尾的动词三单加 es：teaches。", kp: ["词形变化"] },
    { type: "choice", difficulty: 2, stem: "—What are his hobbies? —He likes ____ and singing.", options: ["dancing", "dance", "dances", "danced"], answer: "A", analysis: "like + doing，与 singing 并列用 dancing。", kp: ["固定搭配"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：John ____ (1) a pen pal. He ____ (2) in Canberra, Australia. He likes playing sports.", clozeItems: [["A. has", "B. have", "C. having"], ["A. lives", "B. live", "C. is live"]], answer: ["A", "A"], analysis: "第三人称单数：has；lives。", kp: ["完形填空", "一般现在时"] },
    { type: "choice", difficulty: 1, stem: "「go hiking」的意思是（　）。", options: ["去远足", "去游泳", "去购物", "去上学"], answer: "A", analysis: "go hiking 远足；go shopping 购物。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "—Does she do word puzzles every day? —____", options: ["Yes, she does.", "Yes, she is.", "No, she don't.", "Yes, she did."], answer: "A", analysis: "Does 疑问句答 Yes, she does. / No, she doesn't.。", kp: ["一般现在时"], tags: ["易错"] },
    { type: "judge", difficulty: 2, stem: "介绍笔友时应该写：姓名、住址、爱好和日常活动。", answer: "对", analysis: "介绍笔友可从这几方面写，用一般现在时。", kp: ["书面表达"] },
    { type: "choice", difficulty: 2, stem: "选择正确的句子：（　）", options: ["My pen pal goes to school by bus.", "My pen pal go to school by bus.", "My pen pal going to school by bus.", "My pen pal to go school by bus."], answer: "A", analysis: "三单主语 + goes；其余动词形式错误。", kp: ["一般现在时"], tags: ["易错"] }
  ], "6上", 4);

  // ========== 6上 Unit 5 What does he do? ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「factory worker」的意思是（　）。", options: ["工厂工人", "邮递员", "科学家", "教练"], answer: "A", analysis: "factory 工厂 + worker 工人。", kp: ["职业单词"] },
    { type: "choice", difficulty: 2, stem: "—____ does your father do? —He is a pilot.", options: ["What", "Where", "How", "When"], answer: "A", analysis: "What does he do? 问职业。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "—Where does he work? —He works ____ sea.", options: ["at", "on", "in", "to"], answer: "A", analysis: "work at sea 在海上工作，固定搭配。", kp: ["介词搭配"] },
    { type: "fill", difficulty: 2, stem: "写出对应职业：My mother teaches English. She is an English ____.（填职业名词）", answer: "teacher", analysis: "teach → teacher，动词加 er/or 变职业名词。", kp: ["构词法"] },
    { type: "judge", difficulty: 1, stem: "「coach」的意思是教练。", answer: "对", analysis: "coach 教练；pilot 飞行员；scientist 科学家；police officer 警察。", kp: ["职业单词"] },
    { type: "choice", difficulty: 2, stem: "My uncle is a ____. He flies planes.", options: ["pilot", "postman", "fisherman", "doctor"], answer: "A", analysis: "fly planes 开飞机的是飞行员 pilot。", kp: ["职业单词", "阅读理解"] },
    { type: "choice", difficulty: 2, stem: "She ____ in a hospital.", options: ["works", "work", "working", "to work"], answer: "A", analysis: "三单主语，动词加 s。", kp: ["一般现在时"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Oliver's father is a businessman. He often ____ (1) to other countries. Oliver's mother is a head teacher. She works ____ (2) a university.", clozeItems: [["A. goes", "B. go", "C. going"], ["A. in", "B. at sea", "C. by"]], answer: ["A", "A"], analysis: "三单 goes；in a university 在大学工作。", kp: ["完形填空", "一般现在时"] },
    { type: "judge", difficulty: 2, stem: "「Where does she work?」问的是工作地点。", answer: "对", analysis: "Where 问地点；What does she do 问职业。", kp: ["句型"] },
    { type: "fill", difficulty: 2, stem: "写出职业名词：drive（开车）→ ____", answer: "driver", analysis: "drive → driver 司机，动词加 r。", kp: ["构词法"] },
    { type: "choice", difficulty: 2, stem: "「I want to be a scientist.」的意思是（　）。", options: ["我想成为一名科学家", "我是科学家", "科学家想见我", "我不喜欢科学"], answer: "A", analysis: "want to be + 职业：想成为……。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「我的一家」介绍职业，常用句型不包括（　）。", options: ["He went to work yesterday.", "My father is a doctor.", "She works in a hospital.", "My mother is a nurse."], answer: "A", analysis: "介绍职业用一般现在时，A 是过去时。", kp: ["书面表达", "时态"] }
  ], "6上", 5);

  // ========== 6上 Unit 6 How do you feel? ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「angry」的意思是（　）。", options: ["生气的", "开心的", "害怕的", "难过的"], answer: "A", analysis: "angry 生气的；happy 开心的；afraid 害怕的；sad 难过的。", kp: ["情绪单词"] },
    { type: "choice", difficulty: 2, stem: "—How ____ Sam feel? —He ____ afraid.", options: ["does; is", "do; is", "does; are", "is; does"], answer: "A", analysis: "第三人称单数疑问用 does；回答 He is afraid.。", kp: ["句型"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "You look ill. You should ____.", options: ["see a doctor", "count to ten", "wear a T-shirt", "eat more ice cream"], answer: "A", analysis: "生病应该看医生 see a doctor。", kp: ["情态动词", "建议句型"] },
    { type: "fill", difficulty: 2, stem: "填空：You should take a deep ____ and count to ten when you are angry.（填名词）", answer: "breath", analysis: "take a deep breath 深呼吸。", kp: ["短语"] },
    { type: "judge", difficulty: 1, stem: "「He is worried.」的意思是他很担心。", answer: "对", analysis: "worried 担心的， feel/Be worried about...。", kp: ["情绪单词"] },
    { type: "choice", difficulty: 2, stem: "It's cold outside. You should ____ warm clothes.", options: ["wear", "wears", "wearing", "to wearing"], answer: "A", analysis: "should + 动词原形。", kp: ["情态动词"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "The mouse is ____ the cat. It runs away.", options: ["afraid of", "happy with", "angry about", "good at"], answer: "A", analysis: "be afraid of 害怕……。", kp: ["介词搭配"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Robin is ill. We ____ (1) take him to the hospital. He shouldn't ____ (2) cold drinks.", clozeItems: [["A. should", "B. shouldn't", "C. don't"], ["A. drink", "B. drinks", "C. drinking"]], answer: ["A", "A"], analysis: "should/shouldn't + 动词原形。", kp: ["完形填空", "情态动词"] },
    { type: "choice", difficulty: 2, stem: "选择题：The ant is stuck in the net. Robin helps it. The ant is very ____.（感恩的）", options: ["thankful", "angry", "afraid", "worried"], answer: "A", analysis: "得到帮助应感恩 thankful。", kp: ["阅读理解", "情绪单词"] },
    { type: "judge", difficulty: 2, stem: "表达情绪时可以说：I feel happy. 或 I am happy. 两种都对。", answer: "对", analysis: "feel + 形容词 或 be + 形容词都可以表达情绪。", kp: ["句型"] },
    { type: "fill", difficulty: 2, stem: "写出反义词：happy → ____", answer: "sad|unhappy", analysis: "happy 的反义词是 sad 或 unhappy。", kp: ["反义词"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「情绪」主题作文时，推荐结构是（　）。", options: ["什么事→情绪如何→怎样调节", "只写单词", "全写天气", "写别人坏话"], answer: "A", analysis: "先交代事件，再写感受，最后给建议（You should...）。", kp: ["书面表达"] }
  ], "6上", 6);

  // ========== 6下 Unit 1 How tall are you? ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「taller」是（　）的比较级。", options: ["tall", "short", "old", "big"], answer: "A", analysis: "tall → taller 更高。", kp: ["比较级"] },
    { type: "fill", difficulty: 2, stem: "写出比较级：big → ____", answer: "bigger", analysis: "重读闭音节双写末尾字母再加 er：big → bigger。", kp: ["词形变化"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "写出比较级：heavy → ____", answer: "heavier", analysis: "辅音字母+y 结尾，变 y 为 i 加 er：heavy → heavier。", kp: ["词形变化"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "Zhang Peng is ____ than John.", options: ["taller", "tall", "tallest", "the tall"], answer: "A", analysis: "两者比较用比较级 + than。", kp: ["比较级句型"] },
    { type: "choice", difficulty: 2, stem: "—____ are you? —I'm 1.65 metres.", options: ["How tall", "How heavy", "How old", "How long"], answer: "A", analysis: "How tall are you? 问身高。", kp: ["句型"] },
    { type: "judge", difficulty: 1, stem: "1 metre = 100 centimetres.", answer: "对", analysis: "1 米 = 100 厘米；metre 米，centimetre 厘米。", kp: ["常识"] },
    { type: "choice", difficulty: 2, stem: "Mike is 48 ____.（公斤）", options: ["kilograms", "metres", "centimetres", "years"], answer: "A", analysis: "体重用 kilograms 千克。", kp: ["单位"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Wu Binbin is 1.64 metres. Mike is 1.65 metres. So Mike is ____ (1) than Wu Binbin. But Mike is thinner. Wu Binbin is ____ (2) than Mike.", clozeItems: [["A. taller", "B. tall", "C. tallest"], ["A. heavier", "B. heavy", "C. heavier than Mike"]], answer: ["A", "A"], analysis: "比较级 + than；heavy → heavier。", kp: ["完形填空", "比较级"] },
    { type: "fill", difficulty: 2, stem: "写出比较级：thin → ____", answer: "thinner", analysis: "thin 双写 n 再加 er：thinner。", kp: ["词形变化"], tags: ["易错"] },
    { type: "judge", difficulty: 2, stem: "「Your feet are bigger than mine.」中 mine = my feet。", answer: "对", analysis: "名词性物主代词 mine 代替 my feet。", kp: ["代词"] },
    { type: "choice", difficulty: 2, stem: "形容词最高级用法正确的是（　）。", options: ["He is the tallest in our class.", "He is tallest than me.", "He is taller in our class.", "He is the taller of three."], answer: "A", analysis: "最高级 the tallest + in/of 范围。", kp: ["最高级"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：比较自己和朋友的不同，常用句型是（　）。", options: ["I'm taller/older than...", "I am going to...", "I went...", "There is..."], answer: "A", analysis: "比较用比较级 + than。", kp: ["书面表达"] }
  ], "6下", 1);

  // ========== 6下 Unit 2 Last weekend ==========
  reg([
    { type: "choice", difficulty: 1, stem: "watch 的过去式是（　）。", options: ["watched", "watches", "watching", "watches"], answer: "A", analysis: "规则变化直接加 ed：watched。", kp: ["过去式"] },
    { type: "choice", difficulty: 1, stem: "go 的过去式是（　）。", options: ["went", "goed", "going", "goes"], answer: "A", analysis: "go → went（不规则变化）。", kp: ["过去式"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "—What did you do last weekend? —I ____ my room.", options: ["cleaned", "clean", "am cleaning", "cleans"], answer: "A", analysis: "last weekend 表过去，动词用过去式。", kp: ["一般过去时"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：do → ____", answer: "did", analysis: "do → did（不规则）。", kp: ["过去式"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：drink → ____", answer: "drank", analysis: "drink → drank（不规则）。", kp: ["过去式"], tags: ["易错"] },
    { type: "judge", difficulty: 1, stem: "「stay at home」的意思是待在家里。", answer: "对", analysis: "stayed at home 是它的过去式表达。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "—Did you see a film last night? —____", options: ["Yes, I did.", "Yes, I do.", "Yes, I was.", "No, I don't."], answer: "A", analysis: "Did 疑问句回答 Yes, I did. / No, I didn't.。", kp: ["一般过去时", "句型"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Last weekend, Amy ____ (1) at home and ____ (2) her homework. Then she visited her grandparents.", clozeItems: [["A. stayed", "B. stays", "C. is staying"], ["A. did", "B. does", "C. do"]], answer: ["A", "A"], analysis: "过去时：stayed; did。", kp: ["完形填空", "一般过去时"] },
    { type: "choice", difficulty: 2, stem: "下列全是过去式的一组是（　）。", options: ["saw, went, took", "see, go, take", "seen, gone, taken", "sees, goes, takes"], answer: "A", analysis: "saw/went/took 都是不规则过去式。", kp: ["过去式"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：wash → ____", answer: "washed", analysis: "规则变化加 ed：washed。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "「I stayed at home and slept.」中 slept 是（　）的过去式。", options: ["sleep", "sleepy", "asleep", "sleeping"], answer: "A", analysis: "sleep → slept。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「上周末」作文要（　）。", options: ["用一般过去时，按时间顺序写活动", "用将来时", "只写心情", "写下周计划"], answer: "A", analysis: "过去的事用过去式，可先总后分。", kp: ["书面表达", "时态"] }
  ], "6下", 2);

  // ========== 6下 Unit 3 Where did you go? ==========
  reg([
    { type: "choice", difficulty: 1, stem: "ride 的过去式是（　）。", options: ["rode", "rided", "riding", "rides"], answer: "A", analysis: "ride a horse / ride a bike → rode。", kp: ["过去式"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：take → ____", answer: "took", analysis: "take pictures → took pictures。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "—____ did you go on your holiday? —I went to Xinjiang.", options: ["Where", "What", "How", "Who"], answer: "A", analysis: "Where 问去了哪里。", kp: ["疑问词", "句型"] },
    { type: "choice", difficulty: 2, stem: "—How did you go there? —We went there ____ plane.", options: ["by", "on", "with", "to"], answer: "A", analysis: "by plane 乘飞机；过去时中 by 不变。", kp: ["介词"] },
    { type: "judge", difficulty: 1, stem: "「hurt my foot」的意思是我的脚受伤了。", answer: "对", analysis: "hurt 的过去式仍是 hurt。", kp: ["短语", "过去式"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：eat → ____", answer: "ate", analysis: "eat → ate（不规则）。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "We ____ many beautiful pictures last summer.", options: ["took", "take", "taking", "takes"], answer: "A", analysis: "last summer 表过去。", kp: ["一般过去时"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Last National Day holiday, Mike ____ (1) to Sanya with his family. He ____ (2) in the sea every day.", clozeItems: [["A. went", "B. goes", "C. going"], ["A. swam", "B. swims", "C. swim"]], answer: ["A", "A"], analysis: "过去时：went；swim → swam。", kp: ["完形填空", "过去式"] },
    { type: "choice", difficulty: 2, stem: "「went camping」的意思是（　）。", options: ["去野营", "去游泳", "去钓鱼", "去买礼物"], answer: "A", analysis: "go camping 野营；go fishing 钓鱼；buy gifts 买礼物。", kp: ["短语"] },
    { type: "judge", difficulty: 2, stem: "「Did you buy gifts?」的否定回答是「No, I didn't.」", answer: "对", analysis: "Did 疑问句否定回答 No, 主语+didn't。", kp: ["一般过去时"] },
    { type: "fill", difficulty: 2, stem: "写出过去式：buy → ____", answer: "bought", analysis: "buy → bought（不规则）。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「假期旅行」作文应包括（　）。", options: ["时间、地点、交通方式、活动、感受", "只写地点", "只写天气", "写明年计划"], answer: "A", analysis: "要素齐全、过去时、按时间或空间顺序写。", kp: ["书面表达"] }
  ], "6下", 3);

  // ========== 6下 Unit 4 Then and now ==========
  reg([
    { type: "choice", difficulty: 1, stem: "「gym」的意思是（　）。", options: ["体育馆", "食堂", "草地", "图书馆"], answer: "A", analysis: "gym 体育馆；dining hall 食堂；grass 草地。", kp: ["单词"] },
    { type: "choice", difficulty: 2, stem: "There ____ no gym in my school twenty years ago.", options: ["was", "is", "were", "are"], answer: "A", analysis: "ago 表过去，no gym 单数用 was。", kp: ["There be 过去式"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "There ____ many trees near my home before.", options: ["were", "was", "is", "are"], answer: "A", analysis: "many trees 复数用 were。", kp: ["There be"] },
    { type: "judge", difficulty: 1, stem: "「before」表示以前，「now」表示现在。", answer: "对", analysis: "Then and now 课文对比 before 和 now 的变化。", kp: ["时间词"] },
    { type: "fill", difficulty: 2, stem: "填空：I could ____ my friends on the Internet now.（填动词原形，表示「看见」）", answer: "see", analysis: "could + 动词原形。", kp: ["情态动词"] },
    { type: "choice", difficulty: 2, stem: "Grandpa ____ go to school by bus before. There were no buses!", options: ["couldn't", "could", "can", "can't"], answer: "A", analysis: "没有公交车，所以不能 couldn't。", kp: ["情态动词", "阅读理解"] },
    { type: "choice", difficulty: 2, stem: "「Then and now」主题作文适合用的时态是（　）。", options: ["now 用一般现在时，before 用一般过去时", "全部用过去时", "全部用将来时", "全部用现在进行时"], answer: "A", analysis: "今昔对比：now 现在时，before 过去时。", kp: ["时态"], tags: ["易错"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：My school is different now. There ____ (1) a new library and a big gym. Before, there ____ (2) only a small playground.", clozeItems: [["A. is", "B. was", "C. were"], ["A. was", "B. is", "C. are"]], answer: ["A", "A"], analysis: "now 用 is；before 用 was。", kp: ["完形填空", "There be"] },
    { type: "judge", difficulty: 2, stem: "「People didn't use the Internet before.」意思是人们以前不用互联网。", answer: "对", analysis: "didn't + 动词原形构成否定。", kp: ["一般过去时"] },
    { type: "fill", difficulty: 2, stem: "写出下列单词：食堂（英文）____", answer: "dining hall", analysis: "dining hall 食堂。", kp: ["单词"] },
    { type: "choice", difficulty: 2, stem: "选择题：My school changed a lot. Now it is ____ than before.", options: ["more beautiful", "beautiful", "most beautiful", "beautifuler"], answer: "A", analysis: "多音节形容词比较级 more + 原形。", kp: ["比较级"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「Then and now」变化的作文，好的做法是（　）。", options: ["选取 2-3 个方面对比过去和现在", "只写现在", "罗列 20 条变化", "写未来十年计划"], answer: "A", analysis: "选取典型方面对比，结构清晰。", kp: ["书面表达"] }
  ], "6下", 4);

})();
