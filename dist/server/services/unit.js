"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongo = _interopRequireDefault(require("../lib/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Unit {
  constructor() {
    this.collection = 'units';
    this.mongoDB = new _mongo.default();
  }

  async getUnits() {
    return await this.mongoDB.getAll(this.collection);
  }

  async createUnit({
    unit
  }) {
    const createUnitId = await this.mongoDB.create(this.collection, unit);
    return createUnitId;
  }

  async updateUnit({
    id,
    data
  }) {
    const updateUnitId = await this.mongoDB.update(this.collection, {
      id,
      data
    });
    return updateUnitId;
  }

  async deleteUnit(id) {
    const deletedUnitId = await this.mongoDB.delete(this.collection, id);
    const res = await deleteAllConversion(deletedUnitId);
    return res;
  }

  async deleteAllConversion(unitId) {
    const deleted = await this.mongoDB.deleteAllField('conversion', {
      unit: unitId
    });
    return deleted;
  }

}

var _default = Unit;
exports.default = _default;