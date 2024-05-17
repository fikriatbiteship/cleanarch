const NotImplementedError = require("../../common/errors/NotImplementedError");
const CommonView = require("../../common/view");
const CreateTaskResult = require("../usecases/CreateTaskResult");

class TaskView extends CommonView {
  /**
   * Render create task view.
   * @param {CreateTaskResult} result
   */
  createTask(result) {
    throw new NotImplementedError();
  }

  /**
   * Render update task view.
   * @param {UpdateTaskResult} result
   */
  updateTask(result) {
    throw new NotImplementedError();
  }

  /**
   * Render get task view.
   * @param {GetTaskResult} result
   */
  getTask(result) {
    throw new NotImplementedError();
  }

  /**
   * Render list tasks view.
   * @param {ListTasksResult} result
   */
  listTasks(result) {
    throw new NotImplementedError();
  }
}

module.exports = TaskView;
