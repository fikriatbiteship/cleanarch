const express = require("express");
const logger = require("../../lib/logger");
const ApplicationError = require("../common/errors/ApplicationError");

const methodsWithBody = ["POST", "PATCH", "PUT"];

module.exports = {
  validateRawRequestBody: express.raw({
    limit: "50mb",
    inflate: true,
    type: (req) => {
      if (!methodsWithBody.includes(req.method)) return true;
      if (!req.headers["content-type"]) return false;

      const contentTypeSlice = req.headers["content-type"].split(";");
      const contentType = contentTypeSlice[0];

      return contentType !== "multipart/form-data";
    },
  }),

  onLost: (req, res) =>
    res.status(404).json({
      success: false,
      code: 40400000,
      error: "Route not found.",
    }),

  onError: (err, req, res, _next) => {
    if (err instanceof ApplicationError)
      return res.status(err.code).json(err.toJSON());

    if (err instanceof SyntaxError && err.status === 400 && "body" in err)
      return res.status(400).send({
        success: false,
        code: 40000000,
        error: "Bad Request. Please check request body format.",
      });

    logger.error("[server]:", err.message);
    logger.error("[server]:", err.stack);

    // slack.echoInternalServerError(req, err);

    res.status(500).json({
      success: false,
      code: 50000000,
      error: "Internal Server Error. Please contact info@biteship.com",
    });
  },
};
