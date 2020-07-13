"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongo = _interopRequireDefault(require("../lib/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Conversion {
  constructor() {
    this.collection = 'conversion';
    this.mongoDB = new _mongo.default();
  }

  async createConversion({
    unitId,
    conversion
  }) {
    const conversionId = await this.mongoDB.create(this.collection, conversion);
    const res = await addConversion({
      unitId,
      conversionId
    });
    return res;
  }

  async updateConversion({
    id,
    data
  }) {
    const updateConversionId = await this.mongoDB.update(this.collection, {
      id,
      data
    });
    return updateConversionId;
  }

  async deleteConversion(unitId, conversionId) {
    const id = await removeConversion({
      unitId,
      conversionId
    });
    const deletedConversionId = await this.mongoDB.delete(this.collection, id);
    return deletedConversionId;
  }

  async addConversion({
    unitId,
    conversionId
  }) {
    const res = await this.mongoDB.add('units', unitId, {
      unit: conversionId
    });
    return res;
  }

  async removeConversion({
    unitId,
    conversionId
  }) {
    const res = await this.mongoDB.remove('units', unitId, {
      unit: conversionId
    });
  }

}

var _default = Conversion;
exports.default = _default;