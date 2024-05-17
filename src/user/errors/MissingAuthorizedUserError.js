const ApplicationError = require("../../common/errors/ApplicationError");

class MissingAuthorizedUserError extends ApplicationError {
  constructor() {
    super({
      code: 401,
      message: "Unauthorized due to missing user.",
    });
  }
}

module.exports = MissingAuthorizedUserError;
