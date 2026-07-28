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

在每个交易日，工作流会在北京时间约 `20:40` 执行主任务，并在约 `23:10` 执行一次补偿任务。GitHub Actions 的 `schedule` 可能延迟，补偿任务用于覆盖主任务的偶发延迟或源站限流。

抓取器会对网络错误、超时、`408`、`429` 和 `5xx` 响应执行最多 4 次指数退避重试，并遵守源站的 `Retry-After`。若全部失败，系统保留最后一次有效数据，但会提交失败时间、失败阶段和错误摘要；接口与页面会将其标为过期，而工作流仍以失败结束，方便告警和排查。

本地验证抓取器的重试策略：

```bash
node --test test/dividendSource.test.mjs
```

## 本地预览

```bash
npx wrangler pages dev . --port 3457
```

然后访问 http://localhost:3457

## 在线链接

https://woooooo.cn/
