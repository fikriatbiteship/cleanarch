const Context = require("../Context");
const Manager = require("../Manager");
const mongoose = require("mongoose")

class TransactionManager extends Manager {
  /**
   * Wrap action into one transaction
   * @param {Function} block
   * @return {Promise<void>}
   */
  async call(block) {
    const context = new Context();
    const transaction = await mongoose.startSession();
    transaction.startTransaction()
    context.set("trx", transaction);
    try {
        await block(context)
        await transaction.commitTransaction()
        await transaction.endSession()
    } catch (error) {
        await transaction.abortTransaction()
        throw error;
    }
  }
}

module.exports = TransactionManager;
