const Handler = require("./handler");

class Controller extends Handler {
  arrayQuery(value) {
    if (!value) return;

    return Array.isArray(value) ? value : [value];
  }
}

module.exports = Controller;
