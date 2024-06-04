const Module = require("../common/Module");
const Dependency = require("../utils/dependency");
const HashManager = require("./manager/HashManager");
const TransactionManager = require("./manager/TransactionManager");
const SQLDatabaseManager = require("./manager/database/SQLDatabaseManager");

class CommonModule extends Module {
  /**
   * Wire dependencies
   * @param {Dependency} deps
   */
  wire(deps) {
    deps.set("hashManager", async () => {
      return new HashManager();
    });

    deps.set("sqlDatabaseManager", async () => {
      return new SQLDatabaseManager();
    });

    deps.set("transactionManager", async () => {
      return new TransactionManager();
    });
  }
}

module.exports = CommonModule;
