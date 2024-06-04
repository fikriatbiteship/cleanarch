const Result = require("../../../common/Result");
const Task = require("../entity/Task");

class GetTaskResult extends Result {
  /**
   * Get GetTaskResult instance
   * @param {Object} object
   * @param {Task} object.task
   */
  constructor({ task }) {
    super();

    this.task = task;
  }
}

module.exports = GetTaskResult;
