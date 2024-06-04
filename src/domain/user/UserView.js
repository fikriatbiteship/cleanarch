const View = require("../../common/View");
const LoginResult = require("./usecases/LoginResult");
const RegisterResult = require("./usecases/RegisterResult");

class UserView extends View {
  /**
   * Lorem ipsum dolor sit amet.
   * @param {LoginResult} loginResult
   */
  login(loginResult) {
    return {
      session: loginResult.session.toJSON(),
    };
  }

  /**
   * Lorem ipsum dolor sit amet.
   * @param {RegisterResult} registerResult
   */
  register(registerResult) {
    return {
      user: registerResult.user.toJSON(),
    };
  }

  /**
   * Lorem ipsum dolor sit amet.
   * @param {RegisterResult} registerResult
   */
  whoami(user) {
    return {
      user: user.toJSON(),
    };
  }
}

module.exports = UserView;
