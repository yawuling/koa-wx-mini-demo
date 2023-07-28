# koa-wx-mini-demo

测试微信小程序相关 API 调用环境

## 运行

```bash
npm i
npm start
```

## 请求说明：

1. http://localhost:3010/h5/wxLink.html 空白 H5 跳 URL Link，localStorage 暂时关闭以方便测试性能

2. http://localhost:3010/h5/wxSchema.html 空白 H5 跳 Schema，localStorage 暂时关闭以方便测试性能

3. http://localhost:3010/h5/wxRedirectLink 302 重定向到 URL Link，无缓存

4. http://localhost:3010/h5/wxRedirectSchema 302 重定向到 Schema，无缓存
