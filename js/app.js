/* ============================================================
   国庆泰一下 · 页面逻辑
   天气（Open-Meteo 免费 API）+ 倒计时 + 内容渲染
   地点卡片：评分/均价快照 + 按泰国当地时间实时计算的营业状态，
   点击跳转该地点的谷歌地图搜索页
   ============================================================ */

(function () {
  "use strict";

  const T = window.TRIP;
  const $ = (sel) => document.querySelector(sel);

  /* ---------- WMO 天气代码 → 中文/图标 ---------- */
  const WMO = {
    0:  ["晴", "☀️"], 1: ["大致晴", "🌤"], 2: ["多云", "⛅"], 3: ["阴", "☁️"],
    45: ["雾", "🌫"], 48: ["雾凇", "🌫"],
    51: ["毛毛雨", "🌦"], 53: ["毛毛雨", "🌦"], 55: ["毛毛雨", "🌦"],
    61: ["小雨", "🌧"], 63: ["中雨", "🌧"], 65: ["大雨", "🌧"],
    80: ["阵雨", "🌦"], 81: ["阵雨", "🌦"], 82: ["强阵雨", "🌧"],
    95: ["雷阵雨", "⛈"], 96: ["雷暴", "⛈"], 99: ["强雷暴", "⛈"],
  };
  const wmo = (c) => WMO[c] || ["未知", "🌡"];

  /* ---------- 标签 → 样式 ---------- */
  const TAG_CLASS = {
    "已预订": "chip-booked",
    "美食": "chip-food",
    "购物": "chip-shop",
    "可选": "chip-opt",
    "提前预约": "chip-prebook",
    "住宿": "chip-stay",
    "交通": "chip-trans",
    "地铁方案": "chip-trans",
    "候车": "chip-trans",
    "发车": "chip-trans",
    "抵达": "chip-trans",
  };

  /* ---------- 泰国当地时间 ---------- */
  const BKK_PARTS = {};
  function bangkokNow() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Bangkok", hour12: false,
      weekday: "short", hour: "2-digit", minute: "2-digit",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t)?.value || "";
    return { wd: get("weekday"), h: +get("hour"), m: +get("minute") };
  }
  const WD = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  function fmtMin(x) {
    return `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}`;
  }

  /* ---------- 营业状态（按泰国当地时间实时计算） ---------- */
  function openStatus(p) {
    if (!p || !p.hours) return { cls: "st-unknown", txt: "营业时间以地图为准" };
    const now = bangkokNow();
    const segs = p.hours[WD[now.wd]] || [];
    if (!segs.length) return { cls: "st-closed", txt: "今日休市" };
    const mins = now.h * 60 + now.m;
    const is24 = segs.some(([o, c]) => c - o >= 1440);
    if (is24) return { cls: "st-open", txt: "24 小时" };
    for (const [o, c] of segs) {
      if (mins >= o && mins < c) {
        const left = c - mins;
        if (left <= 30) return { cls: "st-soon", txt: `${fmtMin(c)} 打烊` };
        return { cls: "st-open", txt: "营业中" };
      }
    }
    for (const [o] of segs) {
      if (mins < o) {
        if (o - mins <= 60) return { cls: "st-soon", txt: `${fmtMin(o)} 开门` };
        return { cls: "st-closed", txt: `${fmtMin(o)} 开门` };
      }
    }
    return { cls: "st-closed", txt: "已打烊" };
  }

  /* ---------- 地点卡片 ---------- */
  function mapsUrl(q) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }
  function placeCardHTML(id) {
    const p = T.places && T.places[id];
    if (!p) return "";
    const st = openStatus(p);
    const stars = p.rating != null ? `<b class="pc-stars">★ ${p.rating.toFixed(1)}</b>` : "";
    const price = p.price ? `<b class="pc-price">${p.price}</b>` : "";
    const pnote = p.pnote ? `<span class="pc-note">${p.pnote}</span>` : "";
    return `<a class="place-card" href="${mapsUrl(p.q)}" target="_blank" rel="noopener" title="点击在谷歌地图中查看 ${p.n}">
      <span class="pc-pin">📍</span>
      <span class="pc-body">
        <span class="pc-name">${p.n}</span>
        <span class="pc-meta">${stars}${price}${pnote}</span>
      </span>
      <span class="pc-status ${st.cls}">${st.txt}</span>
      <span class="pc-arrow">↗</span>
    </a>`;
  }
  function placeCardsHTML(...ids) {
    const cards = ids.filter(Boolean).map(placeCardHTML).filter(Boolean);
    return cards.length ? `<div class="place-row">${cards.join("")}</div>` : "";
  }

  /* ---------- 成员 ---------- */
  function renderMembers() {
    $("#members").innerHTML = T.members
      .map((m) => `<span class="member-chip"><span class="m-emoji">${m.emoji}</span>${m.name}</span>`)
      .join("");
  }

  /* ---------- 倒计时 ---------- */
  function renderCountdown() {
    const el = $("#countdown");
    const target = new Date(T.meta.depAt).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { el.innerHTML = "🎉 旅程进行中，玩得开心！"; return; }
      const d = Math.floor(diff / 864e5);
      const h = Math.floor((diff % 864e5) / 36e5);
      const m = Math.floor((diff % 36e5) / 6e4);
      const s = Math.floor((diff % 6e4) / 1e3);
      el.innerHTML = `⏳ 距出发还有 <b>${d}</b> 天 <b>${h}</b> 时 <b>${m}</b> 分 <b>${s}</b> 秒`;
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 天气 ---------- */
  async function fetchCity(city) {
    const c = T.cities[city];
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
      `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
      `&current=temperature_2m,weather_code&timezone=Asia%2FBangkok` +
      `&start_date=2026-09-29&end_date=2026-10-05`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      return null; // 走兜底数据
    } finally {
      clearTimeout(timer);
    }
  }

  function weatherPanelHTML(key, live) {
    const fb = T.weatherFallback[key];
    const isBkk = key === "bkk";
    const cls = isBkk ? "bkk" : "cnx";
    const cityName = T.cities[key].name;
    const whereCls = { "曼谷": "here-bkk", "清迈": "here-cnx" };

    let cur = fb.current, updated = "9/25 21:00 离线数据";
    let tmax = fb.tmax, tmin = fb.tmin, precip = fb.precip, codes = fb.codes;
    if (live && live.daily && live.current) {
      cur = live.current;
      updated = (live.current.time || "").replace("T", " ").slice(0, 16);
      tmax = live.daily.temperature_2m_max;
      tmin = live.daily.temperature_2m_min;
      precip = live.daily.precipitation_probability_max;
      codes = live.daily.weather_code;
    }

    const [curLabel, curEmoji] = wmo(cur.weather_code);
    const where = T.weatherWhere
      .map((w) => {
        const isHere = (w === "曼谷" && isBkk) || (w === "清迈" && !isBkk);
        return `<span class="${isHere ? whereCls[w] : ""}">${w}</span>`;
      })
      .join("");

    const days = T.weatherDates
      .map((d, i) => {
        const [label, emoji] = wmo(codes[i]);
        const p = precip[i];
        return `<div class="wp-day">
          <div class="d-label">${d.w}</div>
          <div class="d-date">${d.d}</div>
          <div class="d-emoji" title="${label}">${emoji}</div>
          <div class="d-temp">${Math.round(tmax[i])}° <small>/ ${Math.round(tmin[i])}°</small></div>
          <div class="d-rain" title="降水概率 ${p}%"><span class="bar"><i style="width:${p}%"></i></span>${p}%</div>
        </div>`;
      })
      .join("");

    return `<div class="weather-panel ${cls}">
      <div class="wp-head">
        <div class="wp-city">${cityName}<small>实时 ${Math.round(cur.temperature_2m)}°C</small></div>
        <div class="wp-now"><span class="now-emoji">${curEmoji}</span>${curLabel} · ${Math.round(cur.temperature_2m)}°C</div>
      </div>
      <div class="wp-where">${where}</div>
      <div class="wp-days">${days}</div>
      <div class="weather-foot"><span>预报更新：${updated}</span><span>高/低温 + 降水概率 · Open-Meteo</span></div>
    </div>`;
  }

  async function renderWeather() {
    const box = $("#weather-strip");
    const [bkk, cnx] = await Promise.all([fetchCity("bkk"), fetchCity("cnx")]);
    box.innerHTML = weatherPanelHTML("bkk", bkk) + weatherPanelHTML("cnx", cnx);
  }

  /* ---------- 红丝绒火车时间表 ---------- */
  function renderTrainTt() {
    $("#tt").innerHTML = T.trainTt
      .map((r) => `<div class="tt-row">
        <div class="tt-time">${r.t}</div>
        <div class="tt-body">
          <div class="tt-title">${r.e} ${r.ti}${r.tag ? ` <span class="chip ${TAG_CLASS[r.tag] || ""}">${r.tag}</span>` : ""}</div>
          <div class="tt-desc">${r.de}</div>
          ${placeCardsHTML(r.place)}
        </div>
      </div>`)
      .join("");
  }

  /* ---------- 行程总览（点击卡片跳转每日行程） ---------- */
  function renderOverview() {
    const el = $("#overview-grid") || $(".overview");
    if (!el) return;
    el.innerHTML = T.days
      .map((day, i) => `<a class="ov-item ${day.key}" href="#day-${i}">
        <span class="ov-date">${day.d} ${day.w}</span>
        <span class="ov-emoji">${day.emoji}</span>
        <span class="ov-txt">${day.ov}</span>
        <span class="ov-jump">点击直达当日行程 ↘</span>
      </a>`)
      .join("");
  }

  /* ---------- 每日行程 ---------- */
  function renderDays() {
    $("#days-list").innerHTML = T.days
      .map((day, i) => {
        const items = day.items
          .map((it) => `<div class="day-item">
            <div class="di-time">${it.t}</div>
            <div class="di-body">
              <div class="di-title">${it.e} ${it.ti}${it.tags.map((tg) => ` <span class="chip ${TAG_CLASS[tg] || ""}">${tg}</span>`).join("")}</div>
              <div class="di-desc">${it.de}</div>
              ${placeCardsHTML(it.place, it.place2, it.place3)}
            </div>
          </div>`)
          .join("");
        const cityCls = day.key === "bkk" ? "bkk" : day.key === "cnx" ? "cnx" : "";
        const cityTagCls = day.key === "none" ? "none" : "";
        return `<div class="day-card ${cityCls}" id="day-${i}">
          <div class="day-head">
            <div class="day-badge"><span class="b-emoji">${day.emoji}</span><span class="b-day">${day.d}</span></div>
            <div class="day-head-text">
              <div class="day-title">${day.title}</div>
              <div class="day-sub">${day.d} ${day.w}</div>
            </div>
            <span class="city-tag ${cityTagCls}">${day.city}</span>
          </div>
          <div class="day-items">${items}</div>
        </div>`;
      })
      .join("");
  }

  /* ---------- 航班 ---------- */
  function renderFlights() {
    const rows = T.flights
      .map((f) => {
        if (f.pending) {
          return `<tr class="pending"><td class="f-member">${f.member}</td><td colspan="4" class="f-pending">✈️ 航班待补充</td></tr>`;
        }
        return `<tr>
          <td class="f-member">${f.member}</td>
          <td>${f.date}</td>
          <td>${f.route}</td>
          <td class="f-time">${f.time}</td>
          <td class="f-note">${f.note}</td>
        </tr>`;
      })
      .join("");
    $("#flights-box").innerHTML = `<div class="table-scroll"><table class="flights-table">
      <thead><tr><th>成员</th><th>日期</th><th>航线</th><th>时间</th><th>备注</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
  }

  /* ---------- 酒店 ---------- */
  function renderHotels() {
    $("#hotels-box").innerHTML = T.hotels
      .map((h) => `<div class="hotel-card ${h.city === "清迈" ? "cnx" : ""}">
        <div class="hotel-head">
          <div class="hotel-city">${h.emoji} ${h.city} · ${h.nights}</div>
          <div class="hotel-name">${h.name}</div>
          <div class="hotel-addr">${h.addr}</div>
        </div>
        <div class="hotel-facts">
          <div class="hf"><b>入住</b>${h.checkin}</div>
          <div class="hf"><b>退房</b>${h.checkout}</div>
          <div class="hf"><b>房型</b>${h.rooms}</div>
          <div class="hf"><b>早餐</b>${h.meals}</div>
        </div>
        <ul class="hotel-notes">${h.notes.map((n) => `<li>${n}</li>`).join("")}</ul>
        <div class="hotel-maps">${placeCardHTML(h.place)}</div>
      </div>`)
      .join("");
  }

  /* ---------- 美食清单 ---------- */
  function renderFoods() {
    $("#food-grid").innerHTML = T.foods
      .map((f) => {
        const link2 = f.link2 ? `<a href="${f.link2}" target="_blank" rel="noopener">${f.linkT2}</a>` : "";
        return `<div class="food-card">
          <div class="food-top"><span class="food-emoji">${f.e}</span><span class="food-name">${f.n}</span></div>
          <div class="food-area">📍 ${f.area}</div>
          <span class="food-when">🗓 ${f.when}</span>
          <p class="food-note">${f.note}</p>
          ${placeCardHTML(f.place)}
          <div class="food-links"><a href="${f.link}" target="_blank" rel="noopener">${f.linkT}</a>${link2}</div>
        </div>`;
      })
      .join("");
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    // 每个板块独立 try/catch：任一板块出错不影响其他板块
    const safe = (fn) => { try { fn(); } catch (e) { console.error("[render]", fn.name, e); } };
    safe(renderMembers);
    safe(renderCountdown);
    safe(renderOverview);
    safe(renderTrainTt);
    safe(renderDays);
    safe(renderFlights);
    safe(renderHotels);
    safe(renderFoods);
    safe(renderWeather);
    // 每分钟刷新一次营业状态
    setInterval(() => {
      safe(renderTrainTt); safe(renderDays); safe(renderFoods); safe(renderHotels);
    }, 60000);
  });
})();
