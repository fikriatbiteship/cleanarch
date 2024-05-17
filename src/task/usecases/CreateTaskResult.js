const Result = require("../../common/result");
const Task = require("../entity/Task");

class CreateTaskResult extends Result {
  /**
   * Create CreateTaskResult instance
   * @param {Object} object
   * @param {Task} object.task
   */
  constructor({ task }) {
    super()

    this.task = task;
  }
}

module.exports = CreateTaskResult;
