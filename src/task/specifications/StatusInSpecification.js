const Specification = require("../../common/specification");
const TaskStatus = require("../values/TaskStatus");

class StatusInSpecification extends Specification {
  /**
   * Status is specification
   * @param {TaskStatus} statusIn
   */
  constructor(statusIn) {
    super();

    this.statusIn = statusIn;
  }
}

module.exports = StatusInSpecification;
