const Request = require("../../../common/Request");

class CreateTaskRequest extends Request {
  static schema = {
    name: { type: "string", min: 3, max: 255, pattern: /^[A-Z_]+$/ },
  };

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest(req) {
    const request = new this({
      name: req.body["name"],
    });

    return request.validate();
  }

  /**
   * Create LoginRequest instance
   * @param {Object} values
   * @param {string} values.name
   */
  constructor(values) {
    super();

    this.name = values.name;
  }
}

module.exports = CreateTaskRequest;
