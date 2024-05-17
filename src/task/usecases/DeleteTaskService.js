const UseCase = require("../../common/usecase");
const TaskNotFoundError = require("../errors/TaskNotFoundError");
const TaskRepository = require("../repositories/TaskRepository");
const IdIsSpecification = require("../specifications/IdIsSpecification");
const OwnerIsSpecification = require("../specifications/OwnerIsSpecification");
const DeleteTaskParams = require("./DeleteTaskParams");
const DeleteTaskResult = require("./DeleteTaskResult");

class DeleteTaskService extends UseCase {
  /**
   * Create DeleteTaskService instance
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
  }

  /**
   * Call DeleteTaskService business logic
   * @param {DeleteTaskParams} params
   * @returns {Promise<DeleteTaskResult>}
   */
  async call(params) {
    const task = await this.taskRepository.findOne(new IdIsSpecification(params.id), new OwnerIsSpecification(params.userId));
    if (!task) throw new TaskNotFoundError(params.id);
    await this.taskRepository.delete(task);

    return new DeleteTaskResult();
  }
}

module.exports = DeleteTaskService;
