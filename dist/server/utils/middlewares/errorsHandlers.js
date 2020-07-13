"use strict";

var _boom = _interopRequireDefault(require("boom"));

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withErrorStack(err, stack) {
  if (_config.config.dev) {
    return { ...err,
      stack
    }; // Object.assign({}, err, stack)
  }
}

function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(_boom.default.badImplementation(err));
  }

  next(err);
}

function clientErrorHandler(err, req, res, next) {
  const {
    output: {
      statusCode,
      payload
    }
  } = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler
};