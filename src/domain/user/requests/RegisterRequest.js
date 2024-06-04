const Request = require("../../../common/Request");

class RegisterRequest extends Request {
  static schema = {
    username: { type: "string", min: 3, max: 255, pattern: /^[a-zA-Z0-9_]+$/ },
    password: { type: "string" },
  };

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest(req) {
    const request = new this({
      username: req.body["username"],
      password: req.body["password"],
    });

    return request.validate();
  }

  /**
   * Create RegisterRequest instance
   * @param {Object} values
   * @param {string} values.username
   * @param {string} values.password
   */
  constructor(values) {
    super();

    this.username = values.username;
    this.password = values.password;
  }
}

module.exports = RegisterRequest;
