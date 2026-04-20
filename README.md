# 红利低波100 息差监控看板

## 功能

- 实时从东方财富 API 获取数据
- 股息率按日自动更新（优先理杏仁，失败回退手动校准）
- 息差信号仪表盘 + 历史趋势图
- 股息率手动校准（作为自动更新失败或调仓后的兜底）
- 历史数据存储在浏览器 localStorage 中

## 本地预览

```bash
npx wrangler pages dev . --port 3457
```

然后访问 http://localhost:3457

## 在线链接

https://woooooo.cn/
