const TaskRepository = require("../");
const TaskModel = require("./model");
const Task = require("../../../entity/Task");
const Specification = require("../../../../common/Specification");
const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const OwnerIsSpecification = require("../../../Specifications/OwnerIsSpecification");
const StatusIsSpecification = require("../../../Specifications/StatusIsSpecification");
const NameIsSpecification = require("../../../Specifications/NameIsSpecification");
const NameLikeSpecification = require("../../../Specifications/NameLikeSpecification");
const NameStartsWithSpecification = require("../../../Specifications/NameStartsWithSpecification");
const NameEndsWithSpecification = require("../../../Specifications/NameEndsWithSpecification");
const StatusInSpecification = require("../../../Specifications/StatusInSpecification");
const StatusNotSpecification = require("../../../Specifications/StatusNotSpecification");
const StatusNotInSpecification = require("../../../Specifications/StatusNotInSpecification");

class MongoTaskRepository extends TaskRepository {
  /**
   * Find tasks
   * @param {...Specification} specs
   * @returns {Promise<Task[]>}
   */
  async findOne(...specs) {
    const mQuery = this._query(specs);
    const task = await TaskModel.findOne(mQuery);
    if (!task) return null;

    return task.toEntity();
  }

  /**
   * Find tasks
   * @param {Query} query
   * @returns {Promise<Task[]>}
   */
  async find(query) {
    const mQuery = this._query(query.specs);
    const tasks = await TaskModel.find(mQuery)
      .limit(query.limit || 10)
      .skip(query.offset || 0);

    return tasks.map((task) => task.toEntity());
  }

  /**
   * Save task
   * @param {Task} task
   * @returns {Promise<boolean>}
   */
  save(task) {
    return TaskModel.updateOne(
      { _id: task.id },
      {
        $set: {
          _id: task.id,
          name: task.name,
          status: task.status.toString(),
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
    return TaskModel.countDocuments(query);
  }

  /**
   * Delete task
   * @param {Task} task
   * @returns {Promise<boolean>}
   */
  delete(task) {
    return TaskModel.deleteOne({ _id: task.id });
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

      if (spec instanceof StatusIsSpecification) {
        query.status = spec.status.toString();
        continue;
      }

      if (spec instanceof NameIsSpecification) {
        query.name = spec.name;
        continue;
      }

      if (spec instanceof NameLikeSpecification) {
        query.name = {
          $regex: spec.nameLike,
          $options: "i",
        };
        continue;
      }

      if (spec instanceof NameStartsWithSpecification) {
        query.name = {
          $regex: "^" + spec.nameStartsWith,
          $options: "i",
        };
        continue;
      }

      if (spec instanceof NameEndsWithSpecification) {
        query.name = {
          $regex: spec.nameEndsWith + "$",
          $options: "i",
        };
        continue;
      }

      if (spec instanceof StatusIsSpecification) {
        query.status = spec.status;
        continue;
      }

      if (spec instanceof StatusInSpecification) {
        query.status = { $in: spec.statusIn };
        continue;
      }

      if (spec instanceof StatusNotSpecification) {
        query.status = { $ne: spec.status };
        continue;
      }

      if (spec instanceof StatusNotInSpecification) {
        query.status = { $nin: spec.statusNotIn };
        continue;
      }
    }

    return query;
  }
}

module.exports = MongoTaskRepository;
