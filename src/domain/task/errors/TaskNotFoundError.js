const ApplicationError = require("../../../common/errors/ApplicationError");

class TaskNotFoundError extends ApplicationError {
  constructor(id) {
    super({
      code: 404,
      message: `Task '${id}' is not found.`,
    });
  }
}

module.exports = TaskNotFoundError;
