const ApplicationError = require("../../common/errors/ApplicationError");

class PasswordInvalidError extends ApplicationError {
  constructor() {
    super({
      message: "Password is not valid.",
      code: 401,
    });
  }
}

module.exports = PasswordInvalidError;
