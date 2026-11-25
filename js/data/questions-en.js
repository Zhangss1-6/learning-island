// 英语题库（人教精通版 · 天津专用）
// 六上：2025 新教材（Travelling / My Feelings / Planting and Growing / Seasons / Celebration days / Heroes）
// 六下：现行教材（I went to Sanya for my holidays / There is a park near my home / We are going to travel / General Revision 1-3）
// 覆盖：单词、短语搭配、语法、完形填空、句型与书面表达（audioText 字段已预留听力接入）
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

  // ========== 六上 Unit 1 Travelling（旅行：过去式 + 方位 + 城市） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：旅行", options: ["travel", "trouble", "train", "tree"], answer: "A", analysis: "travel 旅行；train 火车。", kp: ["单词"], audioText: "travel" },
    { type: "choice", difficulty: 1, stem: "「北方」的英文是（　）。", options: ["north", "south", "east", "west"], answer: "A", analysis: "north 北；south 南；east 东；west 西。", kp: ["方位词"], audioText: "north" },
    { type: "choice", difficulty: 1, stem: "Sanya is in the ____ of China.（三亚在中国的南部）", options: ["south", "north", "west", "middle"], answer: "A", analysis: "in the south of... 在……的南部。", kp: ["方位表达"] },
    { type: "choice", difficulty: 2, stem: "—Where did you go during your holiday? —I ____ to Sanya.", options: ["went", "go", "goes", "going"], answer: "A", analysis: "during your holiday 表过去，用过去式 went。", kp: ["一般过去时"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "—Did you have a good time? —____", options: ["Yes, I did.", "Yes, I do.", "Yes, I was.", "No, I don't."], answer: "A", analysis: "Did 开头的一般疑问句用 did 回答：Yes, I did. / No, I didn't.", kp: ["一般过去时"] },
    { type: "fill", difficulty: 2, stem: "写出动词的过去式：go → ____", answer: "went", analysis: "go 的过去式是 went，属于不规则变化。", kp: ["过去式"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "填空：Paris is a beautiful city in the ____ of France.（北部）", answer: "north", analysis: "in the north of France 在法国北部。", kp: ["方位表达"] },
    { type: "judge", difficulty: 1, stem: "「It's in the east of China.」意思是「它在中国的西部」。", answer: "错", analysis: "east 是东方，west 才是西方。", kp: ["方位词"] },
    { type: "match", difficulty: 2, stem: "把城市和它的方位连起来（北京—北方 / 三亚—南方 / 上海—东方 / 西安—西方）", options: { left: ["Beijing 北京", "Sanya 三亚", "Shanghai 上海", "Xi'an 西安"], right: ["the north of China", "the south of China", "the east of China", "the west of China"] }, answer: [0, 1, 2, 3], analysis: "北京在北方，三亚在南方，上海在东方，西安在西方。", kp: ["文化常识", "方位"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Last summer, Lisa ____ (1) to Paris with her family. They ____ (2) a wonderful time there.", clozeItems: [["A. went", "B. goes", "C. go"], ["A. had", "B. has", "C. have"]], answer: ["A", "A"], analysis: "Last summer 表过去；go→went，have→had。", kp: ["完形填空", "过去式"] },
    { type: "choice", difficulty: 2, stem: "问别人的假期去了哪里，应该问（　）。", options: ["Where did you go during your holiday?", "What's your name?", "How old are you?", "What colour do you like?"], answer: "A", analysis: "Where did you go...? 询问过去去了哪里。", kp: ["句型"] },
    { type: "choice", difficulty: 3, stem: "书面表达要点：写「我的假期旅行」，好的结构是（　）。", options: ["去了哪里→做了什么→感受如何", "只写一句话", "只写天气", "从头到尾写现在时"], answer: "A", analysis: "游记三要素：地点（went to）、活动（did）、感受（wonderful/happy）。", kp: ["书面表达"] }
  ], "6上", 1);

  // ========== 六上 Unit 2 My Feelings（情绪表达） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：担心的", options: ["worried", "happy", "tired", "excited"], answer: "A", analysis: "worried 担心的；happy 开心的；tired 累的；excited 兴奋的。", kp: ["情绪单词"], audioText: "worried" },
    { type: "choice", difficulty: 1, stem: "「生气」的英文是（　）。", options: ["angry", "hungry", "happy", "sad"], answer: "A", analysis: "angry 生气；hungry 饿。两个词长得像，注意区分！", kp: ["情绪单词"], tags: ["易错"], audioText: "angry" },
    { type: "choice", difficulty: 2, stem: "今天考试得了满分，你的心情可以用（　）形容。", options: ["excited", "bored", "sad", "scared"], answer: "A", analysis: "excited 兴奋的，形容开心激动的心情。", kp: ["情绪单词"] },
    { type: "choice", difficulty: 2, stem: "—What's the matter? —I ____ tired.", options: ["feel", "feels", "feeling", "am feel"], answer: "A", analysis: "主语 I 后用动词原形 feel：I feel tired. 我觉得累。", kp: ["句型"] },
    { type: "choice", difficulty: 2, stem: "朋友看起来不开心，你应该说（　）。", options: ["What's the matter? Do you want to talk?", "Go away!", "Ha ha, you look funny!", "I don't care."], answer: "A", analysis: "关心他人情绪：What's the matter? 怎么了？", kp: ["交际用语"] },
    { type: "fill", difficulty: 2, stem: "填空：You look sad. You ____ take a rest.（填情态动词，表示「应该」）", answer: "should", analysis: "should 表示建议：你应该休息一下。", kp: ["情态动词"] },
    { type: "judge", difficulty: 1, stem: "「I'm scared.」的意思是「我很害怕」。", answer: "对", analysis: "scared 害怕的。", kp: ["情绪单词"] },
    { type: "choice", difficulty: 2, stem: "Tim can't find his cat. He feels ____.（他找不到猫了，很担心）", options: ["worried", "proud", "bored", "sleepy"], answer: "A", analysis: "找不到心爱的东西会担心 worried。", kp: ["情境理解"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：It is late at night. Tom still can't finish his homework. He feels ____ (1). His mother says, \"Don't worry. You ____ (2) do it tomorrow morning.\"", clozeItems: [["A. tired and worried", "B. excited", "C. proud"], ["A. should", "B. shouldn't", "C. can't"]], answer: ["A", "A"], analysis: "熬夜写作业会疲惫担心；妈妈建议 should（应该）。", kp: ["完形填空", "情绪"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① feel ② I ③ today ④ happy", options: ["①", "②", "③", "④"], answer: [1, 0, 2, 3], analysis: "I feel happy today. 我今天很开心。", kp: ["连词成句"] },
    { type: "choice", difficulty: 2, stem: "如何安慰考试没考好的朋友？（　）", options: ["Don't worry. You can do better next time.", "Haha, you failed!", "So bad!", "I'm happy for you."], answer: "A", analysis: "安慰用语：别担心，下次会更好。", kp: ["书面表达", "交际"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「我的心情」，应该写（　）。", options: ["什么事让我有这种心情 + 我的感受", "只写一个单词", "只写天气", "写别人的心情不写自己"], answer: "A", analysis: "心情作文要有事件和感受，才具体生动。", kp: ["书面表达"] }
  ], "6上", 2);

  // ========== 六上 Unit 3 Planting and Growing（种植与生长） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：种子", options: ["seed", "leaf", "root", "flower"], answer: "A", analysis: "seed 种子；leaf 叶子；root 根；flower 花。", kp: ["植物单词"], audioText: "seed" },
    { type: "choice", difficulty: 1, stem: "「浇水」的英文短语是（　）。", options: ["water the plant", "plant the water", "wash the plant", "drink the plant"], answer: "A", analysis: "water 在这里作动词，表示浇水。", kp: ["短语"] },
    { type: "choice", difficulty: 1, stem: "植物长在（　）里。", options: ["soil", "water bottle", "desk", "book"], answer: "A", analysis: "soil 土壤，植物种在土里。", kp: ["植物单词"] },
    { type: "choice", difficulty: 2, stem: "Plants need ____ and sunlight to grow.", options: ["water", "candy", "toys", "books"], answer: "A", analysis: "植物生长需要水和阳光。", kp: ["常识", "句型"] },
    { type: "order", difficulty: 2, stem: "把种植步骤排成正确的顺序：① put the seed in the soil ② water it every day ③ watch it grow ④ dig a hole", options: ["①", "②", "③", "④"], answer: [3, 0, 1, 2], analysis: "挖坑→放种子→每天浇水→看着它长大。", kp: ["排序", "课文理解"] },
    { type: "fill", difficulty: 2, stem: "填空：The plant ____ two new leaves.（它长出了两片新叶子，用 have 的三单形式）", answer: "has", analysis: "主语 the plant 是第三人称单数，have → has。", kp: ["三单"] },
    { type: "judge", difficulty: 1, stem: "「grow up」的意思是「长大」。", answer: "对", analysis: "grow up 长大成人；grow 种植/生长。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "—____ do you water the flowers? —Every day.", options: ["How often", "How many", "What", "Where"], answer: "A", analysis: "How often 问频率，用 every day / once a week 回答。", kp: ["疑问词"], tags: ["易错"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：First, we put a ____ (1) in the soil. Then we ____ (2) it every day. After a few weeks, it grows into a small tree.", clozeItems: [["A. seed", "B. book", "C. fish"], ["A. water", "B. eat", "C. read"]], answer: ["A", "A"], analysis: "把种子放进土里，每天浇水。", kp: ["完形填空", "课文理解"] },
    { type: "match", difficulty: 1, stem: "单词连线（seed—种子 / leaf—叶子 / root—根 / flower—花）", options: { left: ["seed", "leaf", "root", "flower"], right: ["种子", "叶子", "根", "花"] }, answer: [0, 1, 2, 3], analysis: "seed 种子；leaf 叶子；root 根；flower 花。", kp: ["植物单词"] },
    { type: "choice", difficulty: 2, stem: "写观察日记时，应该（　）。", options: ["按时间顺序记录植物的变化", "只写第一天", "凭空想象没发生的事", "不写日期"], answer: "A", analysis: "观察日记要按时间顺序记录真实变化。", kp: ["书面表达"] },
    { type: "judge", difficulty: 2, stem: "「The sunflower turns to the sun.」的意思是「向日葵朝着太阳转」。", answer: "对", analysis: "sunflower 向日葵，turn to 朝向。", kp: ["课文理解"] }
  ], "6上", 3);

  // ========== 六上 Unit 4 Seasons（四季） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：夏天", options: ["summer", "winter", "autumn", "spring"], answer: "A", analysis: "spring 春；summer 夏；autumn 秋；winter 冬。", kp: ["季节单词"], audioText: "summer" },
    { type: "match", difficulty: 1, stem: "季节连线（spring—春 / summer—夏 / autumn—秋 / winter—冬）", options: { left: ["spring", "summer", "autumn", "winter"], right: ["春天", "夏天", "秋天", "冬天"] }, answer: [0, 1, 2, 3], analysis: "四个季节的基本词。", kp: ["季节单词"] },
    { type: "choice", difficulty: 2, stem: "In winter, it often ____ in Harbin.（哈尔滨冬天经常下雪）", options: ["snows", "rain", "hot", "swim"], answer: "A", analysis: "下雪 snows（三单）；rain 下雨。", kp: ["天气"] },
    { type: "choice", difficulty: 2, stem: "—Which season do you like best? —____, because I can go swimming.", options: ["Summer", "Winter", "Autumn", "Spring"], answer: "A", analysis: "go swimming 游泳是夏天的活动。", kp: ["句型", "常识"] },
    { type: "fill", difficulty: 2, stem: "填空：I like spring ____ the flowers are beautiful.（填连词，表示「因为」）", answer: "because", analysis: "because 因为，用来连接原因。", kp: ["连词"] },
    { type: "judge", difficulty: 1, stem: "「autumn」和「fall」都可以表示秋天。", answer: "对", analysis: "fall 是 autumn 的美式说法。", kp: ["季节单词"] },
    { type: "choice", difficulty: 2, stem: "秋天最典型的活动是（　）。", options: ["picking apples 采摘苹果", "making a snowman 堆雪人", "flying a kite in the flowers", "swimming in the sea"], answer: "A", analysis: "秋天丰收，采摘苹果；堆雪人是冬天。", kp: ["常识"] },
    { type: "choice", difficulty: 2, stem: "—What do you often do in spring? —I often ____ in the park.", options: ["fly kites", "make snowmen", "eat ice cream at home", "wear a big coat"], answer: "A", analysis: "春天放风筝 fly kites。", kp: ["短语", "常识"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Winter is cold in Tianjin. It often ____ (1). Children like to ____ (2) snowmen and go skating.", clozeItems: [["A. snows", "B. rains", "C. shines"], ["A. make", "B. do", "C. play"]], answer: ["A", "A"], analysis: "天津冬天常下雪；make snowmen 堆雪人。", kp: ["完形填空", "天气"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① is ② My ③ season ④ favourite ⑤ spring", options: ["①", "②", "③", "④", "⑤"], answer: [1, 3, 2, 0, 4], analysis: "My favourite season is spring. 我最喜欢的季节是春天。", kp: ["连词成句"] },
    { type: "fill", difficulty: 2, stem: "填空：It's ____ in summer in Tianjin.（很热，填形容词）", answer: "hot", analysis: "夏天很热：It's hot in summer.", kp: ["天气"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「我最喜欢的季节」，应包括（　）。", options: ["季节名 + 喜欢的原因 + 这个季节的活动", "只写季节名", "写四季各一句话平均用力", "写去年冬天的心情"], answer: "A", analysis: "三要素：季节、原因（because）、活动（can / often do）。", kp: ["书面表达"] }
  ], "6上", 4);

  // ========== 六上 Unit 5 Celebration days（节日） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的词组：春节", options: ["Spring Festival", "Christmas", "Halloween", "Thanksgiving"], answer: "A", analysis: "Spring Festival 春节；Christmas 圣诞节。", kp: ["节日单词"], audioText: "Spring Festival" },
    { type: "choice", difficulty: 1, stem: "「Teachers' Day」是（　）。", options: ["教师节", "儿童节", "母亲节", "国庆节"], answer: "A", analysis: "Teachers' Day 教师节（9 月 10 日）。", kp: ["节日单词"] },
    { type: "choice", difficulty: 2, stem: "We usually ____ mooncakes at Mid-Autumn Festival.", options: ["eat", "play", "make a snowman", "sing songs at school"], answer: "A", analysis: "中秋节吃月饼 eat mooncakes。", kp: ["文化常识"] },
    { type: "choice", difficulty: 2, stem: "Christmas is ____ December 25th.", options: ["on", "in", "at", "of"], answer: "A", analysis: "具体某一天用介词 on；月份/年份才用 in。", kp: ["介词"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "填空：Children's Day is ____ June 1st.（填介词）", answer: "on", analysis: "具体日期前用 on：on June 1st。", kp: ["介词"] },
    { type: "fill", difficulty: 2, stem: "填空：We often visit our relatives ____ Spring Festival.（填介词：在春节「期间」）", answer: "at|during", analysis: "at Spring Festival / during Spring Festival 都可以。", kp: ["介词"] },
    { type: "judge", difficulty: 1, stem: "「Thanksgiving」是美国和加拿大的节日。", answer: "对", analysis: "感恩节是美国（11 月第四个周四）和加拿大的节日。", kp: ["文化常识"] },
    { type: "choice", difficulty: 2, stem: "圣诞节人们常做的事是（　）。", options: ["giving presents 送礼物", "eating zongzi 吃粽子", "watching dragon boats", "sweeping tombs"], answer: "A", analysis: "圣诞节互赠礼物；吃粽子是端午节。", kp: ["文化常识"] },
    { type: "choice", difficulty: 2, stem: "—What do you do on New Year's Day? —____", options: ["We have a party and say Happy New Year.", "We eat mooncakes.", "We plant trees.", "We go skating in the river."], answer: "A", analysis: "元旦开聚会、互道新年快乐。", kp: ["句型", "文化常识"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：The Spring Festival is an important ____ (1) in China. People ____ (2) their relatives and friends, and children get lucky money.", clozeItems: [["A. festival", "B. month", "C. season"], ["A. visit", "B. watch", "C. look"]], answer: ["A", "A"], analysis: "春节是中国重要的节日；visit relatives 走亲访友，孩子们拿压岁钱。", kp: ["完形填空", "文化常识"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① is ② Spring Festival ③ in ④ January ⑤ or February", options: ["①", "②", "③", "④", "⑤"], answer: [1, 0, 2, 3, 4], analysis: "Spring Festival is in January or February. 春节在一月或二月。", kp: ["连词成句"] },
    { type: "choice", difficulty: 2, stem: "介绍节日作文要点：应该写（　）。", options: ["节日时间 + 人们做什么 + 你的感受", "只写日期", "只写吃什么", "只写别人的节日"], answer: "A", analysis: "节日作文三要素：时间、活动、感受。", kp: ["书面表达"] }
  ], "6上", 5);

  // ========== 六上 Unit 6 Heroes（英雄人物） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：勇敢的", options: ["brave", "kind", "clever", "lazy"], answer: "A", analysis: "brave 勇敢的；kind 善良的。", kp: ["品质单词"], audioText: "brave" },
    { type: "choice", difficulty: 1, stem: "「消防员」的英文是（　）。", options: ["firefighter", "farmer", "driver", "doctor"], answer: "A", analysis: "firefighter 消防员；farmer 农民。", kp: ["职业单词"], audioText: "firefighter" },
    { type: "choice", difficulty: 2, stem: "钟南山医生救了很多人的生命，他是一位 ____。", options: ["hero", "farmer", "driver", "singer"], answer: "A", analysis: "hero 英雄。", kp: ["单词", "文化"] },
    { type: "choice", difficulty: 2, stem: "A policeman's job is to ____ people.", options: ["protect", "cook for", "teach maths to", "drive"], answer: "A", analysis: "protect 保护：警察的工作是保护人民。", kp: ["动词"] },
    { type: "fill", difficulty: 2, stem: "填空：Yuan Longping was a great ____.（他让很多人吃饱饭）", answer: "scientist", analysis: "袁隆平是伟大的科学家。", kp: ["职业单词", "文化常识"] },
    { type: "judge", difficulty: 1, stem: "「Doctor」的意思是「医生」。", answer: "对", analysis: "doctor 医生。", kp: ["职业单词"] },
    { type: "choice", difficulty: 2, stem: "英雄身上最可贵的品质是（　）。", options: ["brave and helpful 勇敢且乐于助人", "lazy and rude 懒惰粗鲁", "rich 有钱", "tall 高"], answer: "A", analysis: "英雄品质：勇敢、善良、乐于助人、有担当。", kp: ["品质", "价值观"] },
    { type: "match", difficulty: 1, stem: "职业连线（doctor—医生 / teacher—教师 / driver—司机 / farmer—农民）", options: { left: ["doctor", "teacher", "driver", "farmer"], right: ["医生", "教师", "司机", "农民"] }, answer: [0, 1, 2, 3], analysis: "常见职业词。", kp: ["职业单词"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Zhang Guimei is a great ____ (1). She helps poor girls go to school. She is kind and ____ (2).", clozeItems: [["A. teacher", "B. driver", "C. cook"], ["A. helpful", "B. lazy", "C. angry"]], answer: ["A", "A"], analysis: "张桂梅是伟大的教师；helpful 乐于助人。", kp: ["完形填空", "文化常识"] },
    { type: "choice", difficulty: 2, stem: "—____ is your hero? —My mother. She takes good care of our family.", options: ["Who", "What", "Where", "When"], answer: "A", analysis: "问「谁是」用 Who。", kp: ["疑问词"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① is ② My ③ firefighter ④ father ⑤ a", options: ["①", "②", "③", "④", "⑤"], answer: [1, 3, 0, 4, 2], analysis: "My father is a firefighter. 我爸爸是消防员。", kp: ["连词成句"] },
    { type: "choice", difficulty: 2, stem: "写「我心中的英雄」作文要点：应该写（　）。", options: ["他是谁 + 他做了什么 + 我为什么敬佩他", "只写名字", "只写外貌", "写游戏里的角色赢了多少局"], answer: "A", analysis: "英雄作文三要素：身份、事迹、敬佩的原因。", kp: ["书面表达"] }
  ], "6上", 6);

  // ========== 六下 Unit 1 I went to Sanya for my holidays（假期旅行·过去式） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：海滩", options: ["beach", "bench", "bush", "back"], answer: "A", analysis: "beach 海滩。", kp: ["单词"], audioText: "beach" },
    { type: "choice", difficulty: 2, stem: "I ____ swimming in the sea last summer.", options: ["went", "go", "goes", "will go"], answer: "A", analysis: "last summer 表过去，go swimming 过去式 went swimming。", kp: ["过去式"] },
    { type: "fill", difficulty: 2, stem: "写出动词的过去式：take（拍照 take photos）→ ____", answer: "took", analysis: "take → took，不规则变化。", kp: ["过去式"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "写出动词的过去式：eat → ____", answer: "ate", analysis: "eat → ate。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "—____ did you stay in Sanya? —For five days.", options: ["How long", "How often", "What", "Who"], answer: "A", analysis: "How long 问持续多久，用 For five days 回答。", kp: ["疑问词"], tags: ["易错"] },
    { type: "judge", difficulty: 1, stem: "「by plane」和「by air」都表示「乘飞机」。", answer: "对", analysis: "by plane = by air 乘飞机。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "We ____ many photos on the Great Wall yesterday.", options: ["took", "take", "takes", "taking"], answer: "A", analysis: "yesterday 表过去。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "「delicious」的意思是（　）。", options: ["美味的", "危险的", "困难的", "昂贵的"], answer: "A", analysis: "delicious 美味的。", kp: ["单词"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Last winter, we ____ (1) to Harbin. We ____ (2) ice lanterns and went skating. It was wonderful!", clozeItems: [["A. went", "B. go", "C. goes"], ["A. saw", "B. see", "C. sees"]], answer: ["A", "A"], analysis: "哈尔滨看冰灯 saw ice lanterns。", kp: ["完形填空", "过去式"] },
    { type: "match", difficulty: 2, stem: "动词过去式连线（go—went / eat—ate / see—saw / have—had）", options: { left: ["go", "eat", "see", "have"], right: ["went", "ate", "saw", "had"] }, answer: [0, 1, 2, 3], analysis: "常见不规则动词过去式。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "描述过去旅行感受，可以说（　）。", options: ["It was wonderful / I had a great time.", "It is wonderful yesterday.", "I am going to have fun.", "Travel is good."], answer: "A", analysis: "过去时 + 表达感受：It was wonderful. / I had a great time.", kp: ["句型"] },
    { type: "choice", difficulty: 3, stem: "书面表达要点：写「难忘的一次旅行」需要（　）。", options: ["时间 + 地点 + 活动 + 感受，全篇用过去时", "用将来时写过去的事", "只写地名", "不写感受"], answer: "A", analysis: "游记用过去时，四要素齐全。", kp: ["书面表达"] }
  ], "6下", 1);

  // ========== 六下 Unit 2 There is a park near my home（there be + 街区场所） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的单词：超市", options: ["supermarket", "hospital", "library", "park"], answer: "A", analysis: "supermarket 超市；hospital 医院；library 图书馆。", kp: ["场所单词"], audioText: "supermarket" },
    { type: "choice", difficulty: 2, stem: "____ a bookshop near my home.", options: ["There is", "There are", "There be", "Have"], answer: "A", analysis: "a bookshop 单数，用 There is。", kp: ["there be"] },
    { type: "choice", difficulty: 2, stem: "____ two parks and a zoo in our city.", options: ["There are", "There is", "There has", "It has"], answer: "A", analysis: "there be 就近原则：two parks 复数 → There are。", kp: ["there be"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "The hospital is ____ the school and the park.（在医院和公园之间）", options: ["between", "behind", "next", "on"], answer: "A", analysis: "between A and B 在 A 和 B 之间。", kp: ["方位介词"] },
    { type: "fill", difficulty: 2, stem: "填空：____ there a bank near here? —Yes, there is.（填 be 动词）", answer: "is", analysis: "a bank 单数 → Is there...?", kp: ["there be"] },
    { type: "fill", difficulty: 2, stem: "写出「在……对面」的短语：____ from（两个词）", answer: "across", analysis: "across from 在……对面。", kp: ["方位介词"] },
    { type: "judge", difficulty: 1, stem: "「next to」的意思是「紧挨着」。", answer: "对", analysis: "next to 紧挨着、旁边。", kp: ["方位介词"] },
    { type: "choice", difficulty: 2, stem: "介绍自己家附近，通常先说（　）。", options: ["家附近有什么场所，再说位置和用途", "只说一个词", "说国外的地方", "写天气"], answer: "A", analysis: "介绍街区：There is/are... + It's next to / behind... + 常去做什么。", kp: ["书面表达"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：My home is on People's Road. ____ (1) is a small park next to it. Many old people ____ (2) morning exercise there every day.", clozeItems: [["A. There", "B. Here", "C. That"], ["A. do", "B. does", "C. doing"]], answer: ["A", "A"], analysis: "There is 句型；do morning exercise 做早操。", kp: ["完形填空", "there be"] },
    { type: "match", difficulty: 1, stem: "场所连线（bookshop—书店 / bank—银行 / museum—博物馆 / cinema—电影院）", options: { left: ["bookshop", "bank", "museum", "cinema"], right: ["书店", "银行", "博物馆", "电影院"] }, answer: [0, 1, 2, 3], analysis: "常见场所词。", kp: ["场所单词"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① is ② There ③ a park ④ near ⑤ my home", options: ["①", "②", "③", "④", "⑤"], answer: [1, 0, 2, 3, 4], analysis: "There is a park near my home.", kp: ["连词成句"] },
    { type: "choice", difficulty: 2, stem: "Is there a hospital near your home? 的回答方式是（　）。", options: ["Yes, there is. / No, there isn't.", "Yes, it is. / No, it isn't.", "Yes, there are.", "Yes, I am."], answer: "A", analysis: "there be 问句用 there be 回答。", kp: ["there be"], tags: ["易错"] }
  ], "6下", 2);

  // ========== 六下 Unit 3 We are going to travel（将来计划） ==========
  reg([
    { type: "choice", difficulty: 1, stem: "选出与中文意思对应的短语：明年", options: ["next year", "last year", "this year", "every year"], answer: "A", analysis: "next year 明年，常和 be going to 连用。", kp: ["时间短语"] },
    { type: "choice", difficulty: 2, stem: "We ____ to Beijing next month.", options: ["are going to travel", "traveled", "travel yesterday", "travels"], answer: "A", analysis: "next month 表将来，用 be going to。", kp: ["一般将来时"] },
    { type: "fill", difficulty: 2, stem: "填空：She ____ going to visit the museum.（填 be 动词）", answer: "is", analysis: "主语 She → is going to。", kp: ["be going to"] },
    { type: "fill", difficulty: 2, stem: "填空：—____ are you going to get there? —By train.（填疑问词）", answer: "How|how", analysis: "How 问方式，答 By train。", kp: ["疑问词"] },
    { type: "choice", difficulty: 2, stem: "「plan a trip」的意思是（　）。", options: ["计划一次旅行", "取消旅行", "拍照", "买票"], answer: "A", analysis: "plan 计划；trip 旅行。", kp: ["短语"] },
    { type: "judge", difficulty: 1, stem: "「I'm going to pack my bags.」的意思是「我打算收拾行李」。", answer: "对", analysis: "pack my bags 收拾行李。", kp: ["短语"] },
    { type: "choice", difficulty: 2, stem: "Which one is a future plan?（哪句是将来计划？）", options: ["I will visit Xi'an this summer.", "I visited Xi'an last summer.", "I visited yesterday.", "I visited two years ago."], answer: "A", analysis: "will / be going to 表将来；visited 是过去。", kp: ["时态辨析"] },
    { type: "choice", difficulty: 2, stem: "讨论旅行计划时的合理顺序是（　）。", options: ["先定时间和地点，再定交通和要带的东西", "先收拾行李再定去哪", "不定时间就出发", "只定交通不定地点"], answer: "A", analysis: "做计划：时间地点→交通→行李清单。", kp: ["书面表达", "常识"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Summer holiday is coming! We ____ (1) going to travel to Yunnan. We ____ (2) go there by plane, because it is far away.", clozeItems: [["A. are", "B. is", "C. am"], ["A. will", "B. did", "C. do"]], answer: ["A", "A"], analysis: "We → are going to；will go 将乘飞机去。", kp: ["完形填空", "将来时"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① are ② What ③ going ④ you ⑤ to do ⑥ tomorrow", options: ["①", "②", "③", "④", "⑤", "⑥"], answer: [1, 3, 0, 2, 4, 5], analysis: "What are you going to do tomorrow?", kp: ["连词成句"] },
    { type: "choice", difficulty: 2, stem: "be going to 后面的动词用（　）。", options: ["原形", "过去式", "三单形式", "ing 形式"], answer: "A", analysis: "be going to + 动词原形：I'm going to go / visit / see。", kp: ["一般将来时"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "书面表达要点：写「我的旅行计划」应包括（　）。", options: ["时间 + 地点 + 交通方式 + 打算做的事", "只写地点", "只写吃过什么", "写去年去过的地方"], answer: "A", analysis: "计划作文四要素，全篇 be going to / will。", kp: ["书面表达"] }
  ], "6下", 3);

  // ========== 六下 Unit 4 General Revision 1（综合复习：时态混练） ==========
  reg([
    { type: "choice", difficulty: 2, stem: "I ____ to school at 7:00 every day.", options: ["go", "went", "am going", "will went"], answer: "A", analysis: "every day 表习惯，用一般现在时。", kp: ["一般现在时"] },
    { type: "choice", difficulty: 2, stem: "Look! The children ____ football on the playground.", options: ["are playing", "play", "played", "plays"], answer: "A", analysis: "Look! 提示正在进行，用现在进行时 are playing。", kp: ["现在进行时"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "My father ____ a new bike for me last week.", options: ["bought", "buys", "buy", "is buying"], answer: "A", analysis: "last week 表过去，buy → bought。", kp: ["一般过去时"] },
    { type: "fill", difficulty: 2, stem: "填空：We ____ have a picnic tomorrow.（填 will / are going to 均可，写 will）", answer: "will", analysis: "tomorrow 表将来。", kp: ["一般将来时"] },
    { type: "choice", difficulty: 2, stem: "She ____ her homework every evening.", options: ["does", "do", "doing", "did"], answer: "A", analysis: "she 三单 → does。", kp: ["三单"] },
    { type: "judge", difficulty: 2, stem: "「Listen! Someone is singing.」用了现在进行时。", answer: "对", analysis: "Listen! 提示动作正在进行。", kp: ["现在进行时"] },
    { type: "choice", difficulty: 3, stem: "选择正确时态：My mother ____ me a story last night, and tonight she ____ another one.", options: ["told; will tell", "tells; told", "tell; telling", "told; tells yesterday"], answer: "A", analysis: "last night 过去 → told；tonight 将来 → will tell。", kp: ["时态综合"] },
    { type: "match", difficulty: 2, stem: "时间词与时态连线（yesterday—过去 / now—进行 / tomorrow—将来 / every day—一般现在）", options: { left: ["yesterday", "now", "tomorrow", "every day"], right: ["一般过去时", "现在进行时", "一般将来时", "一般现在时"] }, answer: [0, 1, 2, 3], analysis: "抓时间标志词是选时态的关键。", kp: ["时态综合", "解题技巧"] },
    { type: "cloze", difficulty: 3, stem: "完形填空：Mary usually ____ (1) up at seven, but yesterday she ____ (2) up late because it was Sunday.", clozeItems: [["A. gets", "B. got", "C. get"], ["A. got", "B. gets", "C. get"]], answer: ["A", "A"], analysis: "usually 一般现在 → gets；yesterday → got。", kp: ["完形填空", "时态综合"] },
    { type: "fill", difficulty: 2, stem: "写出动词的过去式：buy → ____", answer: "bought", analysis: "buy → bought。", kp: ["过去式"] },
    { type: "choice", difficulty: 2, stem: "Do you often help your parents? 的回答是（　）。", options: ["Yes, I do. I often wash dishes.", "Yes, I did.", "Yes, I will.", "Yes, I am."], answer: "A", analysis: "Do 开头的一般现在时疑问句用 do 回答。", kp: ["一般现在时"] },
    { type: "choice", difficulty: 3, stem: "写作诊断：句子「I go to Beijing and visit the Great Wall last year.」的问题是（　）。", options: ["有 last year 却用现在时 go，应改为 went", "没有错", "visit 应加 s", "the Great Wall 不用 the"], answer: "A", analysis: "时间状语 last year 决定全句用过去时：went、visited。", kp: ["时态综合", "易错"] }
  ], "6下", 4);

  // ========== 六下 Unit 5 General Revision 2（综合复习：词形·介词·代词） ==========
  reg([
    { type: "choice", difficulty: 2, stem: "写出名词复数：child → ____", options: ["children", "childs", "childes", "childrens"], answer: "A", analysis: "child 的复数是不规则的 children。", kp: ["名词复数"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "This book is ____, and that one is ____.", options: ["mine; his", "my; he", "me; his", "mine; him"], answer: "A", analysis: "名词性物主代词 mine / his 独立使用。", kp: ["代词"] },
    { type: "fill", difficulty: 2, stem: "填空：The park is ____ the school.（在学校的后面，填介词）", answer: "behind", analysis: "behind 在……后面。", kp: ["介词"] },
    { type: "choice", difficulty: 2, stem: "Tom is taller than ____.（比「我」高）", options: ["me", "I", "my", "mine"], answer: "A", analysis: "口语中 than 后用宾格 me。", kp: ["代词", "比较级"] },
    { type: "choice", difficulty: 2, stem: "比较级填空：An elephant is ____ than a horse.", options: ["heavier", "heavy", "heaviest", "more heavy"], answer: "A", analysis: "heavy 变比较级改 y 为 i 加 er：heavier。", kp: ["比较级"], tags: ["易错"] },
    { type: "fill", difficulty: 2, stem: "写出最高级：big → ____", answer: "biggest", analysis: "big 双写 g 加 est：biggest。", kp: ["最高级"] },
    { type: "judge", difficulty: 2, stem: "「in the morning」用 in，「on Monday morning」用 on。", answer: "对", analysis: "泛指上午用 in；具体某天上午用 on。", kp: ["介词"], tags: ["易错"] },
    { type: "choice", difficulty: 2, stem: "There ____ some milk in the glass.", options: ["is", "are", "have", "be"], answer: "A", analysis: "milk 不可数，用 is。", kp: ["there be", "不可数名词"] },
    { type: "match", difficulty: 2, stem: "代词连线（I—me / they—them / we—us / she—her）", options: { left: ["I", "they", "we", "she"], right: ["me", "them", "us", "her"] }, answer: [0, 1, 2, 3], analysis: "主格与宾格对应。", kp: ["代词"] },
    { type: "cloze", difficulty: 2, stem: "完形填空：Mike is taller than ____ (1). They ____ (2) good friends and often play together.", clozeItems: [["A. his brother", "B. he brother", "C. him brother"], ["A. are", "B. is", "C. am"]], answer: ["A", "A"], analysis: "比较对象 his brother；They 复数 → are。", kp: ["完形填空", "比较级"] },
    { type: "choice", difficulty: 3, stem: "哪个句子完全正确？（　）", options: ["There are many books on the desk.", "There is many books on the desk.", "There have many books.", "There are a book on the desk."], answer: "A", analysis: "many books 复数 → There are。", kp: ["there be"] },
    { type: "order", difficulty: 2, stem: "把单词排成一句通顺的话：① is ② the longest river ③ the Yellow River ④ in China ⑤ not", options: ["①", "②", "③", "④", "⑤"], answer: [2, 0, 4, 1, 3], analysis: "The Yellow River is not the longest river in China. 黄河不是中国最长的河。", kp: ["连词成句", "最高级"] }
  ], "6下", 5);

  // ========== 六下 Unit 6 General Revision 3（综合复习：阅读与情景交际） ==========
  reg([
    { type: "choice", difficulty: 2, stem: "阅读短文：「Tom gets up early and runs every morning. He is strong and healthy.」Tom 健康的原因是（　）。", options: ["早起跑步锻炼", "吃很多糖果", "睡懒觉", "天天玩游戏"], answer: "A", analysis: "从 gets up early and runs every morning 可知。", kp: ["阅读理解"] },
    { type: "choice", difficulty: 2, stem: "在餐厅想点一份面条，应该说（　）。", options: ["I'd like some noodles, please.", "Give me water now!", "Noodles? Me!", "Where is food?"], answer: "A", analysis: "点餐礼貌用语：I'd like..., please.（=I would like）", kp: ["情景交际"] },
    { type: "choice", difficulty: 2, stem: "别人向你道谢，你应该回答（　）。", options: ["You're welcome.", "You're right.", "I'm fine.", "OK, bye."], answer: "A", analysis: "You're welcome. 不客气。", kp: ["情景交际"] },
    { type: "choice", difficulty: 3, stem: "阅读：「There will be a heavy rain tomorrow. The sports meeting will be next week.」明天会怎样？（　）", options: ["下雨", "开运动会", "晴天", "下雪"], answer: "A", analysis: "a heavy rain tomorrow 明天有大雨。", kp: ["阅读理解"] },
    { type: "fill", difficulty: 2, stem: "情景填空：—How are you? —I'm ____, thank you.（很好）", answer: "fine", analysis: "How are you? 的经典回答：I'm fine, thank you.", kp: ["情景交际"] },
    { type: "judge", difficulty: 2, stem: "借东西时说「May I use your pen?」比「Give me your pen!」更有礼貌。", answer: "对", analysis: "May I...? 是礼貌请求；Give me... 生硬。", kp: ["情景交际", "礼仪"] },
    { type: "choice", difficulty: 2, stem: "打电话时介绍「我是李明」，应该用（　）。", options: ["This is Li Ming speaking.", "I am Li Ming here.", "Li Ming is me.", "My name speak."], answer: "A", analysis: "电话用语：This is ... speaking.", kp: ["情景交际", "文化常识"], tags: ["易错"] },
    { type: "cloze", difficulty: 3, stem: "完形填空：It was Sunday. Peter and his friends ____ (1) to the zoo. They ____ (2) many animals and took lots of photos.", clozeItems: [["A. went", "B. go", "C. goes"], ["A. saw", "B. see", "C. look"]], answer: ["A", "A"], analysis: "It was Sunday 提示过去：went / saw。", kp: ["完形填空", "过去式"] },
    { type: "choice", difficulty: 3, stem: "阅读理解技巧：遇到不认识的单词，最好的做法是（　）。", options: ["联系上下文猜词义", "马上放弃", "只看认识的词乱选", "从头再抄一遍"], answer: "A", analysis: "猜词策略：看上下文、举例、同义词提示。", kp: ["阅读技巧"] },
    { type: "match", difficulty: 2, stem: "情景回应连线（How are you?—Fine, thanks / Thank you!—You're welcome / What's the matter?—I feel sick / Goodbye!—See you）", options: { left: ["How are you?", "Thank you!", "What's the matter?", "Goodbye!"], right: ["Fine, thanks.", "You're welcome.", "I feel sick.", "See you."] }, answer: [0, 1, 2, 3], analysis: "常见情景对话配对。", kp: ["情景交际"] },
    { type: "choice", difficulty: 3, stem: "书面表达：小升初英语作文一般要求（　）。", options: ["5-8 句话，围绕主题，时态一致，句子完整", "越长越好", "只写一句话", "中英混合"], answer: "A", analysis: "小升初作文 5-8 句即可，关键是切题、时态一致、无重大语法错误。", kp: ["书面表达", "小升初高频"] },
    { type: "choice", difficulty: 3, stem: "考试技巧：完形填空做完后应该（　）。", options: ["把答案带回原文通读检查", "马上交卷", "全部改成同一个选项", "不检查"], answer: "A", analysis: "完形要连读检查上下文是否通顺。", kp: ["解题技巧", "小升初高频"] }
  ], "6下", 6);
})();
