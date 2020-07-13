"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

var _http = require("http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)('app:server'),
      server = (0, _http.createServer)(_app.default);

function start() {
  // Server
  server.listen(_config.config.port, _ => {
    debug(`Listening http://localhost:${server.address().port}`);
  });
}

start();