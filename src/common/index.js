const Module = require("../common/Module");
const Dependency = require("../utils/dependency");
const HashManager = require("./manager/HashManager");

class CommonModule extends Module {
  /**
   * Wire dependencies
   * @param {Dependency} deps
   */
  wire(deps) {
    deps.set("hashManager", async () => {
      return new HashManager();
    });
  }
}

module.exports = CommonModule;
