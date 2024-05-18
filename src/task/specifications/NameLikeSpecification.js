const Specification = require("../../common/Specification");

class NameLikeSpecification extends Specification {
  constructor(value) {
    super();

    this.nameLike = value;
  }
}

module.exports = NameLikeSpecification;
