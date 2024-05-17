const CommonParams = require("../../common/params");

class CreateTaskParams extends CommonParams {
  constructor({ name, userId }) {
    this.name = name;
    this.userId = userId;
  }
}

module.exports = CreateTaskParams;
