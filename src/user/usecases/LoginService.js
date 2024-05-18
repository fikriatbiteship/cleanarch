const jwt = require("jsonwebtoken");
const UseCase = require("../../common/UseCase");
const UserNameIsSpecification = require("../Specifications/UsernameIsSpecification");
const UserRepository = require("../repositories/UserRepository");
const UsernameNotFoundError = require("../errors/UsernameNotFoundError");
const PasswordInvalidError = require("../errors/PasswordInvalidError");
const User = require("../Entity/User");
const LoginParams = require("./LoginParams");
const LoginResult = require("./LoginResult");
const HashManager = require("../../common/manager/HashManager");
const SessionManager = require("../manager/SessionManager");

class LoginService extends UseCase {
  /**
   * Creates an instance of LoginUseCase.
   * @param {Object} deps - The repository for accessing user data.
   * @param {UserRepository} deps.userRepository - The repository for accessing user data.
   * @param {HashManager} deps.hashManager - Object that manage hash algorithm.
   * @param {SessionManager} deps.sessionManager - Object that manage hash algorithm.
   */
  constructor(deps) {
    super();

    this.userRepository = deps.userRepository;
    this.hashManager = deps.hashManager;
    this.sessionManager = deps.sessionManager;
  }

  /**
   * Call the use case.
   * @param {LoginParams} params - the parameter to register user.
   * @returns {Promise<LoginResult>}
   */
  async call(params) {
    const user = await this.userRepository.findOne(new UserNameIsSpecification(params.username));

    if (!user) throw new UsernameNotFoundError();

    if (!this.hashManager.compare(params.password, user.encryptedPassword)) throw new PasswordInvalidError();

    return new LoginResult({
      session: this.sessionManager.createSession(user),
    });
  }
}

module.exports = LoginService;
