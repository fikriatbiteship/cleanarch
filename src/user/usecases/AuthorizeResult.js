const Result = require("../../common/Result");

class AuthorizeResult extends Result {
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = AuthorizeResult;
