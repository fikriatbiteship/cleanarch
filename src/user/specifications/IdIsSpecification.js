const CommonSpecification = require("../../common/specification");

class IdIsSpecification extends CommonSpecification {
  constructor(id) {
    super();

    this.id = id;
  }
}

module.exports = IdIsSpecification;
