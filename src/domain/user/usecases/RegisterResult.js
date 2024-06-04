const Result = require("../../../common/Result");

class RegisterResult extends Result {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = RegisterResult;
