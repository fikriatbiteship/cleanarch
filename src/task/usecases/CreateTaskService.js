const CommonUseCase = require("../../common/usecase");
const Task = require("../entity/Task");
const TaskRepository = require("../repositories/TaskRepository");
const CreateTaskParams = require("./CreateTaskParams");
const CreateTaskResult = require("./CreateTaskResult");

class CreateTaskService extends CommonUseCase {
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
