const ApplicationError = require("../../../common/errors/ApplicationError");

class UsernameAlreadyTakenError extends ApplicationError {
  constructor() {
    super({
      code: 422,
      message: "Username already taken.",
    });
  }
}

module.exports = UsernameAlreadyTakenError;
