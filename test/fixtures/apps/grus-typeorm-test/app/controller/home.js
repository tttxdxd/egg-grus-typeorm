'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log(this.ctx.entity.Test);

    this.ctx.body = 'hi, ' + this.app.plugins.typeorm.name;
  }
}

module.exports = HomeController;
