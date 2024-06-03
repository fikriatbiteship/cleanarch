const Result = require("../../common/Result");
const Session = require("../entity/Session");

class LoginResult extends Result {
  /**
   * Creates an instance of LoginResult.
   * @param {Object} values
   * @param {Session} values.session
   */
  constructor(values) {
    super();

    this.session = values.session;
  }
}

module.exports = LoginResult;
