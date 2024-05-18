const Params = require("../../common/Params");

class LoginParams extends Params {
  constructor({ username, password }) {
    super();

    this.username = username.toLowerCase();
    this.password = password;
  }
}

module.exports = LoginParams;
