const Context = require("../Context");
const Manager = require("../Manager");

class TransactionManager extends Manager {
  constructor() {
    super();
  }
  /**
   * Wrap action into one transaction
   * @param {Function} block
   * @return {Promise<void>}
   */
  async call(block) {
    const context = new Context();

    context.set("useTransaction", true);

    try {
      await block(context);

      const sqlTransaction = context.get("sqlTransaction");
      if (!!sqlTransaction) await sqlTransaction.commit();
    } catch (error) {
      const sqlTransaction = context.get("sqlTransaction");
      if (!!sqlTransaction) await sqlTransaction.rollback();

      throw error;
    }
  }
}

module.exports = TransactionManager;
