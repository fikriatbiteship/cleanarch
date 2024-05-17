const Specification = require("../../common/specification");

class UsernameIsSpecification extends Specification {
  constructor(username) {
    super();

    this.username = username;
  }
}

module.exports = UsernameIsSpecification;
