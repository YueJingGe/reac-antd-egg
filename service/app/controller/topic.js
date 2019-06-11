'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
  async addTopic() {
    const { ctx } = this;
    const { topicImg, topicTitle } = ctx.request.body;
    // const newTopic
  }
}

module.exports = TopicController;
