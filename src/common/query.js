const CommonObject = require("./object");
const CommonSpecification = require("./specification");

class Query extends CommonObject {
  /**
   * Create query object to be used to call repository.
   * @param {Object} params
   * @param {CommonSpecification[]} params.specs
   * @param {string} params.sort
   * @param {number} params.limit
   * @param {offset} params.offset
   */
  constructor(params) {
    this.specs = params.specs;
    this.sort = params.sort;
    this.limit = params.limit || 10;
    this.offset = params.offset || 0;
  }
}

module.exports = Query;
