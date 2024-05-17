const CommonObject = require("./object");

class CommonController extends CommonObject {
  static asyncHandler(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  asyncHandler(fn) {
    return CommonController.asyncHandler(fn);
  }
}

module.exports = CommonController;
