const UseCase = require("../../common/UseCase");
const Task = require("../entity/Task");
const TaskSummary = require("../entity/TaskSummary");
const TaskRepository = require("../repositories/TaskRepository");
const TaskSummaryRepository = require("../repositories/TaskSummaryRepository");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const TaskStatus = require("../values/TaskStatus");
const CreateTaskParams = require("./CreateTaskParams");
const CreateTaskResult = require("./CreateTaskResult");

class CreateTaskService extends UseCase {
  /**
   * Create CreateTaskService instance
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   * @param {TaskSummaryRepository} deps.taskSummaryRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
    this.taskSummaryRepository = deps.taskSummaryRepository;
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

    const taskSummary = (await this.taskSummaryRepository.findOne([new OwnerIsSpecification(params.userId)])) ||
      new TaskSummary({
        userId: params.userId,
        todoCount: 0,
        ongoingCount: 0,
        doneCount: 0,
      });

    await this.taskRepository.save(task);

    taskSummary.todoCount++

    await this.taskSummaryRepository.save(taskSummary);

    return new CreateTaskResult({
      task,
    });
  }
}

module.exports = CreateTaskService;
