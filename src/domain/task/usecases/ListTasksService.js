const Query = require("../../../common/Query");
const UseCase = require("../../../common/UseCase");
const TaskRepository = require("../repositories/TaskRepository");
const NameEndsWithSpecification = require("../Specifications/NameEndsWithSpecification");
const NameIsSpecification = require("../Specifications/NameIsSpecification");
const NameLikeSpecification = require("../Specifications/NameLikeSpecification");
const NameStartsWithSpecification = require("../Specifications/NameStartsWithSpecification");
const OwnerIsSpecification = require("../Specifications/OwnerIsSpecification");
const StatusInSpecification = require("../Specifications/StatusInSpecification");
const StatusIsSpecification = require("../Specifications/StatusIsSpecification");
const StatusNotInSpecification = require("../Specifications/StatusNotInSpecification");
const StatusNotSpecification = require("../Specifications/StatusNotSpecification");
const ListTasksParams = require("./ListTasksParams");
const ListTasksResult = require("./ListTasksResult");

class ListTasksService extends UseCase {
  /**
   * Create ListTasksService instance
   * @param {Object} deps
   * @param {TaskRepository} deps.taskRepository
   */
  constructor(deps) {
    super();

    this.taskRepository = deps.taskRepository;
  }

  /**
   * Call ListTasksService business logic.
   * @param {ListTasksParams} params
   * @returns {Promise<ListTasksResult>}
   */
  async call(params) {
    const specs = [new OwnerIsSpecification(params.userId)];

    if (params.name) specs.push(new NameIsSpecification(params.name));
    if (params.nameLike) specs.push(new NameLikeSpecification(params.nameLike));
    if (params.nameStartsWith) specs.push(new NameStartsWithSpecification(params.nameStartsWith));
    if (params.nameEndsWith) specs.push(new NameEndsWithSpecification(params.nameEndsWith));
    if (params.status) specs.push(new StatusIsSpecification(params.status));
    if (params.statusNot) specs.push(new StatusNotSpecification(params.statusNot));
    if (params.statusIn) specs.push(new StatusInSpecification(params.statusIn));
    if (params.statusNotIn) specs.push(new StatusNotInSpecification(params.statusNotIn));

    const query = new Query({
      specs,
      limit: params.limit,
      offset: params.offset,
    });

    const tasks = await this.taskRepository.find(query);
    const size = await this.taskRepository.size(specs);

    return new ListTasksResult({
      tasks,
      size,
      limit: query.limit,
      offset: query.offset,
    });
  }
}

module.exports = ListTasksService;
