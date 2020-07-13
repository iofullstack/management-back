"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _services = require("../services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const conversionService = new _services.ConversionService(),
      router = _express.default.Router();

router.post('/', async (req, res, next) => {
  const {
    body: {
      unitId,
      conversion
    }
  } = req;

  try {
    const data = await conversionService.createConversion({
      unitId,
      conversion
    });
    res.status(201).json({
      message: 'Conversion created',
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
    const data = await conversionService.updateConversion({
      id,
      data: _data
    });
    res.status(200).json({
      message: 'Conversion updated',
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
    const data = await conversionService.deleteConversion(id);
    res.status(200).json({
      message: 'Conversion deleted',
      data
    });
  } catch (err) {
    next(err);
  }
});
var _default = router;
exports.default = _default;