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
- react 使用箭头函数报错:
  - 参考：`https://babeljs.io/docs/en/babel-plugin-proposal-class-properties`
  - `npm install --save-dev @babel/plugin-proposal-class-properties`
  - 这里要注意 ⚠️：在.babelrc 中需要保障@babel/plugin-proposal-decorators 在 @babel/plugin-proposal-class-properties 前面，like this: 不然还会报错
  ```
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "@babel/plugin-proposal-class-properties",
  ```
  ```
  If you are using ["@babel/plugin-proposal-decorators", { "legacy": true }], make sure it comes *before* "@babel/plugin-proposal-class-properties" and enable loose mode, like so:
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
  ```
- webpack 配置 alias 别名：有益于项目引用组件时写更加简洁的路径
- `jsconfig.json` 了解一下？ 可以干嘛？ 和 `tsconfig.json` 是啥关系？
- vscode 编辑器不能跳转到组件对应的目录？
- @json-editor/json-editor 只是安装了，还没有实践
- redux envLists 的获取时机还存在问题（直接进入非主页和/alreadyEnv 页面会导致 redux envLists 为空）
- 看一下 eslint react/display-name 规则
