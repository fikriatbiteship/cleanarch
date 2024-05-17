const NotImplementedError = require("./errors/NotImplementedError");
const CommonObject = require("./object");

class CommonModule extends CommonObject {
  wire() {
    throw new NotImplementedError();
  }

  registerListener() {
    throw new NotImplementedError();
  }

  registerRouter() {
    throw new NotImplementedError();
  }
}

module.exports = CommonModule;
