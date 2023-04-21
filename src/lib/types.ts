import { KoaApp, Config } from '@yunflyjs/yunfly-core'

export interface CurrentContextConfig {
  enable: boolean;
}

export interface ConsoleTraceOption {
  koaApp: KoaApp;
  pluginConfig: CurrentContextConfig;
  yunflyApp: any;
  config: Config;
}

export interface MetadataConfig {
  [props: string]: any;
}

export interface MetadataOptions {
  enable?: boolean;
}

export interface MetadataOption {
  koaApp: any;
  pluginConfig: MetadataOptions;
  yunflyApp: any;
  config: Config;
}