const Object = require("./object");

class View extends Object {
  /**
   * Create Pagination Object
   * @param {Object} object
   * @param {string} object.name
   * @param {any[]} object.items
   * @param {number} object.limit
   * @param {number} object.offset
   * @param {number} object.size
   */
  paginate(name, resources, object) {
    return {
      page: Math.ceil(object.offset / object.limit) + 1,
      page_size: object.limit,
      page_count: Math.ceil(object.size / object.limit),
      size: object.size,
      [name]: resources,
    };
  }
}

module.exports = View;
