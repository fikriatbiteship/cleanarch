const Result = require("../../common/Result");
const Task = require("../Entity/Task");

class UpdateTaskResult extends Result {
  /**
   * Create UpdateTaskResult instance.
   * @param {Object} v
   * @param {Task} v.task
   */
  constructor(v) {
    super();

    this.task = v.task;
  }
}

module.exports = UpdateTaskResult;
