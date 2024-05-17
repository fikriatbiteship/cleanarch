const Specification = require("../../common/specification");
const TaskStatus = require("../values/TaskStatus");

class StatusNotInSpecification extends Specification {
  /**
   * Status is specification
   * @param {...TaskStatus} statusNotIn
   */
  constructor(statusNotIn) {
    super();

    this.statusNotIn = statusNotIn;
  }
}

module.exports = StatusNotInSpecification;
