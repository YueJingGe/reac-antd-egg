
'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    console.log(ctx.url);

    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(options);
      return;
    }
    if (ctx.cookies.get('token')) {
      const token = ctx.cookies.get('token');
      try {
        ctx.jwt.verify(token, app.config.jwtSecret);
      } catch (e) {
        ctx.returnBody(401, '你没有权限得到数据');
        return;
      }
      await next(options); // 进行下一个事情
    } else {
      ctx.returnBody(401, '你没有权限得到数据');
    }
  };
}
;
