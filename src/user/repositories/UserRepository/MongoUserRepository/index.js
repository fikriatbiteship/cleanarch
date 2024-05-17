const IdIsSpecification = require("../../../specifications/IdIsSpecification");
const UsernameIsSpecification = require("../../../specifications/UsernameIsSpecification");
const UserRepository = require("../");
const UserModel = require("./model");
const User = require("../../../entity/User");
const Specification = require("../../../../common/specification");

class MongoUserRepository extends UserRepository {
  /**
   * Find a user
   * @param {...Specification} specs
   * @returns {Promise<User>}
   */
  async findOne(...specs) {
    const mQuery = this._query(specs);
    const user = await UserModel.findOne(mQuery);
    if (!user) return null;

    return user.toEntity();
  }

  /**
   * Find users
   * @param {Query} query
   * @returns {Promise<User[]>}
   */
  async find(query) {
    const mQuery = this._query(query.specs);
    const users = await UserModel.find(mQuery)
      .limit(query.limit || 10)
      .skip(query.offset || 0);

    return users.map((user) => user.toEntity());
  }

  /**
   * Save user
   * @param {User} user
   * @returns {Promise<boolean>}
   */
  save(user) {
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
      { upsert: true },
    );
  }

  /**
   * Delete user
   * @param {User} user
   * @returns {Promise<boolean>}
   */
  delete(user) {
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
