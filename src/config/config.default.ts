import { CurrentContextConfig } from '../lib/types';

/**
 * 包内置默认配置项
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): any {
  const config: { currentContext?: CurrentContextConfig } = {};

  config.currentContext = {
    enable: false,
  };

  return config;
}
