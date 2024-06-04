const Entity = require("../../../common/Entity");
const uuid = require("uuid");

class TaskSummary extends Entity {
  /**
   * Create CreateTaskService instance
   * @param {Object} object
   * @param {string} object.id
   * @param {number} object.todoCount
   * @param {number} object.ongoingCount
   * @param {number} object.doneCount
   * @param {string} object.userId
   * @param {Date} object.createdAt
   * @param {Date} object.updatedAt
   */
  constructor({ id, todoCount, ongoingCount, doneCount, userId, createdAt, updatedAt }) {
    super();

    this.id = id || uuid.v5(`${this.now().getTime()}-${this.userId}`, uuid.v4());
    this.todoCount = todoCount;
    this.ongoingCount = ongoingCount;
    this.doneCount = doneCount;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      todo_count: this.todoCount,
      ongoing_count: this.ongoingCount,
      done_count: this.doneCount,
      user_id: this.userId,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}

module.exports = TaskSummary;
