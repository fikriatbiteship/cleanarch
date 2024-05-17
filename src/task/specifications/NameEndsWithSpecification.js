const Specification = require("../../common/specification");

class NameEndsWithSpecification extends Specification {
  constructor(value) {
    super()

    this.nameEndsWith = value;
  }
}

module.exports = NameEndsWithSpecification;
