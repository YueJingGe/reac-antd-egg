/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1559040438691_1468';

  config.security = { csrf: { enable: false } };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: '12345678',
    database: 'learn',
  };
  config.password_secret = 'ps123secr';
  config.jwtSecret = 'yjg';
  config.auth_cookie_name = 'token';
  // 白名单：将不需要登录的页面放在这里
  config.authWhiteList = [ '/api/v2/login', '/api/v2/login/register' ];
  // ctx request response
  config.middleware = [ 'authorization' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
