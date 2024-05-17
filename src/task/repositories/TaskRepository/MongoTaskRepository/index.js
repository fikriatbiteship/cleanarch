const TaskRepository = require("../");
const TaskModel = require("./model");
const Task = require("../../../entity/Task");
const CommonSpecification = require("../../../../common/specification");

class MongoTaskRepository extends TaskRepository {
  /**
   * Find tasks
   * @param {CommonSpecification[]} specs
   * @returns {Promise<Task[]>}
   */
  async findOne(specs) {
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
          taskname: task.taskname,
          encryptedPassword: task.encryptedPassword,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        },
      },
      { upsert: true },
    );
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
    }

    return query;
  }
}

module.exports = MongoTaskRepository;
