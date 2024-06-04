const Specification = require("../../../common/Specification");

class OwnerIsSpecification extends Specification {
  constructor(userId) {
    super();

    this.userId = userId;
  }
}

module.exports = OwnerIsSpecification;
