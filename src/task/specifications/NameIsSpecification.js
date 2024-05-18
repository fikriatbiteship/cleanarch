const Specification = require("../../common/Specification");

class NameIsSpecification extends Specification {
  constructor(name) {
    super();

    this.name = name;
  }
}

module.exports = NameIsSpecification;
