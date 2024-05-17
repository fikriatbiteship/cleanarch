const CommonResult = require("../../common/result");
const Task = require("../entity/Task");

class CreateTaskResult extends CommonResult { 
  /**
   * Create CreateTaskResult instance
   * @param {Object} object
   * @param {Task} object.task
   */
  constructor({ task }) {
    this.task = task;
  }
}

module.exports = CreateTaskResult;
