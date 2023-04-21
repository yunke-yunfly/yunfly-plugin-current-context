import { AsyncLocalStorage } from 'async_hooks';
import * as koa from 'koa';
import { CurrentContextConfig } from './types';

// async hooks
export const asyncLocalStorage = new AsyncLocalStorage();

/**
 * @param opts 配置
 */
export default function currentContex(
    opts: CurrentContextConfig = { enable: false },
): koa.Middleware {
    return async function (ctx: koa.Context, next: Function) {
        asyncLocalStorage.enterWith(ctx);
        return await next();
    };
}

/**
 * 获得活动Context对象
 *
 * @export
 * @return {*}  {(Koa.Context | undefined)}
 */
export function getCurrentContext(): koa.Context | undefined {
    try {
        return asyncLocalStorage.getStore() as koa.Context;
    } catch (err: any) {
        return undefined;
    }
}

