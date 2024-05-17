const UserMiddleware = require("../user/UserMiddleware");
const SessionManager = require("../user/manager/SessionManager");
const MongoUserRepository = require("../user/repositories/UserRepository/MongoUserRepository");
const AuthorizeService = require("../user/usecases/AuthorizeService");
const NotImplementedError = require("./errors/NotImplementedError");
const Object = require("./object");

class Module extends Object {
  wireSecurityModules() {
    this.sessionManager = new SessionManager();
    this.userRepository = new MongoUserRepository();

    this.authorizationService = new AuthorizeService({
      userRepository: this.userRepository,
      sessionManager: this.sessionManager,
    });

    this.userMiddleware = new UserMiddleware({
      authorizeService: this.authorizationService,
    });
  }

  wire() {
    throw new NotImplementedError();
  }

  registerListener() {
    throw new NotImplementedError();
  }

  registerRouter() {
    throw new NotImplementedError();
  }
}

module.exports = Module;
