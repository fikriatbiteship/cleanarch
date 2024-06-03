const UseCase = require("../../common/UseCase");
const TaskNotFoundError = require("../errors/TaskNotFoundError");
const TaskRepository = require("../repositories/TaskRepository");
const TaskSummaryRepository = require("../repositories/TaskSummaryRepository");
const IdIsSpecification = require("../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const TaskStatus = require("../values/TaskStatus");
const DeleteTaskParams = require("./DeleteTaskParams");
const DeleteTaskResult = require("./DeleteTaskResult");

class DeleteTaskService extends UseCase {
  /**
   * Create DeleteTaskService instance
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
   * Call DeleteTaskService business logic
   * @param {DeleteTaskParams} params
   * @returns {Promise<DeleteTaskResult>}
   */
  async call(params) {
    const task = await this.taskRepository.findOne([new IdIsSpecification(params.id), new OwnerIsSpecification(params.userId)]);
    if (!task) throw new TaskNotFoundError(params.id);

    const taskSummary = this.taskSummaryRepository.findOne([new OwnerIsSpecification(params.userId)])
    if (TaskStatus.Todo.equals(task.status)) taskSummary.todoCount = taskSummary.todoCount - 1;
    if (TaskStatus.Ongoing.equals(task.status)) taskSummary.ongoingCount = (await taskSummary).ongoingCount - 1;
    if (TaskStatus.Done.equals(task.status)) taskSummary.doneCount = (await taskSummary).doneCount - 1;

    await this.taskSummaryRepository.save(taskSummary)
    await this.taskRepository.delete(task);

    return new DeleteTaskResult();
  }
}

module.exports = DeleteTaskService;
