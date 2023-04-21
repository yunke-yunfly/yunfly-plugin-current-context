# @yunflyjs/yunfly-plugin-current-context

## 简介

1. 获取当前的活动对象 context;
2. 参数透传，使用 metadata 函数;
3. 链路追踪，生成链路 trace-id;

## 使用

1. 安装依赖

```ts
// 该插件依赖apm服务
yarn add @yunflyjs/yunfly-plugin-current-context
```

2. `config.plugin.ts` 中声明插件

```ts title="src/config/config.plugin.ts"
const plugins: { [key: string]: string }[] = [
  {
    name: 'contextTrace',
    package: '@yunflyjs/yunfly-plugin-current-context',
    priority: 3,
  },
];
export default plugins;
```

3. `config.default.ts` 中启用插件

```ts
config.contextTrace = {
  enable: true,
}
```

## api 使用

### 获取当前的活动对象

使用文档：<https://yunke-yunfly.github.io/doc.github.io/document/high-function/context>

### 参数透传

使用文档：<https://yunke-yunfly.github.io/doc.github.io/document/high-function/param-trans>

### 链路追踪

使用文档： <https://yunke-yunfly.github.io/doc.github.io/document/high-function/link-trace>
