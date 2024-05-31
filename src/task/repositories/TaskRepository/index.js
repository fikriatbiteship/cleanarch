const NotImplementedError = require("../../../common/errors/NotImplementedError");
const Repository = require("../../../common/Repository");
const Task = require("../../Task/Task");
const Specification = require("../../../common/Specification");
const Query = require("../../../common/Query");

class TaskRepository extends Repository {
 
  /**
   * Find an Task
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<Task[]>}
   */
  findOne(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Find tasks
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<Task>}
   */
  find(query, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Get size of tasks
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  size(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Save an Task.
   * @param {Task} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(task, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Delete an Task.
   * @param {Task} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(task, ctx) {
    throw new NotImplementedError();
  }
}

module.exports = TaskRepository;
