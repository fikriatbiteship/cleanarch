const ApplicationError = require("../../common/errors/ApplicationError");

class InvalidTaskStatusError extends ApplicationError {
  constructor(status) {
    super({
      code: 422,
      message: `Status '${status}' is not a valid status.`,
    });
  }
}

module.exports = InvalidTaskStatusError;
