const CommonController = require("../common/controller");
const CreateTaskParams = require("./usecases/CreateTaskParams");
const CreateTaskService = require("./usecases/CreateTaskService");
const TaskView = require("./views/TaskView");

class TaskController extends CommonController {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user controller.
   * @param {CreateTaskService} deps.createTaskService - object that implements create task service business logic.
   * @param {UpdateTaskService} deps.updateTaskService - object that implements update task service business logic.
   * @param {GetTaskService} deps.getTaskService - object that implements get task service business logic.
   * @param {ListTasksService} deps.listTasksService - object that implements list tasks service business logic.
   * @param {TaskView} deps.taskView - object that handle task views.
   */
  constructor(deps) {
    super();

    this.createTaskService = deps.createTaskService;
    this.taskView = deps.taskView;
  }

  createTask = this.asyncHandler(async (req, res, next) => {
    const result = await this.createTaskService.call(
      new CreateTaskParams({
        name: req.body.name,
        userId: req.user.id,
      }),
    );

    res.status(201).json(this.taskView.createTask(result));
  });

  updateTask = this.asyncHandler((req, res, next) => {});

  getTask = this.asyncHandler((req, res, next) => {});

  listTasks = this.asyncHandler((req, res, next) => {});

  deleteTask = this.asyncHandler((req, res, next) => {});
}

module.exports = TaskController;
