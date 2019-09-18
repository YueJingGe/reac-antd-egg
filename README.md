- [reac-antd-egg](#reac-antd-egg)
  - [启动](#启动)
  - [CSS 模块化](#CSS模块化)
  - [注册](#注册)
  - [登录](#登录)
  - [状态码](#状态码)
  - [middleare 中间件](#middleare-中间件)
  - [extend 扩展](#extend-扩展)
  - [全栈开发之登录 UI 组件](#全栈开发之登录-UI-组件)
  - [axios 异步请求](#axios-异步请求)
  - [用户状态管理 redux](#用户状态管理-redux)
  - [获取用户信息](#获取用户信息)
  - [退出登录](#退出登录)
  - [FAQ](#FAQ)
  - [一些 mysql 的简单操作](#一些mysql的简单操作)
    - [mysql -u root -p 解释](#mysql-uroot-p解释)

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

## CSS 模块化

使用 `local CSS` 模块化 css，使组件的样式绝对安全，不会跟其他的样式冲突。

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

- sequelize

```bash
./node_modules/.bin/sequelize db:create # 创建数据库
```

- 数据库命令

  ```bash
  PATH="$PATH":/usr/local/mysql/bin
  mysqlshow -u root -p # 输入密码：12345678 查看当前拥有的所有数据库
  mysql -u root -p   # 连接数据库服务器 mysql -u 用户名 -p 密码
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

  `./node_modules/.bin/sequelize migration:create --name create-users` 创建表

  migration 作用：完成 SQL 的迁移，使用 js 语句代替 SQL 语句创建表、声明字段类型

  model 文件作用：使用 js 对象描述数据表，相当于状态管理，状态初始化

  ORM 映射：提供了增删改查的接口，比如：create、findOne，使用 js 函数的方式描述 SQL 语句

  写过 migration 文件和 model 文件之后执行：`./node_modules/.bin/sequelize db:migrate`

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

## axios 异步请求

axios + promise + login + withRouter

axiosInstance.js 打底配置

- axios instance 配置
- interceptors 全局配置
- 状态码 400 401

## 用户状态管理 redux

- 单一的状态树，整个应用只有一个状态树
- reducer 纯函数 规定状态具体是如何更改的 精确计算状态的改变

```js
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);
export default store;
```

- combineReducers 合并多个分离的 reducer

```js
import { combineReducers } from "redux";
export default combineReducers({
  userInfo
});
```

- Provider 将 store 注入到应用中

```js
import { Provider } from "react-readux";
```

- connect

```js
import { connect } from "react-readux";
```

## 获取用户信息

## 退出登录

原理：清除登录成功之后的 cookie

## FAQ

- 已经登录成功了，但是访问首页还是显示没有权限，cookie 没有设置上？
- BrowserHistory 刷新页面 404 问题 `Cannot GET /login`

## 一些 mysql 的简单操作

- 权限

```bash
show grants for 'root'@'localhost'; # 查询用户权限
grant select,insert,update,delete on *.* to root@localhost identified by '12345678'; # 终极解决方案：设置用户的密码
# flush privileges;
```

- 启动、停止、重新启动 MySQL 服务

```bash
/usr/local/opt/mysql@5.5/support-files/mysql.server start
/usr/local/opt/mysql@5.5/support-files/mysql.server stop
/usr/local/opt/mysql@5.5/support-files/mysql.server restart
```

- 查看、删除、创建 数据库

```
show databases;

create database learn;

drop database learn;
```

- 创建、查询所有、删除用户

```bash
create user "root"@"127.0.0.1" identified by "12345678"; # 创建用户

grant all privileges on *.* to root@localhost identified by '12345678'; # 格式:grant select on 数据库.* to 用户名@登录主机 identified by '密码'

SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;

drop user 'root'@'localhost'; # 删除用户 并且删除权限
```

- 切换数据库

```
use '数据库名';
```

- 列出所有表

```
show tables;
drop table users;
```

### mysql -u root -p 解释

`mysql -u 用户名 -p 密码` 是连接数据库服务器的命令。要求你输入自己连接数据库的用户名和密码。

考虑密码如果直接明文写在这条命令行上，不安全，所以可以先输入：mysql -u 用户名 -p 然后回车，此时提示你输入密码，这时候输入的密码就不再是明文的了。
