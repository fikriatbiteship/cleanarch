const AccessTokenInvalidError = require("../errors/AccessTokenInvalidError");
const ApplicationError = require("../../common/errors/ApplicationError");
const AuthorizeParams = require("./AuthorizeParams");
const AuthorizeResult = require("./AuthorizeResult");
const UseCase = require("../../common/UseCase");
const IdIsSpecification = require("../Specifications/IdIsSpecification");
const MissingAccessTokenError = require("../errors/MissingAccessTokenError");
const MissingAuthorizedUserError = require("../errors/MissingAuthorizedUserError");
const UserRepository = require("../repositories/UserRepository");
const SessionManager = require("../manager/SessionManager");
const Session = require("../entity/Session");
const UsernameIsSpecification = require("../Specifications/UsernameIsSpecification");

class AuthorizeService extends UseCase {
  /**
   * Creates an instance of AuthorizeUseCase.
   * @param {Object} deps - The repository for accessing user data.
   * @param {UserRepository} deps.userRepository - User repository.
   * @param {SessionManager} deps.sessionManager - Session manager.
   */
  constructor(deps) {
    super();

    this.userRepository = deps.userRepository;
    this.sessionManager = deps.sessionManager;
  }

  /**
   * Authorize params.
   * @param {AuthorizeParams} params - Authorization params.
   * @return {Promise<AuthorizeResult>}
   */
  async call(params) {
    try {
      if (!params.accessToken) throw new MissingAccessTokenError();
      const claim = this.sessionManager.verifySession(
        new Session({
          accessToken: params.accessToken,
        }),
      );

      const user = await this.userRepository.findOne([new IdIsSpecification(claim.id), new UsernameIsSpecification(claim.sub)]);
      if (!user) throw new MissingAuthorizedUserError();

      return new AuthorizeResult({ user });
    } catch (err) {
      if (err instanceof ApplicationError) {
        throw err;
      }

      throw new AccessTokenInvalidError();
    }
  }
}

module.exports = AuthorizeService;
