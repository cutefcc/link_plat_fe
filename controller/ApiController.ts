import { Router, inject, interfaces, httpGet, TYPE, controller, TAGS, provideThrowable } from "../ioc";
@provideThrowable(TYPE.Controller, "ApiController")
@controller("/api")
export default class ApiController implements interfaces.Controller {
    private apiService;
    constructor(@inject(TAGS.ApiService) apiService) {
        this.apiService = apiService;
    }
    @httpGet("/test")
    private async test(ctx: Router.IRouterContext, next: () => Promise<any>): Promise<any> {
        console.log('进来了 api/test');
        // const result: Promise<Object> = await this.apiService.getInfo("https://douban.uieee.com/v2/movie/top250");// 获取豆瓣api 电影top250
        const result: Promise<Object> = await this.apiService.getInfo("http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10");// 获取豆瓣api 电影top250
        // return result;
        ctx.body = result;
    }
}