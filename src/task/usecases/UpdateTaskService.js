const UseCase = require("../../common/UseCase");
const TaskNotFoundError = require("../errors/TaskNotFoundError");
const TaskRepository = require("../repositories/TaskRepository");
const IdIsSpecification = require("../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const UpdateTaskParams = require("./UpdateTaskParams");
const UpdateTaskResult = require("./UpdateTaskResult");

class UpdateTaskService extends UseCase {
  /**
   * Create UpdateTaskService instance.
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
  }

  /**
   * Invoke UpdateTaskService business logic
   * @param {UpdateTaskParams} params
   * @returns {Promise<UpdateTaskResult>}
   */
  async call(params) {
    const now = this.now();
    const task = await this.taskRepository.findOne(new IdIsSpecification(params.id), new OwnerIsSpecification(params.userId));
    if (!task) throw new TaskNotFoundError(params.id);

    if (params.name) task.name = params.name;
    if (params.status?.valid()) task.status = params.status;

    task.updatedAt = now;

    await this.taskRepository.save(task);

    return new UpdateTaskResult({ task });
  }
}

module.exports = UpdateTaskService;
