const Params = require("../../../common/Params");
const RegisterRequest = require("../requests/RegisterRequest");

class RegisterParams extends Params {
  constructor({ username, password }) {
    super();

    this.username = username.toLowerCase();
    this.password = password;
  }

  /**
   * Create RegisterParams from RegisterRequest
   * @param {RegisterRequest} request
   */
  static fromRequest(request) {
    const params = new this({
      username: request.username,
      password: request.password,
    });

    return params;
  }
}

module.exports = RegisterParams;
