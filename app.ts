import 'reflect-metadata';
import * as bodyParser from "koa-bodyparser";
import co from 'co';
import * as serve from 'koa-static';
import * as render from "koa-swig";
import { Container, buildProviderModule, InversifyKoaServer } from './ioc';
import './ioc/loader'; // 相当于java的配置文件，里面放路由

const container = new Container();
// ioc 控制反转
container.load(buildProviderModule());// 这一步就把 头上有 @provide 的类灌入了容器了
let server = new InversifyKoaServer(container);
import historyApiFallback from 'koa2-connect-history-api-fallback';
// 设置中间件
server.setConfig(app => {
    console.log('app1', app);
    //设置中间件
    app.use(bodyParser());
    //白名单,加白名单的作用是让他走后端路由  这一步一定要在下面  指定静态资源文件  的前面，不然会导致 404
    app.use(historyApiFallback(
        { 
            // index: '/index.html',
            whiteList: ['/api'],//'/', '/api', '/index','/test' 
            // rewrites: [{
            //     from: '.*',
            //     to: '/'
            // }]
        }
    ));
    app.use(serve('./dist'));//静态资源文件
    app.context.render = co.wrap(render({
        root: './dist',
        autoescape: true,
        cache: false,
        ext: 'html',
        varControls: ["[[", "]]"],
        writeBody: false
    }));
})
    .setErrorConfig(app => {
        console.log(app);
    });
let app = server.build();
app.listen(3001, () => {
    console.log("正在监听3001端口，启动了🐭");
})