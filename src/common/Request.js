const Object = require("./Object");
const Validator = require("fastest-validator");
const NotImplementedError = require("./errors/NotImplementedError");
const BadRequestError = require("./errors/BadRequestError");

class Request extends Object {
  /**
   * Schema from Fastest Validator
   * @type {import("fastest-validator").ValidationRule}
   */
  static schema;

  /**
   * Schema from Fastest Validator
   * @type {Validator}
   */
  static validator;

  /**
   * Validate this to schema
   * @type {import('fastest-validator').ValidationSchema}
   */
  static check;

  static compile() {
    if (!this.schema) return;

    this.validator = new Validator();
    this.check = this.validator.compile(this.schema);
  }

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest = (req) => {
    throw new NotImplementedError();
  };

  /**
   * Request factory from express request
   * @params {string} value
   * @static
   */
  static arrayFromQueryParams = (value) => {
    if (!value) return;

    return Array.isArray(value) ? value : [value];
  };

  validate() {
    const result = this.constructor.check(this);
    if (result === true) return this;

    throw new BadRequestError(result);
  }
}

module.exports = Request;
