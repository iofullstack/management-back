"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _boom = _interopRequireDefault(require("boom"));

var _routes = require("./routes");

var _config = require("./config");

var _errorsHandlers = require("./utils/middlewares/errorsHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App
const app = (0, _express.default)(); // Middlewares

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json()); // Security

if (_config.config.dev) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS');
    next();
  });
} // Static files


app.use('/static', _express.default.static(_path.default.join(__dirname, 'public'))); // Routes

app.use('/api/example', _routes.exampleRouter); // Redirect

app.get('/', (req, res, next) => {
  try {
    res.redirect('/api/example');
  } catch (err) {
    next(err);
  }
}); // Verify router

app.use((req, res, next) => {
  const {
    output: {
      statusCode,
      payload
    }
  } = _boom.default.notFound();

  res.status(statusCode).json(payload);
}); // Error handlers

app.use(_errorsHandlers.logErrors);
app.use(_errorsHandlers.wrapErrors);
app.use(_errorsHandlers.clientErrorHandler);
var _default = app;
exports.default = _default;