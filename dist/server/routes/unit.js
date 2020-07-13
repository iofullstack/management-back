"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const unitService = new _services.UnitService(),
      router = _express.default.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await unitService.getUnits();
    res.status(200).json({
      message: 'Unit litened',
      data
    });
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  const {
    body: unit
  } = req;

  try {
    const data = await unitService.createUnit({
      unit
    });
    res.status(201).json({
      message: 'Unit created',
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
    body: unit
  } = req;

  try {
    const data = await unitService.updateUnit({
      id,
      data: unit
    });
    res.status(200).json({
      message: 'Unit updated',
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
    const data = await unitService.deleteUnit(id);
    res.status(200).json({
      message: 'Unit deleted',
      data
    });
  } catch (err) {
    next(err);
  }
});
var _default = router;
exports.default = _default;