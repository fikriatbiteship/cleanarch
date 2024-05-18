const Dependency = require("../utils/dependency");
const NotImplementedError = require("./errors/NotImplementedError");
const Object = require("./Object");

class Module extends Object {
  /**
   * Wire dependencies
   * @param {Dependency} deps
   */
  wire(deps) {
    throw new NotImplementedError();
  }
}

module.exports = Module;
