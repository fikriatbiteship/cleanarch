const Params = require("../../common/params");

class AuthorizeParams extends Params {
  constructor({ accessToken }) {
    super();

    this.accessToken = accessToken;
  }
}

module.exports = AuthorizeParams;
