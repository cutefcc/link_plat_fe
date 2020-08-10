- 启动方式

* `npm run client:dev` dev 打包 📦 前端代码 （开发环境用）
* `npm run client:prod` prod 打包 📦 前端代码（生产环境用）
* `npm run dev` 前台启动 node 应用

问题记录：

- BrowserRouter 在非 index 页面 （比如二级三级路由）刷新页面或者直接访问 404
  - 解决办法 1: 换成 HashRouter hash 模式对 seo 不够友好，是不推荐这种方式的
  - 解决办法 2: 设置 koa2-connect-history-api-fallback 白名单 配合 webpack 的配置文件 filename 和 publicPath
- html-webpack-plugin title 属性直接配置 不生效？？？
  - 解决办法： `<title><%= htmlWebpackPlugin.options.title %></title>`
- 开发环境引入 `ts-node-dev` 热启服务， 遇到 `Error: Cannot find module 'typescript'`
  - 解决办法：`sudo npm i typescript --save-dev && sudo npm i typescript -g`
- 前端路由跳转方式：
  - `this.props.history.push(route)`
  - `<Link to="/nav1/topics">react渲染长列表</Link>`
- node 端接收不到前端的 post 请求的 body 数据：
  - 设置 `headers: { 'Content-Type': 'application/json' }`
