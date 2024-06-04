const Controller = require("../../common/Controller");
const UserView = require("./UserView");
const LoginParams = require("./usecases/LoginParams");
const LoginService = require("./usecases/LoginService");
const RegisterParams = require("./usecases/RegisterParams");
const RegisterService = require("./usecases/RegisterService");

class UserController extends Controller {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user Controller.
   * @param {UserView} deps.userView - User view.
   * @param {RegisterService} deps.registerService - Register business logic.
   * @param {LoginService} deps.loginService - Login business logic.
   */
  constructor(deps) {
    super();

    this.userView = deps.userView;
    this.registerService = deps.registerService;
    this.loginService = deps.loginService;
  }

  register = this.asyncHandler(async (req, res) => {
    const params = RegisterParams.fromRequest(req.data);

    const result = await this.registerService.call(params);

    return res.status(201).json(this.userView.register(result));
  });

  login = this.asyncHandler(async (req, res) => {
    const params = LoginParams.fromRequest(req.data);
    const result = await this.loginService.call(params);

    return res.status(201).json(this.userView.login(result));
  });

  whoami = this.asyncHandler(async (req, res) => {
    return res.status(200).json(this.userView.whoami(req.user));
  });
}

module.exports = UserController;
