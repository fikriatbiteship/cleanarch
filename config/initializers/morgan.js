const morgan = require("morgan");

morgan.format("info", (tokens, req, res) => {
  return [
    "I:",
    "HTTPServer:",
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});
