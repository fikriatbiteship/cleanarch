const HTTPModule = require("../common/module/HTTPModule");
const Dependency = require("../utils/dependency");
const TaskController = require("./TaskController");
const TaskRouter = require("./TaskRouter");
const TaskView = require("./TaskView");
const MongoTaskRepository = require("./repositories/TaskRepository/MongoTaskRepository");
const MongoTaskSummaryRepository = require("./repositories/TaskSummaryRepository/MongoTaskSummaryRepository");
const CreateTaskService = require("./usecases/CreateTaskService");
const DeleteTaskService = require("./usecases/DeleteTaskService");
const GetTaskService = require("./usecases/GetTaskService");
const ListTasksService = require("./usecases/ListTasksService");
const UpdateTaskService = require("./usecases/UpdateTaskService");

class TaskModule extends HTTPModule {
  /**
   * Wire dependencies
   * @param {Dependency} deps
   */
  wire(deps) {
    deps.set("taskRepository", async () => {
      return new MongoTaskRepository();
    });

    deps.set("taskSummaryRepository", async () => {
      return new MongoTaskSummaryRepository();
    });


    deps.set("createTaskService", async (c) => {
      return new CreateTaskService({
        taskRepository: await c.get("taskRepository"),
        taskSummaryRepository: await c.get("taskSummaryRepository"),
        transactionManager: await c.get("transactionManager")
      });
    });

    deps.set("getTaskService", async (c) => {
      return new GetTaskService({
        taskRepository: await c.get("taskRepository"),
      });
    });

    deps.set("updateTaskService", async (c) => {
      return new UpdateTaskService({
        taskRepository: await c.get("taskRepository"),
      });
    });

    deps.set("deleteTaskService", async (c) => {
      return new DeleteTaskService({
        taskRepository: await c.get("taskRepository"),
      });
    });

    deps.set("listTasksService", async (c) => {
      return new ListTasksService({
        taskRepository: await c.get("taskRepository"),
      });
    });

    deps.set("taskView", async (c) => {
      return new TaskView();
    });

    deps.set("taskController", async (c) => {
      return new TaskController({
        createTaskService: await c.get("createTaskService"),
        updateTaskService: await c.get("updateTaskService"),
        getTaskService: await c.get("getTaskService"),
        deleteTaskService: await c.get("deleteTaskService"),
        listTasksService: await c.get("listTasksService"),
        taskView: await c.get("taskView"),
      });
    });

    deps.set("taskRouter", async (c) => {
      return new TaskRouter({
        taskController: await c.get("taskController"),
        userMiddleware: await c.get("userMiddleware"),
      });
    });

    this.deps = deps;
  }

  async route(app) {
    return this.deps.get("taskRouter").then((taskRouter) => {
      taskRouter.register(app);
    });
  }
}

module.exports = TaskModule;
