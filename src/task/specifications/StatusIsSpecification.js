const Specification = require("../../common/specification");
const TaskStatus = require("../values/TaskStatus");

class StatusIsSpecification extends Specification {
  /**
   * Status is specification
   * @param {TaskStatus} status
   */
  constructor(status) {
    super();

    this.status = status;
  }
}

module.exports = StatusIsSpecification;
