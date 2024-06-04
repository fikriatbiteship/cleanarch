const ApplicationError = require("../../../common/errors/ApplicationError");

class MissingAccessTokenError extends ApplicationError {
  constructor() {
    super({
      code: 401,
      message: "Unauthorized due to missing access token.",
    });
  }
}

module.exports = MissingAccessTokenError;
