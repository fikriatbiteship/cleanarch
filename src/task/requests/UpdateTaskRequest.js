const Request = require("../../common/Request");
const TaskStatus = require("../values/TaskStatus");

class UpdateTaskRequest extends Request {
  static schema = {
    userId: { type: "uuid" },
    name: { type: "string", min: 3, max: 255, pattern: /^[A-Z_]+$/ },
    status: { type: "string", enum: TaskStatus.values(), optional: true },
  };

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest(req) {
    const request = new this({
      userId: req.user.id,
      name: req.body["name"],
      status: req.body["status"],
    });

    return request.validate();
  }

  /**
   * Create UpdateTaskRequest instance
   * @param {Object} values
   * @param {string} values.userId
   * @param {string} values.name
   * @param {string} values.status
   */
  constructor(values) {
    super();

    this.userId = values.userId;
    this.name = values.name;
    this.status = values.status;
  }
}

module.exports = UpdateTaskRequest;
