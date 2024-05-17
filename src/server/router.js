const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const logger = require("../../lib/logger");
const CommonModule = require("../common/module");

const srcDir = path.join(__dirname, "..");
fs.readdirSync(srcDir).forEach((modDir) => {
  const modPath = path.join(srcDir, modDir, "index.js");
  if (!fs.existsSync(modPath)) return;

  const Module = require(modPath);
  if (!(Module.prototype instanceof CommonModule)) return;

  const mod = new Module();
  mod.registerRouter(router);

  logger.info(
    "server/router:",
    "routes on module",
    `'${modDir}'`,
    "has been registered!",
  );
});

module.exports = router;
