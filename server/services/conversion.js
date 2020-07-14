import MongoLib from '../lib/mongo'

class Conversion {
  constructor() {
    this.collection = 'conversion'
    this.mongoDB = new MongoLib()
  }

  async createConversion({ unitId, conversion }) {
    const conversionId = await this.mongoDB.create(this.collection, conversion)
    const res = await this.addConversion({ unitId, conversionId })
    return res
  }

  async updateConversion({ id, data }) {
    const updateConversionId = await this.mongoDB.update(this.collection, { id, data })
    return updateConversionId
  }

  async deleteConversion(unitId, conversionId) {
    const id = await this.removeConversion({ unitId, conversionId })
    const deletedConversionId = await this.mongoDB.delete(this.collection, id)
    return deletedConversionId
  }

  async addConversion({ unitId, conversionId }) {
    const res = await this.mongoDB.add('units', unitId, { conversions: conversionId })
    return res
  }

  async removeConversion({ unitId, conversionId }) {
    const res = await this.mongoDB.remove('units', unitId, { conversions: conversionId })
  }
}

export default Conversion
