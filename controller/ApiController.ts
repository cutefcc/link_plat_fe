import {
  Router,
  inject,
  interfaces,
  httpGet,
  httpPost,
  TYPE,
  controller,
  TAGS,
  provideThrowable,
} from "../ioc";
import { host, port } from "../constant/config";
import * as queryString from "query-string";
const urlPrefix = `${host}:${port}/`;

@provideThrowable(TYPE.Controller, "ApiController")
@controller("/api")
export default class ApiController implements interfaces.Controller {
  private apiService;
  constructor(@inject(TAGS.ApiService) apiService) {
    this.apiService = apiService;
  }
  @httpGet("/test")
  private async test(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    console.log("进来了 api/test");
    // const result: Promise<Object> = await this.apiService.getInfo("https://douban.uieee.com/v2/movie/top250");// 获取豆瓣api 电影top250
    const result: Promise<Object> = await this.apiService.getInfo(
      "http://api.douban.com/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=10"
    ); // 获取豆瓣api 电影top250
    // return result;
    ctx.body = result;
  }
  @httpGet("/getExpiredEnvsLists")
  private async getExpiredEnvsLists(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const url: string = `${urlPrefix}expired_envs`;
    let res: object = {};
    try {
      const result: Promise<Object> = await this.apiService.getInfo(url);
      res = result;
    } catch {
      res = {
        code: 0,
        message: "接口返回错误",
      };
    }
    ctx.body = res;
  }
  @httpGet("/getEnvsLists")
  private async getEnvsLists(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    const url: string = `${urlPrefix}env_lists`;
    let res: object = {};
    try {
      const result: Promise<Object> = await this.apiService.getInfo(url);
      res = result;
    } catch {
      res = {
        code: 0,
        message: "接口返回错误",
      };
    }
    ctx.body = res;
  }
  @httpPost("/autoGenerate")
  private async autoGenerate(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    let query = ctx.request.body;
    Object.keys(query).forEach((item) => {
      if (query[item] === "") {
        delete query[item];
      }
    });
    const url: string = `${urlPrefix}sget_uvemock?${queryString.stringify(
      query
    )}`;
    let res: object = {};
    try {
      const result: Promise<any> = await this.apiService.getInfo(url);
      res = result;
    } catch {
      res = {
        code: 0,
        message: "接口返回错误",
      };
    }
    ctx.body = res;
  }
  //   @httpPost("/uploadMock")
  //   private async uploadMock(
  //     ctx: Router.IRouterContext,
  //     next: () => Promise<any>
  //   ): Promise<any> {
  //     let query = ctx.request.body;
  //     Object.keys(query).forEach(item => {
  //         if (query[item] === '') {
  //             delete query[item]
  //         }
  //     })
  //     const url = `${urlPrefix}upload_mock?${queryString.stringify(query)}`;
  //     let res = {

  //     }
  //     try {
  //         const result: Promise<any> = await this.apiService.getInfo(url);
  //         res = result;
  //     } catch {
  //         res = {
  //             code: 0,
  //             message: "接口返回错误"
  //         };
  //     }
  //     ctx.body = res;
  //   }
}
