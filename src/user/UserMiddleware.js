const Middleware = require("../common/middleware");
const AuthorizeParams = require("./usecases/AuthorizeParams");
const AuthorizeService = require("./usecases/AuthorizeService");

class UserMiddleware extends Middleware {
  /**
   * Creates an instance of UserController.
   * @param {Object} deps - the dependency of user middleware.
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
