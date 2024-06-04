const Specification = require("../../../common/Specification");

class UsernameIsSpecification extends Specification {
  constructor(username) {
    super();

    this.username = username;
  }
}

module.exports = UsernameIsSpecification;
