const UseCase = require("../../common/UseCase");
const IdIsSpecification = require("../Specifications/IdIsSpecification");
const TaskNotFoundError = require("../errors/TaskNotFoundError");
const TaskRepository = require("../repositories/TaskRepository");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const GetTaskParams = require("./GetTaskParams");
const GetTaskResult = require("./GetTaskResult");

class GetTaskService extends UseCase {
  /**
   * Get GetTaskService instance
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
  }

  /**
   * Call create task service business logic.
   * @param {GetTaskParams} params
   * @return {Promise<GetTaskResult>}
   */
  async call(params) {
    const task = await this.taskRepository.findOne(new IdIsSpecification(params.id), new OwnerIsSpecification(params.userId));
    if (!task) throw new TaskNotFoundError(params.id);

    return new GetTaskResult({
      task,
    });
  }
}

module.exports = GetTaskService;
