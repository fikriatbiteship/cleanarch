const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Manager = require("../../common/manager/Manager");
const User = require("../entity/User");
const Session = require("../entity/Session");
const AccessTokenClaim = require("../entity/AccessTokenClaim");

class SessionManager extends Manager {
  constructor() {
    super();

    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "kDdhc<v58~yNpm/u9P:`_f";
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "Dj3ht^E}.rGaZ@)82CLW/#";
  }

  /**
   * Create session object
   * @param {User} user - The user.
   * @return {Promise<Session>}
   */
  createSession(user) {
    const accessToken = jwt.sign({ id: user.id, sub: user.username }, this.accessTokenSecret);
    const accessTokenMd5Hash = crypto.createHash("md5").update(accessToken).digest("hex");
    const refreshToken = jwt.sign({ id: user.id, sub: user.username, hash: accessTokenMd5Hash }, this.refreshTokenSecret);

    return new Session({
      accessToken,
      refreshToken,
    });
  }

  /**
   * Create session object
   * @param {Session} session
   * @return {AccessTokenClaim}
   */
  verifySession(session) {
    const payload = jwt.verify(session.accessToken, this.accessTokenSecret);
    return AccessTokenClaim.fromJWT(payload);
  }
}

module.exports = SessionManager;
