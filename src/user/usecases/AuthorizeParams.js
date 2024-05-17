const CommonParams = require("../../common/params");

class AuthorizeParams extends CommonParams {
  constructor({ accessToken }) {
    super();

    this.accessToken = accessToken;
  }
}

module.exports = AuthorizeParams;
