const { Query } = require("mongoose");
const CommonObject = require("./object");
const CommonEntity = require("./entity");
const CommonSpecification = require("./specification");

class CommonRepository extends CommonObject {
  /**
   * Find an entity
   * @param {CommonSpecification[]} _specs
   * @returns {Promise<CommonEntity[]>}
   */
  findOne(_specs) {
    throw new Error("Method not implemented");
  }

  /**
   * Find entities
   * @param {Query} _query
   * @returns {Promise<CommonEntity>}
   */
  find(_query) {
    throw new Error("Method not implemented");
  }

  /**
   * Save an entity.
   * @param {CommonEntity} _entity
   * @returns {Promise<boolean>}
   */
  save(_entity) {
    throw new Error("Method not implemented");
  }

  /**
   * Delete an entity.
   * @param {CommonEntity} _entity
   * @returns {Promise<boolean>}
   */
  delete(_entity) {
    throw new Error("Method not implemented");
  }
}

module.exports = CommonRepository;
