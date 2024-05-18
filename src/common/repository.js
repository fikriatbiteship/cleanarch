const { Query } = require("mongoose");
const Object = require("./Object");
const Entity = require("./Entity");
const Specification = require("./Specification");
const NotImplementedError = require("./errors/NotImplementedError");

class Repository extends Object {
  /**
   * Find an Entity
   * @param {...Specification} specs
   * @returns {Promise<Entity[]>}
   */
  findOne(specs) {
    throw new NotImplementedError();
  }

  /**
   * Find entities
   * @param {Query} query
   * @returns {Promise<Entity>}
   */
  find(query) {
    throw new NotImplementedError();
  }

  /**
   * Get size of entities
   * @param {...Specification} _specs
   * @returns {Promise<number>}
   */
  size(specs) {
    throw new NotImplementedError();
  }

  /**
   * Save an Entity.
   * @param {Entity} Entity
   * @returns {Promise<boolean>}
   */
  save(Entity) {
    throw new NotImplementedError();
  }

  /**
   * Delete an Entity.
   * @param {Entity} Entity
   * @returns {Promise<boolean>}
   */
  delete(Entity) {
    throw new NotImplementedError();
  }
}

module.exports = Repository;
