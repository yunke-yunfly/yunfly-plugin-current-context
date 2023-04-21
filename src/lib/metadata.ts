import { Config } from '@yunflyjs/yunfly-core'
import { getCurrentContext } from './current-context'
import _ from 'lodash';
import { MetadataConfig } from './types';

/**
 * metadata handle
 *
 * @class Medata
 */
export default class Medata {
  apmEnable: boolean;
  currentContextEnable: boolean;

  setConfig(config: Config) {
    this.apmEnable = _.get(config, 'apm.enable');
    this.currentContextEnable = _.get(config, 'currentContext.enable');
  }

  /**
   * set custom metadata
   *
   * @protected
   * @param {string} key
   * @param {{ value: any; type: string }} value
   * @return {*}  {*}
   * @memberof Medata
   */
  protected setCustomContext(key: string, value: { value: any; type: string }): any {
    const ctx: any = getCurrentContext();
    if (!_.get(ctx, 'currentTransaction')) {
      ctx.currentTransaction = { _custom: {} };
    };

    if (!ctx.currentTransaction._custom[key]) {
      ctx.currentTransaction._custom[key] = [];
    }

    if (value.type === 'add') {
      ctx.currentTransaction._custom[key].push(value.value);
      return
    }

    if (value.type === 'set') {
      ctx.currentTransaction._custom[key] = [value.value];
      return
    }

    if (value.type === 'remove') {
      ctx.currentTransaction._custom[key] = undefined;
      return
    }
  }

  /**
   * check currentContext is enable
   *
   * @protected
   * @memberof Medata
   */
  protected check() {
    if (this.apmEnable) {
      throw Error('你开启了 @yunflyjs/yunfly-plugin-apm 插件, 请使用 apm 插件导出的 metadata 方法。!');
    }
    if (!this.currentContextEnable) {
      throw Error('新增 metadata 失败, 请检查 config.currentContext 配置是否开启!');
    }
  }

  /**
   * add metadata
   *
   * @param {string} key
   * @param {string} value
   * @memberof Medata
   */
  add(key: string, value: string): void {
    this.check();
    this.setCustomContext(key, { value, type: 'add' });
  }

  /**
   * set metadata
   *
   * @param {string} key
   * @param {string} value
   * @returns {void}
   * @memberof Medata
   */
  set(key: string, value: string): void {
    this.check();
    this.setCustomContext(key, { value, type: 'set' });
  }

  /**
   * remove key
   *
   * @param {string} key
   * @returns {void}
   * @memberof Medata
   */
  remove(key: string): void {
    this.check();
    this.setCustomContext(key, { value: null, type: 'remove' });
  }

  /**
   * get metadata
   *
   * @readonly
   * @memberof Medata
   */
  getMap(): MetadataConfig {
    this.check();
    const ctx = getCurrentContext();
    return _.get(ctx, 'currentTransaction._custom');
  }

  /**
   * get metedata
   *
   * @param {string} key
   * @return {*}  {any[]}
   * @memberof Medata
   */
  get(key: string): MetadataConfig[] {
    this.check();
    const ctx = getCurrentContext();
    return _.get(ctx, ['currentTransaction', '_custom', key]);
  }

}

