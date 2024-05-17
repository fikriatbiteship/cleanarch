const CommonEntity = require("../../common/entity");
const uuid = require("uuid");

class Task extends CommonEntity {
  constructor({ id, name, status, createdAt, updatedAt }) {
    super();

    this.id = id || uuid.v5(username, uuid.v4());
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = Task;
