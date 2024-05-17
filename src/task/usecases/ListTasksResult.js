const Result = require("../../common/result");
const Task = require("../entity/Task");

class ListTasksResult extends Result {
  /**
   * Create ListTasksResult instance
   * @param {Object} v
   * @param {Task[]} v.tasks
   * @param {number} v.size
   * @param {number} v.limit
   * @param {number} v.offset
   */
  constructor(v) {
    super();
    this.tasks = v.tasks;
    this.size = v.size;
    this.limit = v.limit;
    this.offset = v.offset;
  }
}

module.exports = ListTasksResult;
