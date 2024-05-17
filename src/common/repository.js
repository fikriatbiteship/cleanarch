const { Query } = require("mongoose");
const Object = require("./object");
const Entity = require("./entity");
const Specification = require("./specification");
const NotImplementedError = require("./errors/NotImplementedError");

class Repository extends Object {
  /**
   * Find an entity
   * @param {...Specification} specs
   * @returns {Promise<Entity[]>}
   */
  findOne(specs) {
    throw new NotImplementedError()
  }

  /**
   * Find entities
   * @param {Query} query
   * @returns {Promise<Entity>}
   */
  find(query) {
    throw new NotImplementedError()
  }

  /**
   * Get size of entities
   * @param {...Specification} _specs
   * @returns {Promise<number>}
   */
  size(specs) {
    throw new NotImplementedError()
  }

  /**
   * Save an entity.
   * @param {Entity} entity
   * @returns {Promise<boolean>}
   */
  save(entity) {
    throw new NotImplementedError()
  }

  /**
   * Delete an entity.
   * @param {Entity} entity
   * @returns {Promise<boolean>}
   */
  delete(entity) {
    throw new NotImplementedError()
  }
}

module.exports = Repository;
