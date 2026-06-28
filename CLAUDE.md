# 考研助手网站 · 项目上下文

## 部署

- 仓库：`github.com/zkbear7/zhushou`
- 入口：`https://zkbear7.github.io/zhushou/`
- 推送：`git push`（已设 upstream，直接推即可）
- 技术：GitHub Pages + 单文件 PWA

## 文件结构

```
F:\考研\考研助手网站\
├── index.html      # 主文件（单文件PWA，~1446行）
├── sw.js           # Service Worker（离线缓存）
├── manifest.json   # PWA 清单
└── README.md
```

## 设计参数

- 色系：暖白 `#fdf8f4` + 莫兰迪（绿 `#a3b899` / 玫瑰 `#c8a8a8` / 紫 `#b8b0c8` / 琥珀 `#d4b896`）
- 强调色：`#c4a882`（卡其金）
- 字体：霞鹜文楷 Screen（CDN: `lxgw-wenkai-screen-webfont`）
- 圆角：卡片 `14px`，小元素 `10px`
- 阴影：`0 2px 12px rgba(61,57,41,0.06)`

## 代码结构

- `PANELS[]` 数组：侧边抽屉 8 个面板（HTML 内联）
- `WEEKLY_PLAN[]` 数组：2026.7.1 起的逐周四科任务
- `getCurrentWeekPlan()`：按日期匹配当前周
- `buildWeekCardHTML()`：渲染当周任务卡片
- 时段判断逻辑：`TIME_SLOTS` + 自动显示当前应做任务
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图
- 通知：浏览器 Notification API（09:00/11:00健身日/14:00/20:00）

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → 找 `PANELS[]` 数组
- 修改周计划 → 找 `WEEKLY_PLAN[]` 数组
- 修改时间表 → 找 `TIME_SLOTS` 相关逻辑
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add index.html && git commit -m "..." && git push`
