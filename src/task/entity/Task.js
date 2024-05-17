const Entity = require("../../common/entity");
const uuid = require("uuid");
const TaskStatus = require("../values/TaskStatus");

class Task extends Entity {
  /**
   * Create CreateTaskService instance
   * @param {Object} object
   * @param {string} object.id
   * @param {string} object.name
   * @param {TaskStatus} object.status
   * @param {Date} object.createdAt
   * @param {Date} object.updatedAt
   */
  constructor({ id, name, status, userId, createdAt, updatedAt }) {
    super();

    this.id = id || uuid.v5(`${this.now().getTime()}-${this.userId}`, uuid.v4());
    this.name = name;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      status: this.status.toString(),
      user_id: this.userId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = Task;
