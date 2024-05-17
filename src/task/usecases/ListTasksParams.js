const Params = require("../../common/params");

class ListTasksParams extends Params {
  /**
   * Create ListTasksParams instance
   * @param {Object} v
   * @param {string} v.name
   * @param {string} v.nameLike
   * @param {string} v.nameStartsWith
   * @param {string} v.nameEndsWith
   * @param {string} v.status
   * @param {string[]} v.statusIn
   * @param {string} v.statusNot
   * @param {string[]} v.statusNotIn
   * @param {string} v.userId
   * @param {number} v.limit
   * @param {number} v.offset
   */
  constructor(v) {
    super();
    this.name = v.name;
    this.nameLike = v.nameLike;
    this.nameStartsWith = v.nameStartsWith;
    this.nameEndsWith = v.nameEndsWith;
    this.status = v.status;
    this.statusIn = v.statusIn;
    this.statusNot = v.statusNot;
    this.statusNotIn = v.statusNotIn;
    this.userId = v.userId;
    this.limit = v.limit;
    this.offset = v.offset;
  }
}

module.exports = ListTasksParams;
