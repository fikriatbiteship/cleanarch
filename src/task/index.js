const MongoTaskRepository = require("./repositories/TaskRepository/MongoTaskRepository");
const TaskController = require("./TaskController");
const TaskRouter = require("./TaskRouter");
const TaskJSONView = require("./views/TaskJSONView");
const CommonModule = require("../common/module");
const CreateTaskService = require("./usecases/CreateTaskService");

class TaskModule extends CommonModule {
  wire() {
    this.taskRepository = new MongoTaskRepository();
    this.createTaskService = new CreateTaskService({
      taskRepository: this.taskRepository,
    });
    this.taskView = new TaskJSONView();
    this.taskController = new TaskController({
      createTaskService: this.createTaskService,
      taskView: this.taskView,
    });
  }

  registerRouter(app) {
    this.wire();
    this.taskRouter = new TaskRouter({ taskController: this.taskController });
    this.taskRouter.register(app);
  }
}

module.exports = TaskModule;
