const Params = require("../../common/params");

class GetTaskParams extends Params {
  /**
   * Create CreateTaskService instance
   * @param {Object} object
   * @param {string} object.id
   * @param {string} object.userId
   */
  constructor({ id, userId }) {
    super()

    this.id = id;
    this.userId = userId;
  }
}

module.exports = GetTaskParams;
