import MongoLib from '../lib/mongo'
import Conversion from './conversion'

class Unit {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
    this.conversionService = new Conversion()
  }

  async getUnits() {
    return await this.mongoDB.getAll(this.collection)
  }

  async createUnit({ unit }) {
    const createUnitId = await this.mongoDB.create(this.collection, unit)
    return createUnitId
  }

  async addConversion({ unitId, conversionId }) {
    const res = await this.mongoDB.add(this.collection, unitId, { unit: conversionId })
    return res
  }

  async updateUnit({ id, data }) {
    const updateUnitId = await this.mongoDB.update(this.collection, { id, data })
    return updateUnitId
  }

  async deleteUnit(id) {
    const deletedUnitId = await this.mongoDB.delete(this.collection, id)
    const res = await this.conversionService.deleteAllConversion(deletedUnitId)
    return res
  }
  
  async removeConversion({ unitId, conversionId }) {
    const res = await this.mongoDB.remove(this.collection, unitId, { unit: conversionId })
  }
}

export default Unit
