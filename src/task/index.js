const CreateTaskService = require("./usecases/CreateTaskService");
const GetTaskService = require("./usecases/GetTaskService");
const Module = require("../common/module");
const MongoTaskRepository = require("./repositories/TaskRepository/MongoTaskRepository");
const TaskController = require("./TaskController");
const TaskRouter = require("./TaskRouter");
const TaskView = require("./TaskView");
const ListTasksService = require("./usecases/ListTasksService");
const UpdateTaskService = require("./usecases/UpdateTaskService");
const DeleteTaskService = require("./usecases/DeleteTaskService");

class TaskModule extends Module {
  wire() {
    this.wireSecurityModules();
    this.taskRepository = new MongoTaskRepository();

    this.createTaskService = new CreateTaskService({
      taskRepository: this.taskRepository,
    });

    this.getTaskService = new GetTaskService({
      taskRepository: this.taskRepository,
    });

    this.listTasksService = new ListTasksService({
      taskRepository: this.taskRepository,
    });

    this.updateTaskService = new UpdateTaskService({
      taskRepository: this.taskRepository,
    });

    this.deleteTaskService = new DeleteTaskService({
      taskRepository: this.taskRepository,
    });

    this.taskView = new TaskView();

    this.taskController = new TaskController({
      createTaskService: this.createTaskService,
      updateTaskService: this.updateTaskService,
      deleteTaskService: this.deleteTaskService,
      getTaskService: this.getTaskService,
      listTasksService: this.listTasksService,
      taskView: this.taskView,
    });
  }

  registerRouter(app) {
    this.wire();
    this.taskRouter = new TaskRouter({
      taskController: this.taskController,
      userMiddleware: this.userMiddleware,
    });
    this.taskRouter.register(app);
  }
}

module.exports = TaskModule;
