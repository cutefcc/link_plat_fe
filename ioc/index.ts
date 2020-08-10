// 控制反转 ioc
import { Container, inject } from "inversify";
import {
  interfaces,
  httpGet,
  httpPost,
  TYPE,
  controller,
  InversifyKoaServer,
} from "inversify-koa-utils";
import {
  provide,
  buildProviderModule,
  fluentProvide,
} from "inversify-binding-decorators";
import TAGS from "../constant/tags";
import * as Router from "koa-router";
let provideThrowable = function (identification, name) {
  return fluentProvide(identification).whenTargetNamed(name).done();
};
export {
  Router,
  Container,
  inject,
  interfaces,
  httpGet,
  httpPost,
  TYPE,
  controller,
  InversifyKoaServer,
  provide,
  provideThrowable,
  buildProviderModule,
  TAGS,
};
