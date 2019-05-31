'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi,' + JSON.stringify(ctx.user);
  }
}

module.exports = HomeController;
