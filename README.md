# reac-antd-egg

react 全栈项目

client: react + antd

service: egg.js

antd + egg.js 阿里开源的全栈解决方案

文章：https://juejin.im/post/5c5432b6e51d457ffb479225

## 启动

service:

```js
npm install
npm run dev
```

> http://127.0.0.1:7001

client:

```js
npm install
npm run start
```

> http://127.0.0.1:7000/

## local CSS

使用 local CSS 模块化 css，使组件的样式绝对安全，不会跟其他的样式冲突。

在 webpack 中配置：

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

## 注册

- egg.js 中 post 提交默认有安全防攻击

  CSRF 跨站请求攻击

  解决：`config.default.js` 文件中配置 `config.security = { csrf: { enable: false } };`

- api 版本前缀

  版本的命名空间，方便版本更新迭代

  ```js
  const apiV2Router = app.router.namespace("/api/v2");
  // api 版本前缀
  apiV2Router.post("/login/register", controller.login.register);
  ```

- 文件权限

  `chmod -R 777 database/`

- 数据库 sequelize mysql2 sequelize-cli

  - ERROR: connect ECONNREFUSED 127.0.0.1:3306
    官网下载 安装 MySQL
  - ERROR: Client does not support authentication protocol requested by server; consider upgrading MySQL client

    解决办法：安装的时候修改密码强度：默认的为强密码模式，手动选择下面一个宽松模式

    Mac 系统偏好设置 -> MySql -> intialize Database -> 选择“Use Legacy Password Encryption” -> 点击 OK

- 数据库命令

  ```bash
  PATH="$PATH":/usr/local/mysql/bin
  mysqlshow -u root -p # 12345678
  mysql -u root -p   # 进入mysql
  use learn; # 使用learn数据库
  describe users; # 查看users表
  truncate users; # 清空users表
  select * from users; # 从users表中查询
  ```

  结果：

  ```shell
  +--------------------+
  |     Databases      |
  +--------------------+
  | information_schema |
  | learn              |
  | mysql              |
  | performance_schema |
  | sys                |
  +--------------------+
  ```

  ```bash
  +------------+--------------+------+-----+---------+----------------+
  | Field      | Type         | Null | Key | Default | Extra          |
  +------------+--------------+------+-----+---------+----------------+
  | id         | int(11)      | NO   | PRI | NULL    | auto_increment |
  | userId     | varchar(255) | NO   |     | NULL    |                |
  | username   | varchar(255) | NO   |     | NULL    |                |
  | email      | varchar(255) | NO   |     | NULL    |                |
  | password   | varchar(255) | NO   |     | NULL    |                |
  | avatarUrl  | varchar(256) | YES  |     | NULL    |                |
  | mobile     | varchar(32)  | YES  |     | NULL    |                |
  | prifix     | varchar(32)  | YES  |     | NULL    |                |
  | abstract   | varchar(255) | YES  |     | NULL    |                |
  | sex        | int(11)      | YES  |     | 0       |                |
  | created_at | datetime     | YES  |     | NULL    |                |
  | updated_at | datetime     | YES  |     | NULL    |                |
  +------------+--------------+------+-----+---------+----------------+
  12 rows in set (0.01 sec)
  ```

- migration 迁移

  `./node_modules/.bin/sequelize migration:create --name create-users`

  migration 作用：完成 SQL 的迁移，使用 js 语句代替 SQL 语句创建表、声明字段类型

  model 文件作用：使用 js 对象描述数据表，相当于状态管理，状态初始化

  ORM 映射：提供了增删改查的接口，比如：create、findOne，使用 js 函数的方式描述 SQL 语句

- password 加密

  crypto 单向加密 通用的加密+哈希算法 Hmac sha256 加密格式

  ```js
  // 加密保存用户密码
  user.password = crypto
    .createHmac("sha256", app.config.password_secret)
    .update(user.password)
    .digest("hex");
  ```

## 登录

- JSON Web Token jwt

  在用户和服务器之间传递安全可靠的信息，依靠 cookie 传递

## 状态码

- 4x
  - 400 这个请求是非法的，服务器不接受该请求（参数可能校验失败）
  - 401 未经授权，被服务器配置拒绝

## middleare 中间件

每次请求路由的开始都会运行中间件，在请求和请求响应之间存在。

使用 next 为应用提供更多的功能

## extend 扩展

## 全栈开发之登录 UI 组件

- webpack 4.0 支持 css 模块化，不需要手动配置 css-loader:1.0.0

## FAQ

- 已经登录成功了，但是访问首页还是显示没有权限，cookie 没有设置上？
- BrowserHistory 刷新页面 404 问题 `Cannot GET /login`

