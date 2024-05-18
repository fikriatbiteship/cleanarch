const UseCase = require("../../common/UseCase");
const Task = require("../Entity/Task");
const TaskRepository = require("../repositories/TaskRepository");
const TaskStatus = require("../Values/TaskStatus");
const CreateTaskParams = require("./CreateTaskParams");
const CreateTaskResult = require("./CreateTaskResult");

class CreateTaskService extends UseCase {
  /**
   * Create CreateTaskService instance
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
  }

  /**
   * Call create task service business logic.
   * @param {CreateTaskParams} params
   * @return {Promise<CreateTaskResult>}
   */
  async call(params) {
    const now = params.now();
    const task = new Task({
      name: params.name,
      status: TaskStatus.Todo,
      userId: params.userId,
      createdAt: now,
      updatedAt: now,
    });

    await this.taskRepository.save(task);

    return new CreateTaskResult({
      task,
    });
  }
}

module.exports = CreateTaskService;
