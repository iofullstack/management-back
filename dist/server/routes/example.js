"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const exampleService = new _services.ExampleService();

const router = _express.default.Router();

router.get('/', async (req, res, next) => {
  //const { id, skip, limit, field } = req.query
  try {
    //const data = await exampleService.getExampless({ id, skip, limit, field })
    const data = await exampleService.test();
    res.status(200).json({
      message: 'Exampless litened',
      data
    });
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  const {
    body: _data
  } = req;

  try {
    const data = await exampleService.createExampless({
      _data
    });
    res.status(201).json({
      message: 'Example created',
      data
    });
  } catch (err) {
    next(err);
  }
});
router.put('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    body: _data
  } = req;

  try {
    const data = await exampleService.updateExampless({
      id,
      data: _data
    });
    res.status(200).json({
      message: 'example updated',
      data
    });
  } catch (err) {
    next(err);
  }
});
router.delete('/:id', async (req, res, next) => {
  const {
    id
  } = req.params;

  try {
    const data = await exampleService.deleteExampless(id);
    res.status(200).json({
      message: 'Example deleted',
      data
    });
  } catch (err) {
    next(err);
  }
});
var _default = router;
exports.default = _default;