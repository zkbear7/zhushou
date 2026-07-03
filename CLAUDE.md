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

## 代码结构（v8·7.2修订版）

- `DRAWER_SECTIONS[]`：侧边抽屉 9 个面板（HTML 内联）
  - 高数面板：真实课时标注，方浩幂级数/李艳芳线面积分替代方案
  - 828面板：飞哥（控制考研中科大飞哥）替代起点考研
  - 肖1000面板：马原先讲→带刷后补顺序修正
  - 进度自检：更新各科里程碑
  - 健身面板：二四六健身日 + 经期7.2起算
  - 完整周计划面板：全科路线重建
- `WEEKLY_PLAN[]`：7.2修订版逐周计划（16周，真实课时排期）
- `NOTIFY_TIMES[]`：6 个定时通知
- `getPeriodInfo()`：经期检测（周期30天，cycleStart=7.2）
- `isGymDay()`：二四六健身日（含经期覆盖）
- `isRestDay()`：周一休息
- `isSelfControlDay()`：二四六=自控日，三五日=英语日
- `getSchedule()`：v5作息，二四六自控/三五日英语
- `buildDailySubjectCard()`：主页今日每科任务卡片（新增）
- 打卡系统：`localStorage` 持久化 + 完成率统计 + 7日柱状图

## 编辑注意

- 单文件，所有 CSS/JS 内联
- 修改面板内容 → `DRAWER_SECTIONS[]` 数组（~line 670）
- 修改周计划 → `WEEKLY_PLAN[]` 数组（~line 907）
- 修改通知时间 → `NOTIFY_TIMES[]` 数组（~line 1450）
- 修改经期参数 → `getPeriodInfo()` 函数
- 修改政治带刷日期 → `isPoliticalClassDay()` 函数
- 改完后本地测试：直接在浏览器打开 `index.html`
- 确认无误后：`git add . && git commit -m "..." && git push`
