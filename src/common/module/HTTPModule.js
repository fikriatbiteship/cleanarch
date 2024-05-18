const NotImplementedError = require("../errors/NotImplementedError");
const Module = require("../Module");

class HTTPModule extends Module {
  /**
   * Wire route
   * @param {import("express").Application} deps
   */
  async route(app) {
    throw new NotImplementedError();
  }
}

module.exports = HTTPModule;
