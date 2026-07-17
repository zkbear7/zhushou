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

## 代码结构（v11·7.18 v7修订版）

- `DRAWER_SECTIONS[]`：侧边抽屉 9 个面板（v7全面更新）
  - 数学面板：依赖关系验证·顺序重排·880大章学完再刷
  - 828面板：12h/周·英语日晚间课后题·现控埃德加选看
  - 英语面板：每天1篇精读·13h/周提纯·两种模式
  - 政治面板：马原12讲✅·病后带刷积压追课
  - 进度自检：病后里程碑后移·考研12.19预测
  - 健身面板：🦠病后免练期
  - 周计划面板：v7全科路线·秋季课表预警
  - Tips面板：v7各科关键提醒汇总
- `WEEKLY_PLAN[]`：7.17修订版逐周计划（病后重排·秋季课表·现控路线）
- `NOTIFY_TIMES[]`：6 个定时通知
- `getPeriodInfo()`：经期检测（周期30天，cycleStart=7.2）
- `isIllnessNoGym()`：🦠生病免练检测（7.13-7.24）
- `isGymDay()`：二四六健身日（含经期+生病覆盖）
- `isSelfControlDay()`：二四六=自控日，三五日=英语日
- `isPoliticalClassDay()`：政治学习日（马原期✅+病后带刷追课期延至8.10）
- `getSchedule()`：v7作息（AUTOCTRL_GYM/AUTOCTRL_NOGYM/ENGLISH_DAY）
- `buildDailySubjectCard()`：主页今日每科任务卡片
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图
- SW缓存版本：v11

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → `DRAWER_SECTIONS[]` 数组（~line 670）
- 修改周计划 → `WEEKLY_PLAN[]` 数组（~line 907）
- 修改通知时间 → `NOTIFY_TIMES[]` 数组（~line 1450）
- 修改经期参数 → `getPeriodInfo()` 函数
- 修改政治带刷日期 → `isPoliticalClassDay()` 函数
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add . && git commit -m "..." && git push`
