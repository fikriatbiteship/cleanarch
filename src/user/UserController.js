const CommonController = require("../common/controller");
const UserView = require("./UserView");
const AuthorizeParams = require("./usecases/AuthorizeParams");
const AuthorizeService = require("./usecases/AuthorizeService");
const LoginParams = require("./usecases/LoginParams");
const LoginService = require("./usecases/LoginService");
const RegisterParams = require("./usecases/RegisterParams");
const RegisterService = require("./usecases/RegisterService");

class UserController extends CommonController {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user controller.
   * @param {UserView} deps.userView - User view.
   * @param {RegisterService} deps.registerService - Register business logic.
   * @param {LoginService} deps.loginService - Login business logic.
   * @param {AuthorizeService} deps.authorizeService - Authorization business logic.
   */
  constructor({ userView, registerService, loginService, authorizeService }) {
    super();

    this.userView = userView;
    this.registerService = registerService;
    this.loginService = loginService;
    this.authorizeService = authorizeService;
  }

  authorize = this.asyncHandler(async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    const result = await this.authorizeService.call(
      new AuthorizeParams({
        accessToken: bearerToken?.replace("Bearer ", "") || "",
      }),
    );

    req.user = result.user;

    next();
  });

  register = this.asyncHandler(async (req, res) => {
    const params = new RegisterParams({
      username: req.body["username"],
      password: req.body["password"],
    });

    const result = await this.registerService.call(params);

    return res.status(201).json(this.userView.registerResponseJSON(result));
  });

  login = this.asyncHandler(async (req, res) => {
    const params = new LoginParams({
      username: req.body["username"],
      password: req.body["password"],
    });

    const result = await this.loginService.call(params);

    return res.status(201).json(this.userView.loginResponseJSON(result));
  });

  whoami = this.asyncHandler(async (req, res) => {
    return res.status(200).json(this.userView.whoamiResponseJSON(req.user));
  });
}

module.exports = UserController;
