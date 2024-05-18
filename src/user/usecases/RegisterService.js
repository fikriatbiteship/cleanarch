const UseCase = require("../../common/UseCase");
const User = require("../Entity/User");
const UsernameIsSpecification = require("../Specifications/UsernameIsSpecification");
const UserRepository = require("../repositories/UserRepository");
const UsernameAlreadyTakenError = require("../errors/UsernameAlreadyTakenError");
const RegisterParams = require("./RegisterParams");
const RegisterResult = require("./RegisterResult");
const HashManager = require("../../common/manager/HashManager");

class RegisterService extends UseCase {
  /**
   * Creates an instance of RegisterUseCase.
   * @param {Object} deps - The repository for accessing user data.
   * @param {UserRepository} deps.userRepository - The repository for accessing user data.
   * @param {HashManager} deps.hashManager - Object that manage hash algorithm.
   */
  constructor({ userRepository, hashManager }) {
    super();

    this.userRepository = userRepository;
    this.hashManager = hashManager;
  }

  /**
   * Call the use case.
   * @param {RegisterParams} params - the parameter to register user.
   * @returns {Promise<RegisterResult>}
   */
  async call(params) {
    const now = this.now();

    const existingUser = await this.userRepository.findOne(new UsernameIsSpecification(params.username));

    if (!!existingUser) throw new UsernameAlreadyTakenError();

    const encryptedPassword = this.hashManager.hash(params.password);
    const user = new User({
      username: params.username,
      encryptedPassword,
      createdAt: now,
      updatedAt: now,
    });

    await this.userRepository.save(user);

    return new RegisterResult({
      user,
    });
  }
}

module.exports = RegisterService;
