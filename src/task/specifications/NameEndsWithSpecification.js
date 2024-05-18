const Specification = require("../../common/Specification");

class NameEndsWithSpecification extends Specification {
  constructor(value) {
    super();

    this.nameEndsWith = value;
  }
}

module.exports = NameEndsWithSpecification;
