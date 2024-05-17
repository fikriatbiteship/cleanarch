const CommonView = require("../common/view");
const LoginResult = require("./usecases/LoginResult");
const RegisterResult = require("./usecases/RegisterResult");

class UserView extends CommonView {
  /**
   * Lorem ipsum dolor sit amet.
   * @param {LoginResult} loginResult
   */
  loginResponseJSON(loginResult) {
    return {
      session: loginResult.session.toJSON(),
    };
  }

  /**
   * Lorem ipsum dolor sit amet.
   * @param {RegisterResult} registerResult
   */
  registerResponseJSON(registerResult) {
    return {
      user: registerResult.user.toJSON(),
    };
  }

  /**
   * Lorem ipsum dolor sit amet.
   * @param {RegisterResult} registerResult
   */
  whoamiResponseJSON(user) {
    return {
      user: user.toJSON(),
    };
  }
}

module.exports = UserView;
