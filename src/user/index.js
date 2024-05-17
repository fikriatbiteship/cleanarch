const Module = require("../common/module");
const HashManager = require("../common/manager/HashManager");
const LoginService = require("./usecases/LoginService");
const RegisterService = require("./usecases/RegisterService");
const UserController = require("./UserController");
const UserRouter = require("./UserRouter");
const UserView = require("./UserView");

class UserModule extends Module {
  wire() {
    this.wireSecurityModules();

    this.hashManager = new HashManager();

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
      loginService: this.loginService,
      registerService: this.registerService,
      userView: this.userView,
    });
  }

  registerRouter(app) {
    this.wire();
    this.userRouter = new UserRouter({
      userController: this.userController,
      userMiddleware: this.userMiddleware,
    });
    this.userRouter.register(app);
  }
}

module.exports = UserModule;
