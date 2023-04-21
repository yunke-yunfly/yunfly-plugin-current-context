import { Config, KoaApp } from "@yunflyjs/yunfly-core";
import { getCurrentContext } from "./current-context";
import { MetadataConfig } from "./types";
import _ from 'lodash';

const { v4: uuidv4 } = require('uuid');

let useApm: boolean;

/**
 * gen trace-id from unique-string
 *
 * @export
 * @param {KoaApp} koaApp
 * @param {Config} config
 * @return {*} 
 */
export function genTraceId(koaApp: KoaApp, config: Config): void {
  useApm = _.get(config, 'apm.enable');

  // 如果项目开启了apm 时使用apm生成trace-id功能
  if (useApm) return;

  koaApp.use(async (ctx: any, next: any) => {
    const traceId = uuidv4();
    console.log('trace-id', traceId);
    ctx['trace-id'] = traceId;
    await next();
    ctx.set('trace-id', traceId);
  });
}

/**
 * get trace msgs
 *
 * @export
 * @return {*}  {MetadataConfig}
 */
export function getCurrentTrace(): MetadataConfig {
  if (useApm) {
    throw Error('你开启了 @yunflyjs/yunfly-plugin-apm 插件, 请使用 apm 插件导出的 getTrace 方法。');
  }
  const ctx: any = getCurrentContext();
  if (!ctx) {
    throw Error('获取 trace-id 失败, 请检查 config.currentContext 配置是否开启!');
  }
  return { 'trace-id': ctx['trace-id'] || '' };
}