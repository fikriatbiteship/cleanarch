const HTTPModule = require("../common/module/HTTPModule");
const Dependency = require("../utils/dependency");
const UserController = require("./UserController");
const UserMiddleware = require("./UserMiddleware");
const UserRouter = require("./UserRouter");
const UserView = require("./UserView");
const SessionManager = require("./manager/SessionManager");
const MongoUserRepository = require("./repositories/UserRepository/MongoUserRepository");
const AuthorizeService = require("./usecases/AuthorizeService");
const LoginService = require("./usecases/LoginService");
const RegisterService = require("./usecases/RegisterService");

class UserModule extends HTTPModule {
  /**
   * Wire dependencies
   * @param {Dependency} deps
   */
  wire(deps) {
    deps.set("sessionManager", async (c) => {
      return new SessionManager();
    });

    deps.set("userRepository", async (c) => {
      return new MongoUserRepository();
    });

    deps.set("registerService", async (c) => {
      return new RegisterService({
        hashManager: await c.get("hashManager"),
        userRepository: await c.get("userRepository"),
      });
    });

    deps.set("loginService", async (c) => {
      return new LoginService({
        hashManager: await c.get("hashManager"),
        sessionManager: await c.get("sessionManager"),
        userRepository: await c.get("userRepository"),
      });
    });

    deps.set("authorizeService", async (c) => {
      return new AuthorizeService({
        userRepository: await c.get("userRepository"),
        sessionManager: await c.get("sessionManager"),
      });
    });

    deps.set("userMiddleware", async (c) => {
      return new UserMiddleware({
        authorizeService: await c.get("authorizeService"),
      });
    });

    deps.set("userView", async (c) => {
      return new UserView();
    });

    deps.set("userController", async (c) => {
      return new UserController({
        userView: await c.get("userView"),
        registerService: await c.get("registerService"),
        loginService: await c.get("loginService"),
      });
    });

    deps.set("userRouter", async (c) => {
      return new UserRouter({
        userMiddleware: await c.get("userMiddleware"),
        userController: await c.get("userController"),
      });
    });

    this.deps = deps;
  }

  /**
   * Route express application
   * @param {import('express').Application} deps
   */
  async route(app) {
    return this.deps.get("userRouter").then((userRouter) => {
      userRouter.register(app);
    });
  }
}

module.exports = UserModule;
