const Entity = require("../../common/Entity");

class Session extends Entity {
  constructor({ accessToken, refreshToken }) {
    super();

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  toJSON() {
    return {
      access_token: this.accessToken,
      refresh_token: this.refreshToken,
    };
  }
}

module.exports = Session;
