const Specification = require("../../common/specification");

class OwnerIsSpecification extends Specification {
  constructor(userId) {
    super();

    this.userId = userId;
  }
}

module.exports = OwnerIsSpecification;
