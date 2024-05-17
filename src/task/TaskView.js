const CreateTaskResult = require("./usecases/CreateTaskResult");
const GetTaskResult = require("./usecases/GetTaskResult");
const ListTasksResult = require("./usecases/ListTasksResult");
const UpdateTaskResult = require("./usecases/UpdateTaskResult");
const View = require("../common/view");

class TaskView extends View {
  /**
   * Render create task view.
   * @param {CreateTaskResult} result
   */
  createTask(result) {
    return {
      task: result.task.toJSON(),
    };
  }

  /**
   * Render get task view.
   * @param {GetTaskResult} result
   */
  getTask(result) {
    return {
      task: result.task.toJSON(),
    };
  }

  /**
   * Render update task view.
   * @param {UpdateTaskResult} result
   */
  updateTask(result) {
    return {
      task: result.task.toJSON(),
    };
  }

  /**
   * Render list tasks view.
   * @param {ListTasksResult} result
   */
  listTasks(result) {
    return this.paginate(
      "tasks",
      result.tasks.map((task) => task.toJSON()),
      result,
    );
  }
}

module.exports = TaskView;
