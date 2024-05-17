const CommonRouter = require("../common/router");
const TaskController = require("./TaskController");

class TaskRouter extends CommonRouter {
  /**
   * Creates an instance of TaskController.
   * @param {Object} deps - the dependency of task controller.
   * @param {TaskController} deps.taskController - Task controller.
   */
  constructor({ taskController }) {
    super();

    this.taskController = taskController;
  }

  init() {
    this.router.post("/v1/tasks", this.taskController.createTask);
  }
}

module.exports = TaskRouter;
