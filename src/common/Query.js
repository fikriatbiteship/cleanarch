const Object = require("./Object");
const Specification = require("./Specification");

class Query extends Object {
  /**
   * Create query Object to be used to call repository.
   * @param {Object} params
   * @param {Specification[]} params.specs
   * @param {string} params.sort
   * @param {number} params.limit
   * @param {offset} params.offset
   */
  constructor(params) {
    super();

    this.specs = params.specs;
    this.sort = params.sort;
    this.limit = params.limit || 10;
    this.offset = params.offset || 0;
  }
}

module.exports = Query;
