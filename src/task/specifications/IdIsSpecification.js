const Specification = require("../../common/Specification");

class IdIsSpecification extends Specification {
  constructor(id) {
    super();

    this.id = id;
  }
}

module.exports = IdIsSpecification;
