const Handler = require("./Handler");

class Controller extends Handler {
  arrayQuery(value) {
    if (!value) return;

    return Array.isArray(value) ? value : [value];
  }
}

module.exports = Controller;
