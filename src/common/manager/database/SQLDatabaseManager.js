const Context = require("../../Context");
const Manager = require("../../Manager");
const { sequelize } = require("../../../../db/sequelize/models");

class SQLDatabaseManager extends Manager {
  /**
   * Initiate or Get Transaction
   * @param {Context} ctx
   * @returns {Promise<import("sequelize").Transaction|null>}
   */
  async _getTransaction(ctx) {
    if (!ctx?.get("useTransaction")) return null;

    if (!ctx?.has("trx:sql")) {
      ctx.set("trx:sql", await sequelize.transaction());
    }

    return ctx.get("trx:sql");
  }

  /**
   * Find a record
   * @param {import("sequelize").Model} model
   * @param {Object} args
   * @param {Context} [ctx]
   * @returns {Promise<import("sequelize").Model|null>}
   */
  findOne = async (model, args, ctx) => {
    const transaction = await this._getTransaction(ctx);
    return model.findOne({ ...args, transaction });
  };

  /**
   * Find records
   * @param {import("sequelize").Model} model
   * @param {Object} args
   * @param {Context} [ctx]
   * @returns {Promise<import("sequelize").Model[]>}
   */
  findAll = async (model, args, ctx) => {
    const transaction = await this._getTransaction(ctx);
    return model.findAll({ ...args, transaction });
  };

  /**
   * Upsert record
   * @param {import("sequelize").Model} model
   * @param {Object} args
   * @param {Context} [ctx]
   * @returns {Promise<import("sequelize").Model[]>}
   */
  upsert = async (model, args, ctx) => {
    const transaction = await this._getTransaction(ctx);
    return model.upsert(args, { transaction });
  };

  /**
   * Count records
   * @param {import("sequelize").Model} model
   * @param {Object} args
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  count = async (model, args, ctx) => {
    const transaction = await this._getTransaction(ctx);
    return model.count({ ...args, transaction });
  };

  /**
   * Count records
   * @param {import("sequelize").Model} model
   * @param {Object} args
   * @param {Context} [ctx]
   * @returns {Promise<void>}
   */
  destroy = async (model, args, ctx) => {
    const transaction = await this._getTransaction(ctx);
    return model.destroy({ ...args, transaction });
  };
}

module.exports = SQLDatabaseManager;
