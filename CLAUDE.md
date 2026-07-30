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
├── index.html      # 主文件（单文件PWA，~1600+行）
├── sw.js           # Service Worker（离线缓存，v8）
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

## 代码结构（v13·7.30 线代晚间固定+110分知识点分级）

- `DRAWER_SECTIONS[]`：侧边抽屉 9 个面板（v13全面更新）
  - 数学面板：110分知识点分级(必抓/可弱/可弃)·证明类全弃·傅里叶可弃·线代晚间固定·暑假排期减量
  - 828面板：10h/周·自控日13:00-16:00纯块3h·英语日晚间30min·阿祖砍掉·777替代
  - 英语面板：v13·英语日13:00-16:00纯块3h·翻译砍掉·自控日超轻量30min
  - 政治面板：马原12讲✅·带刷隔天二四日19:30-20:00
  - 进度自检：v13四科里程碑·线代+概率时间线·考研12.19预测
  - 健身面板：居家弹力带隔天二四六(35min)
  - 周计划面板：v13全科路线·线代晚间固定·下午纯块·秋季课表预警
  - Tips面板：v13四大块作息·110分策略·证明类全弃汇总
- `WEEKLY_PLAN[]`：v13逐周计划（线代正式启动·李永乐8.3起·概率9月中）
- `AUTOCTRL_DAY[]`：自控日(二四六)·09:50高数→13:00-16:00自控纯块→18:30线代
- `ENGLISH_DAY[]`：英语日(三五日)·09:20高数→13:00-16:00英语纯块→18:30线代
- `NOTIFY_TIMES[]`：6个定时通知（21:00扇贝已取消）
- `getPeriodInfo()`：经期检测（周期30天，cycleStart=7.2）
- `isHomeWorkoutDay()`：二四六弹力带日（含经期覆盖）
- `isSelfControlDay()`：二四六=自控日，三五日=英语日
- `isPoliticalClassDay()`：政治学习日（马原✅+带刷隔天二四日·7.22-8.24+9月起每天）
- `getSchedule()`：v13作息（9点起·四大块·线代18:30固定·下午纯块）
- `buildDailySubjectCard()`：主页今日每科任务卡片（v13·含线代固定）
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图
- SW缓存版本：v17（7.30 v13线代晚间固定+110分知识点分级）

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → `DRAWER_SECTIONS[]` 数组（~line 670）
- 修改周计划 → `WEEKLY_PLAN[]` 数组（~line 907）
- 修改通知时间 → `NOTIFY_TIMES[]` 数组（~line 1450）
- 修改经期参数 → `getPeriodInfo()` 函数
- 修改政治带刷日期 → `isPoliticalClassDay()` 函数
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add . && git commit -m "..." && git push`
