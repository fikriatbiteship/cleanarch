const MongoUserRepository = require("./repositories/UserRepository/MongoUserRepository");
const RegisterService = require("./usecases/RegisterService");
const AuthorizeService = require("./usecases/AuthorizeService");
const LoginService = require("./usecases/LoginService");
const UserController = require("./UserController");
const UserRouter = require("./UserRouter");
const UserView = require("./UserView");
const CommonModule = require("../common/module");
const HashManager = require("../common/manager/HashManager");
const SessionManager = require("./manager/SessionManager");

class UserModule extends CommonModule {
  wire() {
    this.hashManager = new HashManager();
    this.sessionManager = new SessionManager();
    this.userRepository = new MongoUserRepository();
    this.authorizeService = new AuthorizeService({
      userRepository: this.userRepository,
      sessionManager: this.sessionManager,
    });
    this.loginService = new LoginService({
      userRepository: this.userRepository,
      sessionManager: this.sessionManager,
      hashManager: this.hashManager,
    });
    this.registerService = new RegisterService({
      userRepository: this.userRepository,
      hashManager: this.hashManager,
    });
    this.userView = new UserView();
    this.userController = new UserController({
      authorizeService: this.authorizeService,
      loginService: this.loginService,
      registerService: this.registerService,
      userView: this.userView,
    });
  }

  registerRouter(app) {
    this.wire();
    this.userRouter = new UserRouter({ userController: this.userController });
    this.userRouter.register(app);
  }
}

module.exports = UserModule;
