const Request = require("../../common/Request");
const TaskStatus = require("../values/TaskStatus");

class ListTasksRequest extends Request {
  static schema = {
    userId: { type: "uuid" },
    name: { type: "string", min: 3, max: 255, pattern: /^[A-Z_]+$/, optional: true },
    nameLike: { type: "string", min: 3, max: 255, pattern: /^[A-Z_]+$/, optional: true },
    nameStartsWith: { type: "string", min: 1, max: 255, pattern: /^[A-Z_]+$/, optional: true },
    nameEndsWith: { type: "string", min: 1, max: 255, pattern: /^[A-Z_]+$/, optional: true },
    status: { type: "string", enum: TaskStatus.values(), optional: true },
    statusIn: { type: "array", items: "string", enum: TaskStatus.values(), optional: true },
    statusNot: { type: "string", enum: TaskStatus.values(), optional: true },
    statusNotIn: { type: "array", items: "string", enum: TaskStatus.values(), optional: true },
    page: { type: "number", integer: true, optional: true },
    pageSize: { type: "number", integer: true, optional: true },
  };

  /**
   * Request factory from express request
   * @type {import("express").Request}
   */
  static fromRequest(req) {
    const request = new this({
      userId: req.user.id,
      name: req.query["name"],
      nameLike: req.query["name_like"],
      nameStartsWith: req.query["name_starts_with"],
      nameEndsWith: req.query["name_ends_with"],
      status: req.query["status"],
      statusIn: this.arrayFromQueryParams(req.query["status_in"]),
      statusNot: req.query["status_not"],
      statusNotIn: this.arrayFromQueryParams(req.query["status_not_in"]),
      limit: Number(req.query["page"]),
      offset: Number(req.query["page_size"]),
    });

    return request.validate();
  }

  /**
   * Create ListTasksRequest instance
   * @param {Object} values
   * @param {string} values.id
   * @params {string} values.name
   * @params {string} values.nameLike
   * @params {string} values.nameStartsWith
   * @params {string} values.nameEndsWith
   * @params {string} values.status
   * @params {string[]} values.statusIn
   * @params {string} values.statusNot
   * @params {string[]} values.statusNotIn
   * @params {number} values.limit
   * @params {number} values.offset
   */
  constructor(values) {
    super();

    this.userId = values.userId;
    this.name = values.name;
    this.nameLike = values.nameLike;
    this.nameStartsWith = values.nameStartsWith;
    this.nameEndsWith = values.nameEndsWith;
    this.status = values.status;
    this.statusIn = values.statusIn;
    this.statusNot = values.statusNot;
    this.statusNotIn = values.statusNotIn;
    this.page = values.page;
    this.pageSize = values.pageSize;
  }
}

module.exports = ListTasksRequest;
