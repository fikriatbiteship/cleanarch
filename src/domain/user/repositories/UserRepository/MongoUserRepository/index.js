const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const UsernameIsSpecification = require("../../../Specifications/UsernameIsSpecification");
const UserRepository = require("../");
const UserModel = require("./model");
const User = require("../../../entity/User");
const Specification = require("../../../../../common/Specification");
const Context = require("../../../../../common/Context");

class MongoUserRepository extends UserRepository {
  /**
   * Find a user
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<User>}
   */
  async findOne(specs, ctx) {
    const mQuery = this._query(specs);
    const user = await UserModel.findOne(mQuery);
    if (!user) return null;

    return user.toEntity();
  }

  /**
   * Find users
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<User[]>}
   */
  async find(query, ctx) {
    const mQuery = this._query(query.specs);
    const users = await UserModel.find(mQuery)
      .limit(query.limit || 10)
      .skip(query.offset || 0);

    return users.map((user) => user.toEntity());
  }

  /**
   * Save user
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(user, ctx) {
    return UserModel.updateOne(
      { _id: user.id },
      {
        $set: {
          _id: user.id,
          username: user.username,
          encryptedPassword: user.encryptedPassword,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
      { upsert: true }
    );
  }

  /**
   * Delete user
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(user, ctx) {
    return UserModel.deleteOne({ _id: user.id });
  }

  _query(specs) {
    const query = {};

    for (const spec of specs) {
      if (spec instanceof UsernameIsSpecification) {
        query.username = spec.username;
        continue;
      }

      if (spec instanceof IdIsSpecification) {
        query._id = spec.id;
        continue;
      }
    }

    return query;
  }
}

module.exports = MongoUserRepository;
