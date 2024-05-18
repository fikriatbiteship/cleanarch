const Params = require("../../common/Params");

class AuthorizeParams extends Params {
  constructor({ accessToken }) {
    super();

    this.accessToken = accessToken;
  }
}

module.exports = AuthorizeParams;
