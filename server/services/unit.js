import MongoLib from '../lib/mongo'
import { ConversionService } from '../services/'

const conversionService = new ConversionService()

class Unit {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
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
    const res = await conversionService.deleteAllConversion(deletedUnitId)
    return res
  }
  
  async removeConversion({ unitId, conversionId }) {
    const res = await this.mongoDB.remove(this.collection, unitId, { unit: conversionId })
  }
}

export default Unit
