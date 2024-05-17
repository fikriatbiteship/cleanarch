const Result = require("../../common/result");

class RegisterResult extends Result {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = RegisterResult;
