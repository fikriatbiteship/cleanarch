const { toScreamingSnakeCase } = require("../../utils/string");

class ApplicationError extends Error {
  constructor({ code, message, details = [] }) {
    super(message);

    this.code = code;
    this.details = details;
  }

  getName() {
    return toScreamingSnakeCase(this.constructor.name);
  }

  toJSON() {
    const error = {
      name: this.getName(),
      code: this.code,
      message: this.message,
    };

    if (Array.isArray(this.details) && this.details.length > 0) error.details = this.details;

    return { error };
  }
}

module.exports = ApplicationError;
