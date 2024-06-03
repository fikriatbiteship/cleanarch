const Object = require("./Object");

class View extends Object {
  /**
   * Create Pagination Object
   * @param {Object} Object
   * @param {string} Object.name
   * @param {any[]} Object.items
   * @param {number} Object.limit
   * @param {number} Object.offset
   * @param {number} Object.size
   */
  paginate(name, resources, Object) {
    return {
      page: Math.ceil(Object.offset / Object.limit) + 1,
      page_size: Object.limit,
      page_count: Math.ceil(Object.size / Object.limit),
      size: Object.size,
      [name]: resources,
    };
  }
}

module.exports = View;
