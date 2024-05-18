const Value = require("../../common/Value");
const InvalidTaskStatusError = require("../errors/InvalidTaskStatusError");

class TaskStatus extends Value {
  static Todo = new TaskStatus("todo");
  static Ongoing = new TaskStatus("ongoing");
  static Done = new TaskStatus("done");

  constructor(status) {
    super();

    this.value = status;
  }

  valid() {
    return [TaskStatus.Todo.value, TaskStatus.Ongoing.value, TaskStatus.Done.value].includes(this.value);
  }

  equals(other) {
    return other instanceof TaskStatus && this.value === other.value;
  }

  toString() {
    return this.value;
  }
}

module.exports = TaskStatus;
