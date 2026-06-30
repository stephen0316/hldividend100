# 红利低波100 息差监控看板

## 功能

- 实时从东方财富 API 获取数据
- 股息率改为理杏仁日快照更新（页面不再实时抓第三方网页）
- 息差信号仪表盘 + 历史趋势图
- 股息率手动校准（作为自动更新失败或调仓后的兜底）
- 历史数据存储在浏览器 localStorage 中

## 股息率日快照

- 快照文件：`data/dividendSnapshot.js`
- 更新脚本：`node scripts/update-dividend-snapshot.mjs`
- 页面接口：`/api/dividend`
- 调试实时抓取：`/api/dividend?live=1`

### 定时更新

仓库包含 GitHub Actions 工作流：

- `.github/workflows/update-dividend-snapshot.yml`

默认每天北京时间约 `19:30` 自动更新一次快照，并在数据变化时提交到仓库。

## 本地预览

```bash
npx wrangler pages dev . --port 3457
```

然后访问 http://localhost:3457

## 在线链接

https://woooooo.cn/
