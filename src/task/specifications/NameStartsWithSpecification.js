const Specification = require("../../common/specification");

class NameStartsWithSpecification extends Specification {
  constructor(value) {
    super()

    this.nameStartsWith = value;
  }
}

module.exports = NameStartsWithSpecification;
