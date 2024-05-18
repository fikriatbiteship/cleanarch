const Router = require("../common/Router");
const UserController = require("./UserController");
const UserMiddleware = require("./UserMiddleware");

class UserRouter extends Router {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user controller.
   * @param {UserController} deps.userController - User controller.
   * @param {UserMiddleware} deps.userMiddleware - User middleware.
   */
  constructor(deps) {
    super();

    this.userController = deps.userController;
    this.userMiddleware = deps.userMiddleware;
  }

  init() {
    this.router.post("/v1/auth/login", this.userController.login);
    this.router.post("/v1/auth/register", this.userController.register);
    this.router.get("/v1/auth/whoami", this.userMiddleware.authorize, this.userController.whoami);
  }
}

module.exports = UserRouter;
