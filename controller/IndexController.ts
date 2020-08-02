import { Router, TAGS, interfaces, httpGet, TYPE, controller, inject, provideThrowable } from "../ioc";
@provideThrowable(TYPE.Controller, "IndexController")
@controller("*")
export default class IndexController implements interfaces.Controller {
    private apiService;
    //aop 面向切面编程
    constructor(@inject(TAGS.ApiService) apiService) {
        //di  依赖注入 整个流程就是ioc
        this.apiService = apiService;
    }
    @httpGet("*")
    private async index(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        console.log('🍎，进后端路由了', ctx)
        ctx.body = await ctx.render('index.html');// 这是 CSR 客户端渲染模式，node 层 吐一个空的 页面，再发ajax->node->后端，vue渲染页面
    }
}