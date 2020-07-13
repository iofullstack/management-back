"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(data, schema) {
  const {
    error
  } = _joi.default.validate(data, schema);

  return error;
}

function validationHandler(schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(_boom.default.badRequest(error)) : next();
  };
}

var _default = validationHandler;
exports.default = _default;