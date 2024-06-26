"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const builder = require("./builder");
const middleware = require("./middleware");

module.exports = async () => {
  const app = express();
  if (process.env.NODE_ENV !== "test") app.use(morgan("info"));
  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(middleware.validateRawRequestBody);
  await builder(app);
  app.use(middleware.onLost);
  app.use(middleware.onError);

  return app;
};
