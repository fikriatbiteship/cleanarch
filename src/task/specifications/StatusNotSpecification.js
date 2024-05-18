const Specification = require("../../common/Specification");
const TaskStatus = require("../Values/TaskStatus");

class StatusNotSpecification extends Specification {
  /**
   * Status is specification
   * @param {TaskStatus} status
   */
  constructor(status) {
    super();

    this.status = status;
  }
}

module.exports = StatusNotSpecification;
