# 考研助手网站 · 项目上下文

## 部署

- 仓库：`github.com/zkbear7/zhushou`
- 入口：`https://zkbear7.github.io/zhushou/`
- 推送：`cd "F:/考研/考研助手网站" && git push`
- 技术：GitHub Pages + 单文件 PWA
- 刷新：推送后 **Ctrl+Shift+R**（PWA 缓存旧版需强制刷新）

## 文件结构

```
F:\考研\考研助手网站\
├── index.html      # 主文件（单文件PWA，~1500+行）
├── sw.js           # Service Worker（离线缓存，v2）
├── manifest.json   # PWA 清单
├── README.md
└── CLAUDE.md       # 本文件
```

## 设计参数

- 色系：暖白 `#fdf8f4` + 莫兰迪（绿 `#a3b899` / 玫瑰 `#c8a8a8` / 紫 `#b8b0c8` / 琥珀 `#d4b896`）
- 强调色：`#c4a882`（卡其金）
- 字体：霞鹜文楷 Screen（CDN: `lxgw-wenkai-screen-webfont`）
- 圆角：卡片 `14px`，小元素 `10px`
- 阴影：`0 2px 12px rgba(61,57,41,0.06)`

## 代码结构

- `DRAWER_SECTIONS[]`：侧边抽屉 9 个面板（HTML 内联）
- `WEEKLY_PLAN[]`：2026.6.29 起的逐周四科任务
- `NOTIFY_TIMES[]`：5 个定时通知（09:00/11:00健身/14:00/19:25政治/20:00）
- `isPoliticalClassDay()`：判断是否为张修齐代练日
- `getPeriodInfo()`：经期检测（30天周期，前4天停健身）
- `isGymDay()`：健身日判断（含经期覆盖）
- `isRestDay()`：休息日判断（学6休1，周日）
- `getSchedule()`：根据日期+阶段+经期返回当天作息
- `sendNotification()`：SW + 直接通知双重 fallback
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图
- 阶段自适应：6月→7月高数强化→8月线代概率→9月+秋季

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → `DRAWER_SECTIONS[]` 数组（~line 643）
- 修改周计划 → `WEEKLY_PLAN[]` 数组（~line 888）
- 修改通知时间 → `NOTIFY_TIMES[]` 数组（~line 1349）
- 修改经期参数 → `getPeriodInfo()` 函数
- 修改政治代练日期 → `isPoliticalClassDay()` 函数
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add index.html && git commit -m "..." && git push`
