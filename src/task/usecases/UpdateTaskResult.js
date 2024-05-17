const Result = require("../../common/result");
const Task = require("../entity/Task");

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