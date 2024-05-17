const ApplicationError = require("../../common/errors/ApplicationError");

class UsernameNotFoundError extends ApplicationError {
  constructor() {
    super({
      code: 404,
      message: "User with that username is not found.",
    });
  }
}

module.exports = UsernameNotFoundError;
