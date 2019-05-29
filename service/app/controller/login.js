'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async register() {
    this.ctx.body = 'do register';
    const { ctx } = this;
    const { password, username, email } = ctx.request.body;
    // ctx.body = `${password}, ${username}, ${email}`;
    await ctx.service.user.register({ password, username, email });
  }
}

module.exports = LoginController;
