const Specification = require("../../common/specification");

class NameLikeSpecification extends Specification {
  constructor(value) {
    super()

    this.nameLike = value;
  }
}

module.exports = NameLikeSpecification;
