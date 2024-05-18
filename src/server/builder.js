const fs = require("fs");
const path = require("path");
const logger = require("../../lib/logger");
const Module = require("../common/Module");
const Dependency = require("../utils/dependency");
const HTTPModule = require("../common/module/HTTPModule");
const Request = require("../common/Request");

const srcDir = path.join(__dirname, "..");

/**
 * Route express application
 * @param {import('express').Application} app
 * @param {Dependency} deps
 */
module.exports = async (app, deps = new Dependency()) => {
  const mods = new Set();
  fs.readdirSync(srcDir).forEach((modDir) => {
    const modPath = path.join(srcDir, modDir, "index.js");
    if (!fs.existsSync(modPath)) return;

    const _Module = require(modPath);
    if (!(_Module.prototype instanceof Module)) return;

    const mod = new _Module();
    mod.wire(deps);
    mods.add(mod);

    const requestsDir = path.join(srcDir, modDir, "requests");
    if (!fs.existsSync(requestsDir)) return;

    for (const requestFile of fs.readdirSync(requestsDir)) {
      const requestPath = path.join(requestsDir, requestFile);
      const _Request = require(requestPath);
      if ((!_Request.prototype) instanceof Request) continue;
      _Request.compile();
      logger.debug("Builder:", "request", _Request.name, "schema compiled.");
    }
  });

  for (const mod of mods) {
    if (mod instanceof HTTPModule) {
      await mod.route(app);
      logger.debug("Builder:", "routes on", mod.constructor.name, "registered.");
    }
  }

  return app;
};
