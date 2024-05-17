const express = require("express");
const CommonObject = require("./object");

class CommonRouter extends CommonObject {
  constructor() {
    super();

    this.router = express.Router();
  }

  register(app) {
    this.init();

    app.use(this.router);
  }
}

module.exports = CommonRouter;
