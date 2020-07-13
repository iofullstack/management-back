import MongoLib from '../lib/mongo'
import Unit from './unit'

class Conversion {
  constructor() {
    this.collection = 'conversion'
    this.mongoDB = new MongoLib()
    this.unitService = new Unit()
  }

  async createConversion({ unitId, conversion }) {
    const conversionId = await this.mongoDB.create(this.collection, conversion)
    const res = await this.unitService.addConversion({ unitId, conversionId })
    return res
  }

  async updateConversion({ id, data }) {
    const updateConversionId = await this.mongoDB.update(this.collection, { id, data })
    return updateConversionId
  }

  async deleteConversion(unitId, conversionId) {
    const id = await this.unitService.removeConversion({ unitId, conversionId })
    const deletedConversionId = await this.mongoDB.delete(this.collection, id)
    return deletedConversionId
  }
  
  async deleteAllConversion(unitId) {
    const deleted = await this.mongoDB.deleteAllField(this.collection, { unit: unitId })
    return deleted
  }
}

export default Conversion
