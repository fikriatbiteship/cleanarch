/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

const fs = require("fs");
const path = require("path");

const initializersDir = path.join(__dirname);

fs.readdirSync(initializersDir).forEach((initializerFilePath) => {
  if (initializerFilePath === "index.js") return;

  require(path.join(initializersDir, initializerFilePath));
});
