const UserRepository = require("..");
const { User: UserDB } = require("../../../../../../db/sequelize/models");
const Context = require("../../../../../common/Context");
const Query = require("../../../../../common/Query");
const User = require("../../../entity/User");
const Specification = require("../../../../../common/Specification");
const IdIsSpecification = require("../../../Specifications/IdIsSpecification");
const UsernameIsSpecification = require("../../../Specifications/UsernameIsSpecification");

class PostgresUserRepository extends UserRepository {
  /**
   * Find an User
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<User|null>}
   */
  async findOne(specs, ctx) {
    const where = this._where(specs);
    const user = await UserDB.findOne({ where });
    if (!user) return null; 

    return this._entityFromRow(user);
  }

  /**
   * Find users
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<User[]>}
   */
  async find(query, ctx) {
    const where = this._where(query.specs);
    const users = await UserDB.findAll({ where });
    return users.map((user) => this._entityFromRow(user));
  }

  /**
   * Get size of users
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  async size(specs, ctx) {
    const where = this._where(specs);
    const userSize = await UserDB.count({ where });
    return userSize;
  }

  /**
   * Save an User.
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(user, ctx) {
    return UserDB.upsert({
      id: user.id,
      username: user.username,
      encryptedPassword: user.encryptedPassword,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  /**
   * Delete an User.
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(user, ctx) {
    return UserDB.destroy({
      where: {
        id: user.id,
      },
    });
  }

  /**
   * Build Sequelize Query
   * @param {Specification[]} specs
   * @returns {Object}
   */
  _where(specs) {
    const where = {};

    for (const spec of specs) {
      if (spec instanceof UsernameIsSpecification) {
        where.username = spec.username;
        continue;
      }

      if (spec instanceof IdIsSpecification) {
        where.id = spec.id;
        continue;
      }
    }

    return where;
  }

  /**
   * Convert row to entity
   * @param {any} row
   * @returns {User}
   */
  _entityFromRow(row) {
    return new User({
      id: row.id,
      username: row.username,
      encryptedPassword: row.encryptedPassword,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}

module.exports = PostgresUserRepository;
