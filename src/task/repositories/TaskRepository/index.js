const NotImplementedError = require("../../../common/errors/NotImplementedError");
const CommonRepository = require("../../../common/repository");
const Task = require("../../entity/Task");
const CommonSpecification = require("../../../common/specification");
const Query = require("../../../common/query");

class TaskRepository extends CommonRepository {
  /**
   * Find a task
   * @param {CommonSpecification[]} _specs
   * @returns {Promise<Task>}
   */
  async findOne(_specs) {
    throw new NotImplementedError();
  }

  /**
   * Find tasks
   * @param {Query} _query
   * @returns {Promise<Task[]>}
   */
  async find(_query) {
    throw new NotImplementedError();
  }

  /**
   * Save task
   * @param {Task} _task
   * @returns {Promise<boolean>}
   */
  async save(_task) {
    throw new NotImplementedError();
  }

  /**
   * Delete task
   * @param {Task} _task
   * @returns {Promise<boolean>}
   */
  async delete(_task) {
    throw new NotImplementedError();
  }
}

module.exports = TaskRepository;
