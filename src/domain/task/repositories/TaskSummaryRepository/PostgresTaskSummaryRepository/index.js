const TaskSummaryRepository = require("..");
const { TaskSummary: TaskSummaryDB } = require("../../../../../../db/sequelize/models");
const Context = require("../../../../../common/Context");
const Query = require("../../../../../common/Query");
const OwnerIsSpecification = require("../../../Specifications/OwnerIsSpecification");
const TaskSummary = require("../../../entity/TaskSummary");
const Specification = require("../../../../../common/Specification");
const SQLDatabaseManager = require("../../../../../common/manager/database/SQLDatabaseManager");

class PostgresTaskSummaryRepository extends TaskSummaryRepository {
  /**
   * Create PostgresTaskSummaryRepository instance
   * @param {Object} deps
   * @param {SQLDatabaseManager} deps.sqlDatabaseManager
   */
  constructor({ sqlDatabaseManager }) {
    super();

    this.sqlDatabaseManager = sqlDatabaseManager;
  }

  /**
   * Find an TaskSummary
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary|null>}
   */
  findOne = async (specs, ctx) => {
    const where = this._where(specs);
    const taskSummary = await this.sqlDatabaseManager.findOne(TaskSummaryDB, { where }, ctx);
    if (!taskSummary) return null;
    return this._entityFromRow(taskSummary);
  };

  /**
   * Find taskSummaries
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary[]>}
   */
  async find(query, ctx) {
    const where = this._where(query.specs);
    const taskSummaries = await this.sqlDatabaseManager.findAll(TaskSummaryDB, { where }, ctx);
    return taskSummaries.map((task) => this._entityFromRow(task));
  }

  /**
   * Get size of taskSummaries
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  async size(specs, ctx) {
    const where = this._where(specs);
    const taskSummarySize = await this.sqlDatabaseManager.count(TaskSummaryDB, { where }, ctx);
    return taskSummarySize;
  }

  /**
   * Save an TaskSummary.
   * @param {TaskSummary} taskSummary
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(taskSummary, ctx) {
    return this.sqlDatabaseManager.upsert(
      TaskSummaryDB,
      {
        id: taskSummary.id,
        todoCount: taskSummary.todoCount,
        ongoingCount: taskSummary.ongoingCount,
        doneCount: taskSummary.doneCount,
        userId: taskSummary.userId,
        createdAt: taskSummary.createdAt,
        updatedAt: taskSummary.updatedAt,
      },
      ctx,
    );
  }

  /**
   * Delete an TaskSummary.
   * @param {TaskSummary} taskSummary
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(taskSummary, ctx) {
    return this.sqlDatabaseManager.destroy(TaskSummaryDB, { where: { id: taskSummary.id } }, ctx);
  }

  /**
   * Build Sequelize Query
   * @param {Specification[]} specs
   * @returns {Object}
   */
  _where(specs) {
    const where = {};

    for (const spec of specs) {
      if (spec instanceof OwnerIsSpecification) {
        where.userId = spec.userId;
        continue;
      }
    }

    return where;
  }

  /**
   * Convert row to entity
   * @param {any} row
   * @returns {TaskSummary}
   */
  _entityFromRow(row) {
    return new TaskSummary({
      id: row.id,
      todoCount: row.todoCount,
      ongoingCount: row.ongoingCount,
      doneCount: row.doneCount,
      userId: row.userId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}

module.exports = PostgresTaskSummaryRepository;
