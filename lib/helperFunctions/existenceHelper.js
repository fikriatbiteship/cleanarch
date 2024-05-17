const validationHelper = require("./validationHelper");

exports.uuidExists = (val) =>
  this.stringExists(val) && validationHelper.validUUID(val);
exports.numberExists = (val) => typeof val === "number" && val > 0;
exports.stringExists = (val) => typeof val === "string" && val !== "";
exports.booleanExists = (val) => typeof val === "boolean";
exports.arrayExists = (val) => Array.isArray(val) && val.length > 0;
exports.objectExists = (val) => !!val && Object.keys(val).length > 0;
