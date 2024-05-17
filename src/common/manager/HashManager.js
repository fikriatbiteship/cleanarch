const CommonManager = require("./CommonManager");
const bcrypt = require("bcrypt");

class HashManager extends CommonManager {
  hash(value) {
    return bcrypt.hashSync(value, 10);
  }

  compare(value, encryptedValue) {
    return bcrypt.compareSync(value, encryptedValue);
  }
}

module.exports = HashManager;
