const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const logger = require("../../lib/logger");
const Module = require("../common/module");

const srcDir = path.join(__dirname, "..");
fs.readdirSync(srcDir).forEach((modDir) => {
  const modPath = path.join(srcDir, modDir, "index.js");
  if (!fs.existsSync(modPath)) return;

  const _Module = require(modPath);
  if (!(_Module.prototype instanceof Module)) return;

  const mod = new _Module();
  mod.registerRouter(router);

  logger.info("server/router:", "routes on module", `'${modDir}'`, "has been registered!");
});

module.exports = router;
