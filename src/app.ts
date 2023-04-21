import currentContex, { getCurrentContext } from './lib/current-context';
import { ConsoleTraceOption, CurrentContextConfig } from './lib/types';
import Medata from './lib/metadata';
import { genTraceId, getCurrentTrace } from './lib/trace';

const metadata = new Medata();

/**
 * yunfly current context plugin
 *
 * @export
 * @param {*} { app, pluginConfig }
 * @returns {void}
 */
export default function YunflyCurrentContextPlugin({ koaApp, pluginConfig, config }: ConsoleTraceOption): void {
  const enable = pluginConfig?.enable ?? false;

  if (!enable) return;

  // init trace-id
  genTraceId(koaApp, config);

  // current-context
  koaApp.use(currentContex({ enable }));

  // init metadta config
  metadata.setConfig(config);
}


export {
  CurrentContextConfig,
  getCurrentContext,
  metadata,
  getCurrentTrace
};

