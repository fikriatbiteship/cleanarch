const ApplicationError = require("./ApplicationError");

class NotImplementedError extends ApplicationError {
  constructor() {
    super({
      code: 501,
      message: "Method not implemented",
    });
  }
}

module.exports = NotImplementedError;
