const express = require("express");
const Object = require("./Object");

class Router extends Object {
  constructor() {
    super();

    this.router = express.Router();
  }

  register(app) {
    this.init();

    app.use(this.router);
  }
}

module.exports = Router;
