const Params = require("../../common/params");
const TaskStatus = require("../values/TaskStatus");

class UpdateTaskParams extends Params {
  /**
   * Create UpdateTaskParams instance.
   * @param {Object} v
   * @param {string} v.id
   * @param {string} v.name
   * @param {TaskStatus} v.status
   * @param {string} v.userId
   */
  constructor(v) {
    super();

    this.id = v.id;
    this.name = v.name;
    this.status = v.status;
    this.userId = v.userId;
  }
}

module.exports = UpdateTaskParams;
