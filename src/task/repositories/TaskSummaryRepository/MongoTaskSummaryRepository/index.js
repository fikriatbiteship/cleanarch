const TaskSummaryRepository = require("../");
const TaskSummaryModel = require("./model");
const TaskSummary = require("../../../entity/Task");
const Specification = require("../../../../common/Specification");
const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../../../Specifications/OwnerIsSpecification");
const Context = require("../../../../common/Context");

class MongoTaskSummaryRepository extends TaskSummaryRepository {
  /**
   * Find tasks
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary[]>}
   */
  async findOne(specs, ctx) {
    const mQuery = this._query(specs);
    const taskSummaryQuery = TaskSummaryModel.findOne(mQuery);
    const taskSummary = await (ctx?.has("trx") ? taskSummaryQuery.session(ctx.get("trx")) : taskSummaryQuery);
    if (!taskSummary) return null;

    return taskSummary.toEntity();
  }

  /**
   * Find tasks
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<TaskSummary[]>}
   */
  async find(query, ctx) {
    const mQuery = this._query(query.specs);
    const taskSummariesQuery = TaskSummaryModel.find(mQuery)
      .limit(query.limit || 10)
      .skip(query.offset || 0);
    const taskSummaries = await (ctx?.has("trx") ? taskSummariesQuery.session(ctx.get("trx")) : taskSummariesQuery);
    return taskSummaries.map((taskSummary) => taskSummary.toEntity());
  }

  /**
   * Save task
   * @param {TaskSummary} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(task, ctx) {
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
      { upsert: true, session: ctx?.get("trx") }
    );
  }

  /**
   * Get tasks size
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  size(specs, ctx) {
    const query = this._query(specs);
    const taskSummarySizeQuery = TaskModel.countDocuments(query);
    return ctx?.has("trx") ? taskSummarySizeQuery.session(ctx.get("trx")) : taskSummarySizeQuery;
  }

  /**
   * Delete task
   * @param {TaskSummary} task
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(taskSummary, ctx) {
    return TaskSummaryModel.deleteOne({ _id: taskSummary.id }, { session: ctx?.get("trx") });
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
