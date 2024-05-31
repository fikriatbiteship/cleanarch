const { Query } = require("mongoose");
const Object = require("./Object");
const Entity = require("./Entity");
const Specification = require("./Specification");
const NotImplementedError = require("./errors/NotImplementedError");
const Context = require("./Context");

class Repository extends Object {
  /**
   * Find an entity
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<Entity[]>}
   */
  findOne(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Find entities
   * @param {Query} query
   * @param {Context} [ctx]
   * @returns {Promise<Entity>}
   */
  find(query, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Get size of entities
   * @param {Specification[]} specs
   * @param {Context} [ctx]
   * @returns {Promise<number>}
   */
  size(specs, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Save an entity.
   * @param {Entity} entity
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  save(entity, ctx) {
    throw new NotImplementedError();
  }

  /**
   * Delete an entity.
   * @param {Entity} entity
   * @param {Context} [ctx]
   * @returns {Promise<boolean>}
   */
  delete(entity, ctx) {
    throw new NotImplementedError();
  }
}

module.exports = Repository;
