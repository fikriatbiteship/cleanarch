const UseCase = require("../../common/UseCase");
const TaskNotFoundError = require("../errors/TaskNotFoundError");
const TaskRepository = require("../repositories/TaskRepository");
const TaskSummaryRepository = require("../repositories/TaskSummaryRepository");
const TaskStatus = require("../values/TaskStatus");
const IdIsSpecification = require("../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const UpdateTaskParams = require("./UpdateTaskParams");
const UpdateTaskResult = require("./UpdateTaskResult");

class UpdateTaskService extends UseCase {
  /**
   * Create UpdateTaskService instance.
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   * @param {TaskSummaryRepository} deps.taskSummaryRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
    this.taskSummaryRepository = deps.taskSummaryRepository
  }

  /**
   * Invoke UpdateTaskService business logic
   * @param {UpdateTaskParams} params
   * @returns {Promise<UpdateTaskResult>}
   */
  async call(params) {
    const now = this.now();
    const task = await this.taskRepository.findOne([new IdIsSpecification(params.id), new OwnerIsSpecification(params.userId)]);
    const taskSummary = await this.taskSummaryRepository.findOne([new OwnerIsSpecification(params.userId)])
    if (!task) throw new TaskNotFoundError(params.id);

    if (params.name) task.name = params.name;
    if (params.status?.valid()) task.status = params.status;

    if (task.status !== params.status) {
      if (TaskStatus.Todo.equals(params.status)) taskSummary.todoCount = taskSummary.todoCount + 1;
      if (TaskStatus.Ongoing.equals(params.status)) taskSummary.ongoingCount = taskSummary.ongoingCount + 1;
      if (TaskStatus.Done.equals(params.status)) taskSummary.doneCount = taskSummary.doneCount + 1;

      if (TaskStatus.Todo.equals(task.status)) taskSummary.todoCount = taskSummary.todoCount - 1;
      if (TaskStatus.Ongoing.equals(task.status)) taskSummary.ongoingCount = taskSummary.ongoingCount - 1;
      if (TaskStatus.Done.equals(task.status)) taskSummary.doneCount = taskSummary.doneCount - 1;
    }

    task.updatedAt = now;

    await this.taskSummaryRepository.save(taskSummary)
    await this.taskRepository.save(task);

    return new UpdateTaskResult({ task });
  }
}

module.exports = UpdateTaskService;
