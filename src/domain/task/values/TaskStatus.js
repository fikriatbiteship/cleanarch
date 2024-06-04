const Value = require("../../../common/Value");

class TaskStatus extends Value {
  static Todo = new TaskStatus("TODO");
  static Ongoing = new TaskStatus("ONGOING");
  static Done = new TaskStatus("DONE");

  static values() {
    return [TaskStatus.Todo.value, TaskStatus.Ongoing.value, TaskStatus.Done.value];
  }

  constructor(status) {
    super();

    this.value = status;
  }

  valid() {
    return this.constructor.values.includes(this.value);
  }

  equals(other) {
    return other instanceof TaskStatus && this.value === other.value;
  }

  toString() {
    return this.value;
  }
}

module.exports = TaskStatus;
