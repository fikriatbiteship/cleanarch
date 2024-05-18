const Object = require("./Object");

class Handler extends Object {
  static asyncHandler(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  asyncHandler(fn) {
    return Handler.asyncHandler(fn);
  }
}

module.exports = Handler;
