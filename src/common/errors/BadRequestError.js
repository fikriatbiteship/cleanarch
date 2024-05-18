const ApplicationError = require("./ApplicationError");

class BadRequestError extends ApplicationError {
  /**
   * @param {import("fastest-validator").ValidationError[]} errors
   */
  constructor(errors) {
    super({
      code: 400,
      message: "Bad request.",
      details: errors.map((error) => ({
        parameter: error.field,
        message: error.message,
        expected: error.expected,
      })),
    });
  }
}

module.exports = BadRequestError;
