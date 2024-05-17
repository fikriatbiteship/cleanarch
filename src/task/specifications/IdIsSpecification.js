const Specification = require("../../common/specification");

class IdIsSpecification extends Specification {
  constructor(id) {
    super()

    this.id = id;
  }
}

module.exports = IdIsSpecification;
