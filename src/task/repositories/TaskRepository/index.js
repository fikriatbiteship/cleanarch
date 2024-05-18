const NotImplementedError = require("../../../common/errors/NotImplementedError");
const Repository = require("../../../common/Repository");
const Task = require("../../Entity/Task");
const Specification = require("../../../common/Specification");
const Query = require("../../../common/Query");

class TaskRepository extends Repository {
  /**
   * Find a task
   * @param {...Specification} specs
   * @returns {Promise<Task>}
   */
  async findOne(...specs) {
    throw new NotImplementedError();
  }

  /**
   * Find tasks
   * @param {Query} query
   * @returns {Promise<Task[]>}
   */
  async find(query) {
    throw new NotImplementedError();
  }

  /**
   * Get tasks size
   * @param {...Specification} specs
   * @returns {Promise<number>}
   */
  async size(...specs) {
    throw new NotImplementedError();
  }

  /**
   * Save task
   * @param {Task} task
   * @returns {Promise<boolean>}
   */
  async save(task) {
    throw new NotImplementedError();
  }

  /**
   * Delete task
   * @param {Task} task
   * @returns {Promise<boolean>}
   */
  async delete(task) {
    throw new NotImplementedError();
  }
}

module.exports = TaskRepository;
