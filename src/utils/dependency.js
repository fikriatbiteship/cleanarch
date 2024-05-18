const logger = require("../../lib/logger");

class Dependency {
  constructor() {
    this.services = new Map();
    this.queues = new Set();
  }

  set(name, factory) {
    logger.debug("Dependency:", "register", name, "on dependency.");

    this.services.set(name, {
      factory,
      instance: null,
      promise: null,
    });

    if (this.queues.has(name)) this.queues.delete(name);
  }

  async get(name) {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} not found`);
    }

    const service = this.services.get(name);
    if (!service.instance) {
      if (!service.promise) {
        service.promise = service.factory(this).then((instance) => {
          logger.debug("Dependency:", name, "initialized.");
          service.instance = instance;
          return instance;
        });
      }
      await service.promise;
    }
    return service.instance;
  }
}

module.exports = Dependency;
