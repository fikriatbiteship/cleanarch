const Specification = require("../../common/Specification");

class NameStartsWithSpecification extends Specification {
  constructor(value) {
    super();

    this.nameStartsWith = value;
  }
}

module.exports = NameStartsWithSpecification;
