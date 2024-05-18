const NotImplementedError = require("../../../common/errors/NotImplementedError");
const Repository = require("../../../common/Repository");
const User = require("../../Entity/User");
const Specification = require("../../../common/Specification");
const Query = require("../../../common/Query");

class UserRepository extends Repository {
  /**
   * Find a user
   * @param {...Specification} specs
   * @returns {Promise<User>}
   */
  async findOne(...specs) {
    throw new NotImplementedError();
  }

  /**
   * Find users
   * @param {Query} query
   * @returns {Promise<User[]>}
   */
  async find(query) {
    throw new NotImplementedError();
  }

  /**
   * Save user
   * @param {User} user
   * @returns {Promise<boolean>}
   */
  async save(user) {
    throw new NotImplementedError();
  }

  /**
   * Delete user
   * @param {User} user
   * @returns {Promise<boolean>}
   */
  async delete(user) {
    throw new NotImplementedError();
  }
}

module.exports = UserRepository;
