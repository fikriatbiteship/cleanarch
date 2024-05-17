const CommonResult = require("../../common/result");

class AuthorizeResult extends CommonResult {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = AuthorizeResult;
