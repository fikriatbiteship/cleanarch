const CommonSpecification = require("../../common/specification");

class UsernameIsSpecification extends CommonSpecification {
  constructor(username) {
    super();

    this.username = username;
  }
}

module.exports = UsernameIsSpecification;
