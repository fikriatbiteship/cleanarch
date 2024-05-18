const Router = require("../common/Router");
const UserMiddleware = require("../user/UserMiddleware");
const TaskController = require("./TaskController");

class TaskRouter extends Router {
  /**
   * Creates an instance of TaskController.
   * @param {Object} deps - the dependency of task controller.
   * @param {TaskController} deps.taskController - Task controller.
   * @param {UserMiddleware} deps.userMiddleware - User middleware.
   */
  constructor(deps) {
    super();

    this.taskController = deps.taskController;
    this.userMiddleware = deps.userMiddleware;
  }

  init() {
    this.router.post("/v1/tasks", this.userMiddleware.authorize, this.taskController.createTask);
    this.router.get("/v1/tasks", this.userMiddleware.authorize, this.taskController.listTasks);
    this.router.get("/v1/tasks/:id", this.userMiddleware.authorize, this.taskController.getTask);
    this.router.patch("/v1/tasks/:id", this.userMiddleware.authorize, this.taskController.updateTask);
    this.router.delete("/v1/tasks/:id", this.userMiddleware.authorize, this.taskController.deleteTask);
  }
}

module.exports = TaskRouter;
