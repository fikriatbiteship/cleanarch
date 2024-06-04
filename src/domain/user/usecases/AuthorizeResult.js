const Result = require("../../../common/Result");
const User = require("../entity/User");

class AuthorizeResult extends Result {
  /**
   * Creates an instance of UserController.
   * @param {Object} object - the dependency of user Middleware.
   * @param {User} object.User
   */
  constructor({ user }) {
    super();

    this.user = user;
  }
}

module.exports = AuthorizeResult;
