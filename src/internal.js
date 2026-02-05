const errorResponse = require("./utils/error");

function errorHandler(err, req, res, next) {
  const { status, body } = errorResponse(err);
  res.status(status).json(body);
}

module.exports = errorHandler;