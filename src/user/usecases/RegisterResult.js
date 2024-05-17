const CommonResult = require("../../common/result");

class RegisterResult extends CommonResult {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = RegisterResult;
