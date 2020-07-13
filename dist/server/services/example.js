"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongo = _interopRequireDefault(require("../lib/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Example {
  constructor() {
    this.collection = 'test';
    this.mongoDB = new _mongo.default();
  }

  async test() {
    const test = await this.mongoDB.test_connection(this.collection);
    return test || {};
  }

  async getExamples({
    id,
    skip,
    limit,
    field
  } = {}) {
    const data = [];
    if (id) data = await this.mongoDB.get(this.collection, id);else {
      const query = field ? {
        field
      } : {};
      data = await this.mongoDB.getAll(this.collection, {
        query,
        skip,
        limit
      });
    }
    return data;
  }

  async createExample({
    _data
  }) {
    const createExampleId = await this.mongoDB.create(this.collection, _data);
    return createExampleId;
  }

  async updateExample({
    id,
    data
  }) {
    const updateExampleId = await this.mongoDB.update(this.collection, {
      id,
      data
    });
    return updateExampleId;
  }

  async deleteExample(id) {
    const deletedExampleId = await this.mongoDB.delete(this.collection, id);
    return deletedExampleId;
  }

}

var _default = Example;
exports.default = _default;