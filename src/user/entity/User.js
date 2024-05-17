const CommonEntity = require("../../common/entity");
const uuid = require("uuid");

class User extends CommonEntity {
  constructor({ id, username, encryptedPassword, createdAt, updatedAt }) {
    super();

    this.id = id || uuid.v5(username, uuid.v4());
    this.username = username;
    this.encryptedPassword = encryptedPassword;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = User;
