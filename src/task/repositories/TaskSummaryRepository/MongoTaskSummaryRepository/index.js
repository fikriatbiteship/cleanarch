const TaskSummaryRepository = require("../");
const TaskSummaryModel = require("./model");
const TaskSummary = require("../../../Entity/Task");
const Specification = require("../../../../common/Specification");
const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../../../Specifications/OwnerIsSpecification");

class MongoTaskSummaryRepository extends TaskSummaryRepository {
  /**
   * Find tasks
   * @param {...Specification} specs
   * @returns {Promise<TaskSummary[]>}
   */
  async findOne(...specs) {
    const mQuery = this._query(specs);
    const taskSummary = await TaskSummaryModel.findOne(mQuery);
    if (!taskSummary) return null;

    return taskSummary.toEntity();
  }

  /**
   * Find tasks
   * @param {Query} query
   * @returns {Promise<TaskSummary[]>}
   */
  async find(query) {
    const mQuery = this._query(query.specs);
    const taskSummaries = await TaskSummaryModel.find(mQuery)
      .limit(query.limit || 10)
      .skip(query.offset || 0);

    return taskSummaries.map((taskSummary) => taskSummary.toEntity());
  }

  /**
   * Save task
   * @param {TaskSummary} task
   * @returns {Promise<boolean>}
   */
  save(task) {
    return TaskSummaryModel.updateOne(
      { _id: task.id },
      {
        $set: {
          _id: task.id,
          todoCount: task.todoCount,
          ongoingCount: task.ongoingCount,
          doneCount: task.doneCount,
          userId: task.userId,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
      { upsert: true },
    );
  }

  /**
   * Get tasks size
   * @param {...Specification} specs
   * @returns {Promise<number>}
   */
  size(...specs) {
    const query = this._query(specs);
    return TaskSummaryModel.countDocuments(query);
  }

  /**
   * Delete task
   * @param {TaskSummary} task
   * @returns {Promise<boolean>}
   */
  delete(taskSummary) {
    return TaskSummaryModel.deleteOne({ _id: taskSummary.id });
  }

  _query(specs) {
    const query = {};

    for (const spec of specs) {
      if (spec instanceof IdIsSpecification) {
        query._id = spec.id;
        continue;
      }

      if (spec instanceof OwnerIsSpecification) {
        query.userId = spec.userId;
        continue;
      }
    }

    return query;
  }
}

module.exports = MongoTaskSummaryRepository;
