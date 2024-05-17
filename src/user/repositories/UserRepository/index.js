const NotImplementedError = require("../../../common/errors/NotImplementedError");
const CommonRepository = require("../../../common/repository");
const User = require("../../entity/User");
const CommonSpecification = require("../../../common/specification");
const Query = require("../../../common/query");

class UserRepository extends CommonRepository {
  /**
   * Find a user
   * @param {CommonSpecification[]} _specs
   * @returns {Promise<User>}
   */
  async findOne(_specs) {
    throw new NotImplementedError();
  }

  /**
   * Find users
   * @param {Query} _query
   * @returns {Promise<User[]>}
   */
  async find(_query) {
    throw new NotImplementedError();
  }

  /**
   * Save user
   * @param {User} _user
   * @returns {Promise<boolean>}
   */
  async save(_user) {
    throw new NotImplementedError();
  }

  /**
   * Delete user
   * @param {User} _user
   * @returns {Promise<boolean>}
   */
  async delete(_user) {
    throw new NotImplementedError();
  }
}

module.exports = UserRepository;
