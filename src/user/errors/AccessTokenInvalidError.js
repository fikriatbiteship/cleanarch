const ApplicationError = require("../../common/errors/ApplicationError");

class AccessTokenInvalidError extends ApplicationError {
  constructor() {
    super({
      message: "Access token is not valid.",
      code: 401,
    });
  }
}

module.exports = AccessTokenInvalidError;
