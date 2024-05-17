const CommonResult = require("../../common/result");
const Session = require("../entity/Session");

class LoginResult extends CommonResult {
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
