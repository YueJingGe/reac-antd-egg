'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = JSON.stringify(ctx.user);
  }
}

module.exports = ApiController;
