const NotImplementedError = require("../../../../common/errors/NotImplementedError");
const Repository = require("../../../../common/Repository");
const User = require("../../entity/User");
const Specification = require("../../../../common/Specification");
const Query = require("../../../../common/Query");

class UserRepository extends Repository {
  /**
   * Find an user
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<User>}
   */
  findOne(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Find users
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<User[]>}
   */
  find(query, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Get size of users
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  size(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Save an user.
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(user, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Delete an user.
   * @param {User} user
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(user, ctx) {
    throw new NotImplementedError();
  }
}

module.exports = UserRepository;
