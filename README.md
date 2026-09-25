# 🚂 国庆泰一下 · 旅行计划站

曼谷 × 清迈 · 2026.9.29 – 10.5 · 六人同行

纯静态站点：HTML + CSS + 原生 JS，**零依赖、零构建、无任何密钥**。
天气数据来自 [Open-Meteo](https://open-meteo.com/) 免费 API（无需 API Key）。

## 目录结构

```
thailand-trip/
├── index.html        # 页面骨架（天气/总览/火车/行程/航班/酒店/美食/贴士）
├── css/style.css     # 设计系统
├── js/data.js        # ★ 所有行程内容在这里改（成员/航班/酒店/每日行程/美食）
└── js/app.js         # 渲染 + 天气请求 + 倒计时
```

## 修改内容

只需编辑 `js/data.js`：

- 新成员航班 → `flights` 里把对应成员的 `pending: true` 换成实际航班
- 调整行程 → 改 `days` / `trainTt`
- 补充美食 → 往 `foods` 加一条

## 本地预览

```bash
cd thailand-trip
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 发布到公网（GitHub Pages）

1. 新建 GitHub 仓库（如 `thailand-trip`），推送本目录：
   ```bash
   git init && git add . && git commit -m "init"
   git remote add origin git@github.com:<你的用户名>/thailand-trip.git
   git push -u origin main
   ```
2. 仓库 → Settings → Pages → Source 选 `main` 分支根目录 → Save。
3. 稍等 1 分钟，访问 `https://<你的用户名>.github.io/thailand-trip/`。

> 国内访问 GitHub Pages 偶尔不稳，也可用 Vercel / Netlify 导入仓库一键部署。

## 隐私约定

- ✅ 公开内容：酒店名、入住日期、行程、美食攻略链接
- ❌ 不上传：预订确认号、证件号、付款信息、预订单 PDF 原件
