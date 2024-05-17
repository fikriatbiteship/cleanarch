"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router");
const middleware = require("./middleware");

const app = express();

if (process.env.NODE_ENV !== "test") app.use(morgan("combined"));

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(middleware.validateRawRequestBody);
app.use(router);
app.use(middleware.onLost);
app.use(middleware.onError);

module.exports = app;
