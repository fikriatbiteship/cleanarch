const Result = require("../../common/result");

class AuthorizeResult extends Result {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = AuthorizeResult;
