const { toScreamingSnakeCase } = require("../../utils/string");

class ApplicationError extends Error {
  constructor({ code, message }) {
    super(message);

    this.code = code;
  }

  getName() {
    return toScreamingSnakeCase(this.constructor.name);
  }

  toJSON() {
    return {
      error: {
        name: this.getName(),
        code: this.code,
        message: this.message,
      },
    };
  }
}

module.exports = ApplicationError;
