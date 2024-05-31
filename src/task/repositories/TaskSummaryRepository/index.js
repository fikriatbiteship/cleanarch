const NotImplementedError = require("../../../common/errors/NotImplementedError");
const Repository = require("../../../common/Repository");
const TaskSummary = require("../../entity/TaskSummary");
const Specification = require("../../../common/Specification");
const Query = require("../../../common/Query");

class TaskSummaryRepository extends Repository {
  /**
   * Find an taskSummary
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary[]>}
   */
  findOne(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Find taskSummaries
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary>}
   */
  find(query, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Get size of taskSummaries
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  size(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Save an taskSummary.
   * @param {TaskSummary} taskSummary
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(taskSummary, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Delete an taskSummary.
   * @param {TaskSummary} taskSummary
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(taskSummary, ctx) {
    throw new NotImplementedError();
  }
}

module.exports = TaskSummaryRepository;
