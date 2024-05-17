const CreateTaskResult = require("../usecases/CreateTaskResult");
const TaskView = require("./TaskView");

class TaskJSONView extends TaskView {
  /**
   * Render create task view.
   * @param {CreateTaskResult} result
   */
  createTask(result) {
    return {
      task: result.task.toJSON(),
    };
  }
}

module.exports = TaskJSONView;
