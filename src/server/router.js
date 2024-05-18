const fs = require("fs");
const path = require("path");
const logger = require("../../lib/logger");
const Module = require("../common/Module");
const Dependency = require("../utils/dependency");
const HTTPModule = require("../common/module/HTTPModule");

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
  });

  for (const mod of mods) {
    if (mod instanceof HTTPModule) {
      await mod.route(app);
      logger.debug("Router:", "routes on", mod.constructor.name, "registered.");
    }
  }

  return app;
};
