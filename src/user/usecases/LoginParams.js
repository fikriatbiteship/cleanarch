const CommonParams = require("../../common/params");

class LoginParams extends CommonParams {
  constructor({ username, password }) {
    super();

    this.username = username.toLowerCase();
    this.password = password;
  }
}

module.exports = LoginParams;
