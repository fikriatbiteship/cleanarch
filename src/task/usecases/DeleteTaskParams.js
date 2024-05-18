const Params = require("../../common/Params");

class DeleteTaskParams extends Params {
  /**
   * Create DeleteTaskParams instance
   * @param {Object} v
   * @param {string} v.id
   * @param {string} v.userId
   */
  constructor(v) {
    super();

    this.id = v.id;
    this.userId = v.userId;
  }
}

module.exports = DeleteTaskParams;
