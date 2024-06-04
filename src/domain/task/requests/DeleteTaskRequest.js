const Request = require("../../../common/Request");

class DeleteTaskRequest extends Request {
  static schema = {
    id: { type: "uuid" },
    userId: { type: "uuid" },
  };

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest(req) {
    const request = new this({
      id: req.params.id,
      userId: req.user.id,
    });

    return request.validate();
  }

  /**
   * Create DeleteTaskRequest instance
   * @param {Object} values
   * @param {string} values.id
   */
  constructor(values) {
    super();

    this.id = values.id;
    this.userId = values.userId;
  }
}

module.exports = DeleteTaskRequest;
