/* ============================================================
   国庆泰一下 · 站点数据
   修改这里即可更新网站内容（无需动 HTML/CSS）

   营业时间格式（hours）：
   - 7 项 = 周日→周六，每项为当天时段列表（可多段，如午市+晚市）
   - 每段 [开门分钟, 关门分钟]（自 0 点起计）
   - [] = 当天休市 · null = 未知（显示"以地图为准"）
   ============================================================ */

const D = (h, m) => h * 60 + (m || 0);       // 时刻 → 分钟
const S = (o, c) => [o, c];                   // 一个营业段 [开门, 关门]
const H24 = [S(0, 1440)];                       // 全天营业段
const WEEK = (segs) => [segs, segs, segs, segs, segs, segs, segs]; // 每天相同

window.TRIP = {
  meta: {
    depAt: "2026-09-29T17:25:00+08:00", // 倒计时基准：我的航班起飞时间
  },

  /* ---------- 成员 ---------- */
  members: [
    { name: "小鱼茄子", emoji: "🐟" },
    { name: "小笼包",   emoji: "🥟" },
    { name: "小姐夫",   emoji: "🤵" },
    { name: "椰子壳",   emoji: "🥥" },
    { name: "张阳阳",   emoji: "☀️" },
    { name: "豆豆",     emoji: "🫘" },
  ],

  /* ---------- 地点库（行程涉及的所有地点） ----------
     q:       Google 搜索关键词（点击卡片跳转谷歌地图搜索）
     rating:  评分快照（2026-09 调研，各平台综合，以 Google 实时为准；null 则不显示）
     price:   均价档位 ฿ / ฿฿ / ฿฿฿
     pnote:   均价/门票说明
     hours:   营业时间（见文件头说明）
  */
  places: {
    /* —— 曼谷 —— */
    hotel_bkk:   { n: "Montraj Continent 曼谷大陆酒店", q: "Montraj Continent Sukhumvit Bangkok", rating: 4.5, price: null, pnote: "素坤逸 21/23 巷之间 · 近 Asok", hours: WEEK(H24) },
    t21:         { n: "Terminal 21 Asok 商场", q: "Terminal 21 Asok Bangkok", rating: 4.6, price: "฿", pnote: "Pier 21 美食广场人均 30–150฿", hours: WEEK([S(D(10), D(22))]) },
    palace:      { n: "大皇宫", q: "The Grand Palace Bangkok 大皇宫", rating: null, price: "฿฿", pnote: "门票 500฿（含玉佛寺）· 15:30 停止售票", hours: WEEK([S(D(8, 30), D(15, 30))]) },
    watpho:      { n: "卧佛寺 Wat Pho", q: "Wat Pho Bangkok 卧佛寺", rating: 4.7, price: "฿฿", pnote: "门票 300฿（只收现金）", hours: WEEK([S(D(8), D(19, 30))]) },
    s1981:       { n: "1981 Soul & Sold 复古商场", q: "1981 Soul & Sold Bangkok", rating: null, price: "฿฿", pnote: "2026 新开 · 5 层古着/黑胶/美食广场", hours: WEEK([S(D(11), D(22))]) },
    bangsue:     { n: "Bang Sue Junction 古着市场（红楼）", q: "Bangsue Junction Shopping Center Bangkok", rating: 4.4, price: "฿", pnote: "免费入场 · 可还价 10–20%", hours: [[S(D(10), D(21))], [S(D(10), D(20))], [S(D(10), D(20))], [S(D(10), D(20))], [S(D(10), D(20))], [S(D(10), D(21))], [S(D(10), D(21))]] },
    mrt_sukhumvit: { n: "MRT 素坤逸站（蓝线）", q: "MRT Sukhumvit Station Bangkok", rating: null, price: null, pnote: "地铁票价约 16–42฿", hours: WEEK([S(D(6), D(24))]) },
    aphiwat:     { n: "阿披瓦中央车站（新邦苏）", q: "Krung Thep Aphiwat Central Terminal Bangkok", rating: null, price: null, pnote: "9 次特快在此发车", hours: WEEK(H24) },
    bkk_airport: { n: "曼谷素万那普机场", q: "Suvarnabhumi Airport Bangkok", rating: null, price: null, pnote: "以机票标注机场为准", hours: WEEK(H24) },

    /* —— 清迈 —— */
    cnx_station: { n: "清迈火车站", q: "Chiang Mai Railway Station", rating: null, price: null, pnote: "红丝绒 9 次列车终点", hours: WEEK(H24) },
    hotel_cnx:   { n: "Novotel 清迈宁曼 Journeyhub", q: "Novotel Chiangmai Nimman Journeyhub", rating: 4.5, price: null, pnote: "宁曼 × Huay Kaew 路口 · 玛雅旁", hours: WEEK(H24) },
    lot:         { n: "Lot of Taste 咖啡", q: "Lot of Taste Chiang Mai Nimman", rating: 4.5, price: "฿", pnote: "Soft Latte 130฿ · 人均 100–250฿", hours: WEEK([S(D(8), D(22))]) },
    relax:       { n: "Relax Express 按摩（塔佩门店）", q: "Relax Express Massage Chiang Mai Ratchadamnoen", rating: 4.8, price: "฿", pnote: "足疗 350฿ · 草药球 789฿", hours: WEEK([S(D(10), D(24))]) },
    pari:        { n: "PARI- 餐厅（米其林指南）", q: "PARI restaurant Chiang Mai Samlarn", rating: 4.6, price: "฿฿฿", pnote: "晚餐人均 500–1,000฿", hours: WEEK([S(D(10), D(14)), S(D(18), D(23))]) },
    grandma:     { n: "奶奶厨房烹饪学校", q: "Grandma's Home Cooking School Chiang Mai", rating: 4.5, price: "฿฿", pnote: "约 1,000–1,200฿ 含接送", hours: WEEK([S(D(8, 30), D(19, 30))]) },
    oasis:       { n: "Oasis Spa（兰纳店）", q: "Oasis Spa Lanna Chiang Mai", rating: 4.8, price: "฿฿฿", pnote: "香薰精油 60min 约 1,431฿起", hours: WEEK([S(D(10), D(22))]) },
    chefden:     { n: "Chef Den Seafood 海鲜", q: "Chef Den Seafood Chiang Mai", rating: 4.4, price: "฿฿", pnote: "人均 101–250฿ · 距 JJ 集市步行约 550 米 · 休日说法不一", hours: WEEK([S(D(11), D(22))]) },
    pumdeng:     { n: "Pum Deng 麻辣烫·关东煮", q: "ปุ๋มเด้ง เจ็ดยอด Pum Deng Mala Chiang Mai", rating: null, price: "฿", pnote: "5–12฿/串 · 酱料免费", hours: WEEK([S(D(17, 30), D(24))]) },
    hoyolo:      { n: "Hoyolo MALA CMU 麻辣烫", q: "Hoyolo Mala CMU Chiang Mai", rating: null, price: "฿", pnote: "5฿起/串 · 新店", hours: WEEK([S(D(11), D(23))]) },
    kaprao:      { n: "Kaprao Nueanuea 打抛饭（后门店）", q: "Kaprao Nueanuea Suthep Chiang Mai", rating: 4.4, price: "฿", pnote: "55–130฿ · 招牌双鸭蛋", hours: WEEK([S(D(17), D(22))]) },
    potato:      { n: "清迈大学后门夜市炸土豆", q: "清迈大学后门夜市 Lang Mor Night Market", rating: null, price: "฿", pnote: "夜市时段 17:00 后", hours: WEEK([S(D(17), D(22))]) },
    cmu:         { n: "清迈大学", q: "Chiang Mai University", rating: null, price: "฿", pnote: "校园免费参观", hours: WEEK(H24) },
    durian:      { n: "榴莲仙人（宁曼路）", q: "榴莲仙人 Durianism Chiang Mai Nimman", rating: 4.4, price: "฿฿", pnote: "榴莲冰淇淋必点 · 刷卡+3%", hours: null },
    eveandboy:   { n: "eveandboy（玛雅商场 2 楼）", q: "eveandboy Maya Chiang Mai", rating: null, price: "฿฿", pnote: "泰妆扫货 · 随商场 10:00–22:00", hours: WEEK([S(D(10), D(22))]) },
    jjmarket:    { n: "Jing Jai 集市", q: "JingJai Market Chiang Mai", rating: 4.5, price: "฿฿", pnote: "周末早市 6:30–14:00 · 大多只收现金", hours: [[S(D(6, 30), D(14))], [S(D(8, 30), D(22))], [S(D(8, 30), D(22))], [S(D(8, 30), D(22))], [S(D(8, 30), D(22))], [S(D(8, 30), D(22))], [S(D(6, 30), D(14))]] },
    sunday:      { n: "周日步行街（塔佩门）", q: "Sunday Walking Street Tha Phae Gate Chiang Mai", rating: null, price: "฿", pnote: "每周日 16:00–22:00", hours: [[S(D(16), D(22))], [], [], [], [], [], []] },
    onenimman:   { n: "One Nimman 商场", q: "One Nimman Chiang Mai", rating: null, price: null, pnote: "宁曼路地标", hours: null },
    cnx_airport: { n: "清迈国际机场", q: "Chiang Mai International Airport", rating: null, price: null, pnote: "距宁曼约 15–20 分钟车程", hours: WEEK(H24) },
    cheva:       { n: "Cheva & Chavee 甜甜圈", q: "Cheva & Chavee Chiang Mai", rating: 4.7, price: "฿", pnote: "北海道牛奶甜甜圈 · 4 个约 80฿ · 外带为主", hours: WEEK([S(D(11), D(19))]) },
    ancientbeef: { n: "Ancient Beef 古法牛肉泰餐", q: "Ancient Beef Thai Cuisine Chiang Mai", rating: 4.4, price: "฿฿", pnote: "牛腿饭/牛舌 · 周一休 · 17:30 后易满座", hours: [[S(D(9), D(18, 30))], [], [S(D(9), D(18, 30))], [S(D(9), D(18, 30))], [S(D(9), D(18, 30))], [S(D(9), D(18, 30))], [S(D(9), D(18, 30))]] },
  },

  /* ---------- 天气 ---------- */
  cities: {
    bkk: { key: "bkk", name: "曼谷 Bangkok",   lat: 13.7563, lon: 100.5018 },
    cnx: { key: "cnx", name: "清迈 Chiang Mai", lat: 18.7883, lon: 98.9853 },
  },
  weatherDates: [
    { d: "9/29", w: "周二" },
    { d: "9/30", w: "周三" },
    { d: "10/1", w: "周四" },
    { d: "10/2", w: "周五" },
    { d: "10/3", w: "周六" },
    { d: "10/4", w: "周日" },
    { d: "10/5", w: "周一" },
  ],
  weatherWhere: ["曼谷", "曼谷", "清迈", "清迈", "清迈", "清迈", "返程"],
  // 离线兜底数据（2026-09-25 抓取），页面会优先请求实时预报
  weatherFallback: {
    bkk: {
      current: { t: 24.8, code: 53 },
      tmax: [29.6, 31.1, 32.7, 32.1, 30.2, 31.4, 32.0],
      tmin: [25.0, 25.4, 24.7, 25.5, 25.4, 25.6, 25.6],
      precip: [69, 84, 76, 92, 80, 65, 78],
      codes: [95, 51, 95, 96, 95, 95, 51],
    },
    cnx: {
      current: { t: 26.2, code: 2 },
      tmax: [25.2, 29.0, 30.7, 31.2, 29.7, 27.8, 29.4],
      tmin: [22.9, 23.2, 23.1, 23.3, 24.5, 23.9, 23.5],
      precip: [98, 88, 58, 69, 76, 85, 84],
      codes: [95, 95, 51, 3, 51, 95, 51],
    },
  },

  /* ---------- 航班 ---------- */
  flights: [
    { member: "我", date: "9月29日 周二", route: "上海 → 曼谷", time: "17:25 – 20:50",
      note: "起飞为北京时间，落地 20:50 为曼谷当地时间" },
    { member: "我", date: "10月5日 周一", route: "清迈 → 上海", time: "08:45 – 13:50",
      note: "起飞为清迈当地时间，抵达 13:50 为北京时间" },
    { member: "小鱼茄子", pending: true },
    { member: "小笼包",   pending: true },
    { member: "小姐夫",   pending: true },
    { member: "椰子壳",   pending: true },
    { member: "张阳阳",   pending: true },
    { member: "豆豆",     pending: true },
  ],

  /* ---------- 酒店 ---------- */
  hotels: [
    {
      city: "曼谷", emoji: "🏨", place: "hotel_bkk",
      name: "Montraj Continent Sukhumvit Bangkok",
      addr: "413 Sukhumvit Road（素坤逸 21/23 巷之间）, Klongtoey Nua, Watthana, Bangkok 10110",
      tel: "+66 2 686 7000",
      checkin: "9月29日（周二）14:00 后",
      checkout: "9月30日（周三）14:00 前",
      nights: "1 晚",
      rooms: "2 间 Continent Twin 双床房",
      meals: "不含早餐",
      notes: [
        "紧邻 MRT 素坤逸站 / BTS Asok 站，步行约 5–8 分钟",
        "订单含延迟退房至 14:00 礼遇 ✓",
        "6 人 4 床：如需加床，请提前邮件酒店确认",
      ],
    },
    {
      city: "清迈", emoji: "🏨", place: "hotel_cnx",
      name: "Novotel Chiangmai Nimman Journeyhub",
      addr: "7/77 Huay Kaew Rd, Chang Phueak, Chiang Mai 50300",
      tel: "+66 52 012 777",
      checkin: "10月1日（周四）14:00 后",
      checkout: "10月5日（周一）12:00 前",
      nights: "4 晚",
      rooms: "2 间 Superior Twin 双床房（带阳台）",
      meals: "不含早餐",
      notes: [
        "宁曼路 × Huay Kaew 路口，玛雅商场旁，觅食购物超方便",
        "距清迈火车站 / 清迈机场均约 15–20 分钟车程",
        "6 人 4 床：如需加床，请提前邮件酒店确认",
      ],
    },
  ],

  /* ---------- 红丝绒火车时间表 ---------- */
  trainTt: [
    { t: "14:00–15:00", e: "🧳", ti: "酒店退房 · 大堂稍作休整",
      de: "订单含延迟退房至 14:00 ✓ · 行李随行（车站有寄存处）", place: "hotel_bkk" },
    { t: "15:00", e: "🚶", ti: "从酒店出发 · 步行至 MRT 素坤逸站",
      de: "约 5–8 分钟", tag: "地铁方案", place: "mrt_sukhumvit" },
    { t: "15:10", e: "🚇", ti: "蓝线直达 Bang Sue（11 站）",
      de: "约 35–40 分钟 · 无需换乘 · 完全不受堵车影响", tag: "地铁方案" },
    { t: "15:50", e: "🚉", ti: "抵达阿披瓦中央车站",
      de: "下车即车站 · 可先寄存行李", tag: "候车", place: "aphiwat" },
    { t: "15:50–17:45", e: "🛋️", ti: "车站休整 · 打包晚餐",
      de: "车站内餐饮/便利店解决晚餐，或上车后到餐车点餐 · 近 2 小时缓冲，从容不迫", tag: "候车" },
    { t: "17:45", e: "🎫", ti: "进站候车完毕 · 找 9 次列车站台",
      de: "官方建议提前 30 分钟以上到站，我们留足 1 小时", tag: "候车" },
    { t: "18:40", e: "🚂", ti: "红丝绒夜火车发车",
      de: "卧铺过夜 · 车厢空调冷，外套随身", tag: "发车" },
    { t: "次日 07:15", e: "🌄", ti: "抵达清迈站",
      de: "Grab 约 15–20 分钟到宁曼酒店", tag: "抵达", place: "cnx_station" },
  ],

  /* ---------- 每日行程 ---------- */
  days: [
    {
      d: "9月29日", w: "周二", city: "曼谷", key: "bkk", emoji: "✈️",
      title: "出发日 · 落地曼谷", ov: "出发日 · 上海 → 曼谷",
      items: [
        { t: "17:25–20:50", e: "✈️", ti: "上海 → 曼谷",
          de: "「我」的航班（其余 5 位成员的航班待补充）· 20:50 为曼谷当地时间", tags: ["交通"], place: "bkk_airport" },
        { t: "21:30", e: "🛃", ti: "落地 · 出关取行李",
          de: "出关约 30–60 分钟，队伍长度看运气", tags: [] },
        { t: "22:00–22:30", e: "🏨", ti: "抵达酒店入住",
          de: "打车约 40–60 分钟；今晚曼谷雷阵雨概率较高，提前装好 Grab / Bolt。14:00 后即可入住", tags: ["住宿"], place: "hotel_bkk" },
        { t: "深夜", e: "🏪", ti: "酒店周边觅食",
          de: "素坤逸路边摊 / 7-11 补货，早点休息养精蓄锐", tags: ["美食"] },
      ],
    },
    {
      d: "9月30日", w: "周三", city: "曼谷", key: "bkk", emoji: "🏙️",
      title: "1981 古着 · 红丝绒夜火车", ov: "1981 古着 · 红丝绒夜火车",
      items: [
        { t: "09:30", e: "☕", ti: "自然醒 + 早餐",
          de: "酒店不含早，楼下咖啡店 / 7-11 解决", tags: [] },
        { t: "10:15", e: "🚕", ti: "打车出发 → 1981 Soul & Sold",
          de: "酒店 → 蓝甘杏路 15 巷约 14–18 公里，非高峰 30–45 分钟", tags: ["交通"] },
        { t: "11:00–13:00", e: "👗", ti: "1981 Soul & Sold 复古商场",
          de: "2026 年新开的古着圣地（原 The Mall Ramkhamhaeng 改造）：5 层古着、黑胶、古玩 + 150+ 摊位的 Gourmet Market 美食广场（12:00 前在楼内解决午餐）", tags: ["购物", "美食"], place: "s1981" },
        { t: "13:00", e: "🚕", ti: "打车返回酒店",
          de: "约 35–50 分钟（午间小高峰），13:50 前回到酒店", tags: ["交通"] },
        { t: "14:00–15:00", e: "🧳", ti: "退房 · 稍作休整后出发",
          de: "订单含延迟退房至 14:00 ✓；15:00 出发，之后按「红丝绒火车」时间表走（地铁直达，全程约 40 分钟）", tags: ["交通"], place: "hotel_bkk" },
        { t: "18:40", e: "🚂", ti: "红丝绒夜火车发车",
          de: "卧铺过夜 · 次日 07:15 到清迈 · 车厢冷，外套随身", tags: ["交通"] },
        { t: "备选", e: "🛍️", ti: "不想打车折腾？上午二选一",
          de: "A：Terminal 21 商场（酒店旁，10:00 开门，Pier 21 美食广场便宜好吃）｜B：大皇宫/卧佛寺半日（MRT 到 Sanam Chai 约 30 分钟，13:00 前返程）", tags: ["可选"], place: "t21", place2: "palace", place3: "watpho" },
      ],
    },
    {
      d: "10月1日", w: "周四", city: "清迈", key: "cnx", emoji: "🌇",
      title: "抵达清迈 · 古城悠闲半日", ov: "抵达清迈 · 按摩 + PARI 晚餐",
      items: [
        { t: "07:15", e: "🚂", ti: "火车抵达清迈站",
          de: "Grab / 出租车约 15–20 分钟到宁曼酒店", tags: ["交通"], place: "cnx_station" },
        { t: "08:00–11:30", e: "💤", ti: "寄存行李 · 补觉",
          de: "Novotel 入住时间 14:00 后，先寄存行李，周边吃早餐、回笼觉", tags: ["住宿"], place: "hotel_cnx" },
        { t: "12:00–13:30", e: "🍜", ti: "宁曼路午餐",
          de: "随意走走吃吃，推荐泰北咖喱面 Khao Soi", tags: ["美食"] },
        { t: "13:30–15:00", e: "🚶", ti: "宁曼路扫街（同片区步行串联）",
          de: "Lot of Taste 下午茶 → 榴莲仙人 → Cheva & Chavee 甜甜圈（约 1.2 公里步行串联，中途不回酒店）", tags: ["美食"], place: "lot", place2: "durian", place3: "cheva" },
        { t: "15:00–15:45", e: "🛁", ti: "回酒店洗漱换装",
          de: "办理入住，为晚上的 PARI 晚餐换装（换好再出发，避免宁曼古城来回跑）", tags: ["住宿"] },
        { t: "16:00", e: "🚕", ti: "打车去古城（约 10 分钟）",
          de: "下午到晚上都在古城片区活动", tags: ["交通"] },
        { t: "16:30–18:00", e: "💆", ti: "Relax Express 按摩（古城塔佩门）",
          de: "10:00–24:00 · 舟车劳顿后回血 · 建议提前 1 天在 Klook 预约", tags: ["提前预约"], place: "relax" },
        { t: "18:00–19:45", e: "🌇", ti: "古城黄昏散步",
          de: "从塔佩门沿古城主路慢慢逛到帕辛寺方向（约 1.2 公里），19:45 前到 PARI", tags: ["可选"] },
        { t: "20:00", e: "🍽️", ti: "PARI- 晚餐（已订 8 点）",
          de: "古城三兰路（帕辛寺旁）· 米其林指南日式居酒屋", tags: ["已预订", "美食"], place: "pari" },
        { t: "22:00", e: "🌙", ti: "打车回酒店休息",
          de: "晚安清迈", tags: [] },
      ],
    },
    {
      d: "10月2日", w: "周五", city: "清迈", key: "cnx", emoji: "🍳",
      title: "奶奶厨房 · Oasis Spa", ov: "奶奶厨房 · Oasis Spa",
      items: [
        { t: "08:30", e: "🚐", ti: "烹饪学校接车",
          de: "以学校确认的接送时间为准", tags: ["已预订"], place: "grandma" },
        { t: "09:00–14:00", e: "👵", ti: "奶奶厨房烹饪学校",
          de: "市场参观 + 有机农场 + 亲手做 3 道菜当午餐（含接送，有中文老师）", tags: ["已预订"] },
        { t: "14:30–15:30", e: "💤", ti: "回酒店休息",
          de: "消化一下自己做的午餐", tags: [] },
        { t: "16:00–18:30", e: "🧖", ti: "Oasis Spa（已订）",
          de: "以预约单为准；宁曼店步行可达，兰纳店（古城）打车约 10 分钟", tags: ["已预订"], place: "oasis" },
        { t: "19:00–20:30", e: "🍢", ti: "晚餐 Pum Deng 麻辣烫·关东煮",
          de: "玛雅北侧 Jed Yod 区，酒店打车约 8 分钟（17:30–24:00）· 麻辣烫 + 关东煮 + 烤串", tags: ["美食"], place: "pumdeng" },
        { t: "21:00", e: "🌙", ti: "回酒店休息",
          de: "若 Spa 订的是古城兰纳店，晚餐可改古城街边小吃，回宁曼再补夜宵", tags: [] },
      ],
    },
    {
      d: "10月3日", w: "周六", city: "清迈", key: "cnx", emoji: "☕",
      title: "咖啡农场之旅 · 后门夜市", ov: "咖啡农场之旅 · 后门夜市",
      items: [
        { t: "07:00", e: "🍞", ti: "起床 · 快速早餐",
          de: "农场之旅通常含酒店接送，出发前在酒店旁便利店/咖啡摊解决早餐", tags: [] },
        { t: "07:15–07:45", e: "🚐", ti: "接车出发（以凭证为准）",
          de: "Klook 咖啡农场之旅一般含市区接送，具体上车时间以凭证为准", tags: ["已预订", "交通"] },
        { t: "08:00–14:30", e: "☕", ti: "Coffee Farm Tour 咖啡农场之旅（已订 · Klook）",
          de: "从咖啡豆到一杯咖啡的完整体验：农场参观、采摘与处理工艺讲解、咖啡制作和品尝（可能含午餐，以凭证为准）。小程序凭证：#小程序://KLOOK客路/1WB2NLZQiOXeg0B（微信内打开）", tags: ["已预订"] },
        { t: "15:00–16:30", e: "🎓", ti: "清迈大学",
          de: "农场返程后顺路逛校园、静心湖、素贴路街区（宁曼向西北 Grab 约 10–15 分钟）；若返程延误可压缩此段", tags: [], place: "cmu" },
        { t: "16:30–20:00", e: "🌶️", ti: "后门夜市美食连击",
          de: "① Kaprao Nueanuea 打抛饭（17:00 开门，7-11 对面红摊，招牌双鸭蛋，建议 16:30 先排队）② Hoyolo MALA 麻辣烫 ③ 夜市炸土豆 ④ 边排边逛扫街", tags: ["美食"], place: "kaprao", place2: "hoyolo", place3: "potato" },
        { t: "20:30", e: "🛍️", ti: "回宁曼散步消食 · 顺路扫货",
          de: "One Nimman + 玛雅商场 eveandboy（都在酒店路口，步行即达，零绕路）", tags: ["可选", "购物"], place: "onenimman", place2: "eveandboy" },
      ],
    },
    {
      d: "10月4日", w: "周日", city: "清迈", key: "cnx", emoji: "🧺",
      title: "市场日 · 购物扫尾", ov: "Jing Jai 集市 · 周日步行街",
      items: [
        { t: "07:00", e: "🚗", ti: "出发去 JJ Market",
          de: "宁曼打车约 10–15 分钟 · 早去人少、面包最全", tags: [] },
        { t: "07:15–11:30", e: "🧺", ti: "Jing Jai 集市",
          de: "清迈最出圈的周末早市（周日 6:30 起）· 手作、有机农产品、咖啡、北泰小吃 · 大多摊位只收现金，备好零钱", tags: ["购物"], place: "jjmarket" },
        { t: "12:00–13:30", e: "🦐", ti: "午餐 Chef Den Seafood",
          de: "就在 JJ 集市旁，步行约 550 米 ★ 若当日休店（周日休店说法不一，建议提前电话确认）：备选 ①JJ 市集摊位 ②打车约 12 分钟去长康路 Ancient Beef 古法牛肉饭（周日营业）", tags: ["美食"], place: "chefden", place2: "ancientbeef" },
        { t: "13:30–16:30", e: "💤", ti: "回酒店午休 · 自由活动",
          de: "雨季午后雷阵雨概率高，回酒店躲雨休息；备选：玛雅商场补货（酒店路口，步行即达）", tags: [] },
        { t: "17:00–21:00", e: "🌆", ti: "周日步行街",
          de: "塔佩门 Sunday Walking Street（16:00–22:00）· 手信最后冲刺", tags: ["购物"], place: "sunday" },
        { t: "21:30", e: "🎒", ti: "回酒店打包",
          de: "明早班机，行李提前收好", tags: [] },
      ],
    },
    {
      d: "10月5日", w: "周一", city: "返程", key: "none", emoji: "✈️",
      title: "返程日", ov: "返程 · 清迈 → 上海",
      items: [
        { t: "06:00", e: "⏰", ti: "起床",
          de: "收拾最后的小物件", tags: [] },
        { t: "06:15", e: "🚕", ti: "出发去机场",
          de: "宁曼 → 清迈机场约 15–20 分钟", tags: ["交通"], place: "cnx_airport" },
        { t: "06:35", e: "🛂", ti: "到机场值机",
          de: "国际航班提前 2 小时 ✓", tags: [] },
        { t: "08:45–13:50", e: "✈️", ti: "清迈 → 上海",
          de: "「我」的返程航班（其余成员航班待补充）· 13:50 为北京时间", tags: ["交通"] },
      ],
    },
  ],

  /* ---------- 美食与购物清单 ---------- */
  foods: [
    { e: "🍛", n: "Kaprao Nueanuea 打抛饭", area: "清迈大学后门夜市（创始店）", when: "10/3 晚餐",
      note: "打抛天花板 · 招牌双鸭蛋拌饭 · 17:00–22:00 · 7-11 对面红摊", place: "kaprao",
      link: "https://www.xiaohongshu.com/discovery/item/69772b52000000001a02b784?xsec_token=CBF-si3pBSSBfsB9DFp-7lzH1QjvJZjEVD9ZN7xCzvyQk%3D&xsec_source=app_share&type=normal",
      linkT: "小红书攻略" },
    { e: "🌶️", n: "Hoyolo MALA CMU 麻辣烫", area: "清迈大学后门", when: "10/3 晚餐",
      note: "「后门麻辣烫绝了」· 11:00–23:00", place: "hoyolo",
      link: "https://www.xiaohongshu.com/discovery/item/6a991d17000000002b012a75?xsec_token=CBoZLEtt4EKoEHAqBhSJY9N7o7hMep3auM_QNxv_dxnklk%3D&xsec_source=app_share&type=normal",
      linkT: "小红书攻略" },
    { e: "🥔", n: "后门夜市炸土豆", area: "清迈大学后门夜市", when: "10/3 小吃",
      note: "「我不允许你们没吃过」· 夜市时段 17:00 后", place: "potato",
      link: "https://www.xiaohongshu.com/discovery/item/63ca25c8000000001f00d23a?app_platform=ios&app_version=9.48&share_from_user_hidden=true&xsec_source=app_share&type=normal&xsec_token=CBOohDsZCQsiBEB9u__A7YMPo9PDZlbkxXHWv4yyGdDPo=&author_share=1&xhsshare=WeixinSession&shareRedId=N0kyQ0hLOD42NzUyOTgwNjY4OTdGPEc5&apptime=1790328822&share_id=02a18a9d4a49405dac705c85655ea60b&track_code=A9Y7q9VJ2yO&wechatWid=2d96abaa784a50bc712b799db216c0e4&wechatOrigin=menu",
      linkT: "小红书攻略" },
    { e: "🍢", n: "Pum Deng Mala", area: "玛雅北侧 · Jed Yod 路", when: "10/2 晚餐",
      note: "麻辣烫 + 关东煮 + 烤串 · 17:30–24:00", place: "pumdeng",
      link: "https://jietravelblog.com/pumdeng-mala-odeng-food-chiangmai/",
      linkT: "攻略" },
    { e: "☕", n: "Lot of Taste", area: "宁曼路", when: "10/1 下午茶",
      note: "招牌 Soft Latte + 冰淇淋 · 08:00–22:00", place: "lot",
      link: "https://www.google.com/maps/search/Lot+of+Taste+Nimman+Chiang+Mai",
      linkT: "地图" },
    { e: "🍽️", n: "PARI-", area: "古城三兰路", when: "10/1 20:00 · 已订",
      note: "米其林指南日式居酒屋 · 番茄盐 / 玉米炒饭 / 炭火烤鸡", place: "pari",
      link: "https://www.google.com/maps/search/PARI+Chiang+Mai",
      linkT: "地图" },
    { e: "🦐", n: "Chef Den Seafood", area: "城北 · JJ 集市旁（步行约 550 米）", when: "10/4 午餐",
      note: "人气海鲜排档 · 咖喱软壳蟹 / 咸蛋黄鱿鱼 · 周日休店说法不一，建议电话确认", place: "chefden",
      link: "https://www.google.com/maps/place/Chef+Den+Seafood/@0,0,21z/data=!4m6!3m5!1s0x30da3b25b6df9597:0x10fd927c8a37235!8m2!3d18.8054896!4d98.9901087!16s%2Fg%2F11q1t0kdy4?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D",
      linkT: "地图" },
    { e: "🍦", n: "榴莲仙人", area: "宁曼路", when: "10/1 下午",
      note: "榴莲专门店 · 榴莲冰淇淋必点 · 攻略二选一", place: "durian",
      link: "https://www.xiaohongshu.com/discovery/item/6a9ee0340000000012002a14?app_platform=ios&app_version=9.48&share_from_user_hidden=true&xsec_source=app_share&type=normal&xsec_token=CBeBCEiCL7tsy8Wqt2PvULIsNinWdVzBeTds8s3_aqojY=&author_share=1&xhsshare=WeixinSession&shareRedId=N0kyQ0hLOD42NzUyOTgwNjY4OTdGPEc5&apptime=1790330211&share_id=306d8d1c44784d209be07f7760f256a0&track_code=1QxFSytdyUd&wechatWid=2d96abaa784a50bc712b799db216c0e4&wechatOrigin=menu",
      linkT: "攻略①",
      link2: "https://www.xiaohongshu.com/discovery/item/6aa531e7000000000b0370c0?app_platform=ios&app_version=9.48&share_from_user_hidden=true&xsec_source=app_share&type=normal&xsec_token=CBRPFVN1nCnl2CYw52DPRrsVc-YrLp9VY9OVb6HKIOFWk=&author_share=1&xhsshare=WeixinSession&shareRedId=N0kyQ0hLOD42NzUyOTgwNjY4OTdGPEc5&apptime=1790330186&share_id=0e8f9d2c19bb4edc961cbe2682cadf9a&track_code=4H0TqHQay1Y&wechatWid=2d96abaa784a50bc712b799db216c0e4&wechatOrigin=menu",
      linkT2: "攻略②" },
    { e: "💄", n: "eveandboy", area: "玛雅商场 2 楼（酒店路口）", when: "10/3 晚上顺路",
      note: "泰妆扫货天堂 · 随商场 10:00–22:00", place: "eveandboy",
      link: "https://www.google.com/maps/search/eveandboy+Maya+Chiang+Mai",
      linkT: "地图" },
    { e: "👵", n: "奶奶厨房烹饪学校", area: "沙拉披区（含接送）", when: "10/2 已订",
      note: "09:00–14:00 · 市场 + 农场 + 做菜吃 · 有中文老师", place: "grandma",
      link: "https://you.ctrip.com/sight/saraphi122246/144548998.html",
      linkT: "详情" },
    { e: "💆", n: "Relax Express", area: "古城塔佩门", when: "10/1 下午",
      note: "10:00–24:00 · 建议提前 1 天 Klook 预约", place: "relax",
      link: "https://www.klook.cn/zh-CN/activity/101545-relax-express-chiang-mai-thailand/",
      linkT: "Klook" },
    { e: "🧖", n: "Oasis Spa", area: "清迈多店（宁曼 / 兰纳等）", when: "10/2 已订",
      note: "以预约单为准", place: "oasis",
      link: "https://www.oasis-spa.com/",
      linkT: "官网" },
    { e: "👗", n: "1981 Soul & Sold", area: "曼谷 · 蓝甘杏路 15 巷", when: "9/30 上午",
      note: "2026 新开 5 层古着商场 · 11:00–22:00", place: "s1981",
      link: "https://www.timeout.com/bangkok/things-to-do/1981-soul-sold",
      linkT: "攻略" },
    { e: "🍩", n: "Cheva & Chavee", area: "宁曼 · Siri Mangkalajarn 13 巷", when: "10/1 下午（顺路）",
      note: "北海道牛奶甜甜圈，外带为主 · 4 个约 80฿ · 11:00–19:00", place: "cheva",
      link: "https://www.google.com/maps/search/Cheva+%26+Chavee+Chiang+Mai",
      linkT: "地图" },
    { e: "🥩", n: "Ancient Beef Thai Cuisine", area: "古城东侧 · 长康路（Night Bazaar 旁）", when: "10/4 午餐备选",
      note: "古法牛肉饭 · 招牌牛腿饭/牛舌 · 周二至周日 9:00–18:30 · 周一休", place: "ancientbeef",
      link: "https://www.google.com/maps/search/Ancient+Beef+Thai+Cuisine+Chiang+Mai",
      linkT: "地图" },
  ],
};
