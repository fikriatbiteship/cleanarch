const Params = require("../../common/params");

class RegisterParams extends Params {
  constructor({ username, password }) {
    super();

    this.username = username.toLowerCase();
    this.password = password;
  }
}

module.exports = RegisterParams;
