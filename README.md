# reac-antd-egg

react 全栈项目

client: react + antd

service: egg.js

antd + egg.js 阿里开源的全栈解决方案

## local CSS

使用 local CSS 模块化 css，使组件的样式绝对安全，不会跟其他的样式冲突。

在webpack中配置：
```js
{
  test: /\.(css|less|scss)$/,
  exclude: /node_modules/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: true, // 重点
        localIdentName: "[local]--[hash:base64:5]" // 重点
      }
    },
    "sass-loader"
  ]
}
```
