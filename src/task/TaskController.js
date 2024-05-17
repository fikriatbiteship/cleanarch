const Controller = require("../common/controller");
const CreateTaskParams = require("./usecases/CreateTaskParams");
const CreateTaskService = require("./usecases/CreateTaskService");
const GetTaskParams = require("./usecases/GetTaskParams");
const GetTaskService = require("./usecases/GetTaskService");
const ListTasksParams = require("./usecases/ListTasksParams");
const ListTasksService = require("./usecases/ListTasksService");
const UpdateTaskParams = require("./usecases/UpdateTaskParams");
const UpdateTaskService = require("./usecases/UpdateTaskService");
const TaskStatus = require("./values/TaskStatus");
const TaskView = require("./TaskView");
const DeleteTaskService = require("./usecases/DeleteTaskService");
const DeleteTaskParams = require("./usecases/DeleteTaskParams");

class TaskController extends Controller {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user controller.
   * @param {CreateTaskService} deps.createTaskService - object that implements create task service business logic.
   * @param {UpdateTaskService} deps.updateTaskService - object that implements update task service business logic.
   * @param {GetTaskService} deps.getTaskService - object that implements get task service business logic.
   * @param {ListTasksService} deps.listTasksService - object that implements list tasks service business logic.
   * @param {DeleteTaskService} deps.deleteTaskService - object that implements delete task service business logic.
   * @param {TaskView} deps.taskView - object that handle task views.
   */
  constructor(deps) {
    super();

    this.createTaskService = deps.createTaskService;
    this.getTaskService = deps.getTaskService;
    this.deleteTaskService = deps.deleteTaskService;
    this.updateTaskService = deps.updateTaskService;
    this.listTasksService = deps.listTasksService;
    this.taskView = deps.taskView;
  }

  createTask = this.asyncHandler(async (req, res) => {
    const result = await this.createTaskService.call(
      new CreateTaskParams({
        name: req.body.name,
        userId: req.user.id,
      }),
    );

    res.status(201).json(this.taskView.createTask(result));
  });

  updateTask = this.asyncHandler(async (req, res) => {
    const result = await this.updateTaskService.call(
      new UpdateTaskParams({
        id: req.params.id,
        name: req.body.name,
        status: new TaskStatus(req.body.status),
        userId: req.user.id,
      }),
    );

    res.status(200).json(this.taskView.createTask(result));
  });

  getTask = this.asyncHandler(async (req, res) => {
    const result = await this.getTaskService.call(
      new GetTaskParams({
        id: req.params.id,
        userId: req.user.id,
      }),
    );

    res.status(200).json(this.taskView.getTask(result));
  });

  listTasks = this.asyncHandler(async (req, res) => {
    const result = await this.listTasksService.call(
      new ListTasksParams({
        name: req.query["name"],
        nameLike: req.query["name_like"],
        nameStartsWith: req.query["name_starts_with"],
        nameEndsWith: req.query["name_ends_with"],
        status: req.query["status"],
        statusIn: this.arrayQuery(req.query["status_in"]),
        statusNot: req.query["status_not"],
        statusNotIn: this.arrayQuery(req.query["status_not_in"]),
        userId: req.user.id,
        limit: Number(req.query["limit"]),
        offset: Number(req.query["offset"]),
      }),
    );

    res.status(200).json(this.taskView.listTasks(result));
  });

  deleteTask = this.asyncHandler(async (req, res) => {
    await this.deleteTaskService.call(
      new DeleteTaskParams({
        id: req.params.id,
        userId: req.user.id,
      }),
    );

    res.status(204).end();
  });
}

module.exports = TaskController;
