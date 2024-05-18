const Specification = require("../../common/Specification");
const TaskStatus = require("../Values/TaskStatus");

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
