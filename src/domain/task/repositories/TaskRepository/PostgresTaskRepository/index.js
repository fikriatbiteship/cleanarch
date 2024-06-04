const { Op } = require("sequelize");
const TaskRepository = require("..");
const { Task: TaskDB } = require("../../../../../../db/sequelize/models");
const Context = require("../../../../../common/Context");
const Query = require("../../../../../common/Query");
const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const NameEndsWithSpecification = require("../../../Specifications/NameEndsWithSpecification");
const NameIsSpecification = require("../../../Specifications/NameIsSpecification");
const NameLikeSpecification = require("../../../Specifications/NameLikeSpecification");
const NameStartsWithSpecification = require("../../../Specifications/NameStartsWithSpecification");
const OwnerIsSpecification = require("../../../Specifications/OwnerIsSpecification");
const StatusInSpecification = require("../../../Specifications/StatusInSpecification");
const StatusIsSpecification = require("../../../Specifications/StatusIsSpecification");
const StatusNotInSpecification = require("../../../Specifications/StatusNotInSpecification");
const StatusNotSpecification = require("../../../Specifications/StatusNotSpecification");
const Task = require("../../../entity/Task");
const Specification = require("../../../../../common/Specification");
const TaskStatus = require("../../../values/TaskStatus");
const SQLDatabaseManager = require("../../../../../common/manager/database/SQLDatabaseManager");

class PostgresTaskRepository extends TaskRepository {
  /**
   * Create PostgresTaskRepository instance
   * @param {Object} deps
   * @param {SQLDatabaseManager} deps.sqlDatabaseManager
   */
  constructor({ sqlDatabaseManager }) {
    super();

    this.sqlDatabaseManager = sqlDatabaseManager;
  }

  /**
   * Find an Task
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<Task|null>}
   */
  async findOne(specs, ctx) {
    const where = this._where(specs);
    const task = await this.sqlDatabaseManager.findOne(TaskDB, { where }, ctx);
    if (!task) return null;

    return this._entityFromRow(task);
  }

  /**
   * Find tasks
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<Task[]>}
   */
  async find(query, ctx) {
    const where = this._where(query.specs);
    const tasks = await this.sqlDatabaseManager.findAll(TaskDB, { where }, ctx);
    return tasks.map((task) => this._entityFromRow(task));
  }

  /**
   * Get size of tasks
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  async size(specs, ctx) {
    const where = this._where(specs);
    const taskSize = await this.sqlDatabaseManager.count(TaskDB, { where }, ctx);
    return taskSize;
  }

  /**
   * Save an Task.
   * @param {Task} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(task, ctx) {
    return this.sqlDatabaseManager.upsert(TaskDB, { id: task.id, name: task.name, status: task.status.toString(), userId: task.userId, createdAt: task.createdAt, updatedAt: task.updatedAt, }, ctx);
  }

  /**
   * Delete an Task.
   * @param {Task} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(task, ctx) {
    return this.sqlDatabaseManager.destroy(TaskDB, { where: { id: task.id, } }, ctx);
  }

  /**
   * Build Sequelize Query
   * @param {Specification[]} specs
   * @returns {Object}
   */
  _where(specs) {
    const where = {};

    for (const spec of specs) {
      if (spec instanceof IdIsSpecification) {
        where._id = spec.id;
        continue;
      }

      if (spec instanceof OwnerIsSpecification) {
        where.userId = spec.userId;
        continue;
      }

      if (spec instanceof StatusIsSpecification) {
        where.status = spec.status.toString();
        continue;
      }

      if (spec instanceof NameIsSpecification) {
        where.name = spec.name;
        continue;
      }

      if (spec instanceof NameLikeSpecification) {
        where.name = { [Op.iLike]: `%${spec.nameLike}%` };
        continue;
      }

      if (spec instanceof NameStartsWithSpecification) {
        where.name = { [Op.iLike]: `${spec.nameStartsWith}%` };
        continue;
      }

      if (spec instanceof NameEndsWithSpecification) {
        where.name = { [Op.iLike]: `%${spec.nameEndsWith}` };
        continue;
      }

      if (spec instanceof StatusIsSpecification) {
        where.status = spec.status;
        continue;
      }

      if (spec instanceof StatusInSpecification) {
        where.status = { [Op.in]: spec.statusIn };
        continue;
      }

      if (spec instanceof StatusNotSpecification) {
        where.status = { [Op.ne]: spec.status };
        continue;
      }

      if (spec instanceof StatusNotInSpecification) {
        where.status = { [Op.notIn]: spec.statusNotIn };
        continue;
      }
    }

    return where;
  }

  /**
   * Convert row to entity
   * @param {any} row
   * @returns {Task}
   */
  _entityFromRow(row) {
    return new Task({
      id: row.id,
      name: row.name,
      status: new TaskStatus(row.status),
      userId: row.userId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}

module.exports = PostgresTaskRepository;
