const Middleware = require("../../common/Middleware");
const User = require("./entity/User");
const AuthorizeParams = require("./usecases/AuthorizeParams");
const AuthorizeService = require("./usecases/AuthorizeService");

class UserMiddleware extends Middleware {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user Middleware.
   * @param {AuthorizeService} deps.authorizeService - Authorization business logic.
   */
  constructor(deps) {
    super();

    this.authorizeService = deps.authorizeService;
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
}

module.exports = UserMiddleware;
