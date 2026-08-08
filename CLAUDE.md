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
├── sw.js           # Service Worker（离线缓存，v19）
├── manifest.json   # PWA 清单
├── 数学一_110分考点画题筛选表.pdf  # 文档资料面板 PDF（新标签页查看）
├── 浙工大828_777刷题筛选清单.pdf   # 文档资料面板 PDF
├── 880_跳过清单.pdf                # 文档资料面板 PDF
├── README.md
└── CLAUDE.md       # 本文件
```

## 设计参数

- 色系：暖白 `#fdf8f4` + 莫兰迪（绿 `#a3b899` / 玫瑰 `#c8a8a8` / 紫 `#b8b0c8` / 琥珀 `#d4b896`）
- 强调色：`#c4a882`（卡其金）
- 字体：霞鹜文楷 Screen（CDN: `lxgw-wenkai-screen-webfont`）
- 圆角：卡片 `14px`，小元素 `10px`
- 阴影：`0 2px 12px rgba(61,57,41,0.06)`

## 代码结构（v15·8.8 新增文档资料面板）

- `DRAWER_SECTIONS[]`：侧边抽屉 10 个面板（8.8 新增📂文档资料面板）
  - 数学面板：**高数18讲+线代6讲+概率7章分级表**(卡片式·必抓/可弱/可弃)·三科基础→三科强化时间线·110分知识点分级总表·强化啃书为主
  - 828面板：10h/周·自控日13:00-16:00纯块3h·英语日晚间30min·阿祖砍掉·777替代
  - 英语面板：英语日13:00-16:00纯块3h·翻译砍掉·自控日超轻量30min（策略未变）
  - 政治面板：马原12讲✅·带刷隔天二四日19:30-20:00
  - 进度自检：v14四科里程碑·三门基础9.3全过完→三科强化→11月真题·考研12.19预测
  - 健身面板：居家弹力带隔天二四六(35min)
  - 周计划面板：v14全科路线·线代8.2-8.12例题全写·概率8.13接棒·强化三科并行
  - Tips面板：v14三科基础→强化·30讲分级·证明类全弃汇总
  - 📂 文档资料面板：3个PDF链接（`target="_blank"` 新标签页查看）·href 用 URL 编码中文文件名
- `WEEKLY_PLAN[]`：v14逐周计划（线代基础例题全写·概率8.13接棒·36讲/李永乐/余丙森强化篇并行）
- `AUTOCTRL_DAY[]`：自控日(二四六)·09:50高数→13:00-16:00自控纯块→18:30线代/概率
- `ENGLISH_DAY[]`：英语日(三五日)·09:20高数→13:00-16:00英语纯块→18:30线代/概率
- `NOTIFY_TIMES[]`：6个定时通知（18:30线代/概率·21:00扇贝已取消）
- `getPeriodInfo()`：经期检测（周期30天，cycleStart=7.2）
- `isHomeWorkoutDay()`：二四六弹力带日（含经期覆盖）
- `isSelfControlDay()`：二四六=自控日，三五日=英语日
- `isPoliticalClassDay()`：政治学习日（马原✅+带刷隔天二四日·7.22-8.24+9月起每天）
- `getSchedule()`：v14作息（9点起·四大块·线代/概率18:30固定·下午纯块）
- `buildDailySubjectCard()`：主页今日每科任务卡片（v14·含线代/概率固定）
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图
- SW缓存版本：v19（8.8 新增3个PDF离线缓存 + 文档资料面板）

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → `DRAWER_SECTIONS[]` 数组（~line 650）
- 修改周计划 → `WEEKLY_PLAN[]` 数组（~line 1045）
- 修改通知时间 → `NOTIFY_TIMES[]` 数组（~line 1591）
- 修改经期参数 → `getPeriodInfo()` 函数
- 修改政治带刷日期 → `isPoliticalClassDay()` 函数
- 新增文档链接 → ①复制PDF到本目录 ②在 `DRAWER_SECTIONS[]` 文档资料面板加 `<a target="_blank">` ③同步更新 `sw.js` 的 `urlsToCache`（用URL编码文件名）
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add . && git commit -m "..." && git push`
