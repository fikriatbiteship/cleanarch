const Specification = require("../../common/specification");

class NameIsSpecification extends Specification {
  constructor(name) {
    super()

    this.name = name;
  }
}

module.exports = NameIsSpecification;
