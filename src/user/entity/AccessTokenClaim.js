const CommonEntity = require("../../common/entity");
const User = require("./User");

class AccessTokenClaim extends CommonEntity {
  constructor({ id, sub }) {
    super();

    this.id = id;
    this.sub = sub;
  }

  /**
   * Create AccessTokenClaim from User.
   * @param {User} user
   * @return {AccessTokenClaim}
   */
  static fromUser(user) {
    return new AccessTokenClaim({
      id: user.id,
      sub: user.username,
    });
  }

  /**
   * Create AccessTokenClaim from User.
   * @return {AccessTokenClaim}
   */
  static fromJWT(payload) {
    return new AccessTokenClaim(payload);
  }
}

module.exports = AccessTokenClaim;
