const Params = require("../../../common/Params");

class CreateTaskParams extends Params {
  constructor({ name, userId }) {
    super();

    this.name = name;
    this.userId = userId;
  }
}

module.exports = CreateTaskParams;
