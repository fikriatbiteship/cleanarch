const Params = require("../../common/Params");
const LoginRequest = require("../requests/LoginRequest");

class LoginParams extends Params {
  constructor({ username, password }) {
    super();

    this.username = username.toLowerCase();
    this.password = password;
  }

  /**
   * Create LoginParams from LoginRequest
   * @param {LoginRequest} request 
   */
  static fromRequest(request) {
    const params = new this({
      username: request.username,
      password: request.password,
    })

    return params;
  }
}

module.exports = LoginParams;
