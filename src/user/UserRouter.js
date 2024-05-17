const CommonRouter = require("../common/router");
const UserController = require("./UserController");

class UserRouter extends CommonRouter {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user controller.
   * @param {UserController} deps.userController - User controller.
   */
  constructor({ userController }) {
    super();

    this.userController = userController;
  }

  init() {
    this.router.post("/v1/auth/login", this.userController.login);
    this.router.post("/v1/auth/register", this.userController.register);
    this.router.get(
      "/v1/auth/whoami",
      this.userController.authorize,
      this.userController.whoami,
    );
  }
}

module.exports = UserRouter;
