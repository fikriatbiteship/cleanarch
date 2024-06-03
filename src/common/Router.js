const express = require("express");
const Object = require("./Object");
const Request = require("./Request");
const NotImplementedError = require("./errors/NotImplementedError");

class Router extends Object {
  constructor() {
    super();

    this.router = express.Router();
  }

  mapRequest(klass) {
    if ((!klass.prototype) instanceof Request) throw new NotImplementedError();

    return function validateRequest(req, res, next) {
      req.data = klass.fromRequest(req);

      next();
    };
  }

  register(app) {
    this.init();

    app.use(this.router);
  }
}

module.exports = Router;
