const Manager = require("../Manager");
const bcrypt = require("bcrypt");

class HashManager extends Manager {
  hash(value) {
    return bcrypt.hashSync(value, 10);
  }

  compare(value, encryptedValue) {
    return bcrypt.compareSync(value, encryptedValue);
  }
}

module.exports = HashManager;
