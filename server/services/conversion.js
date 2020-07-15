import MongoLib from '../lib/mongo'

class Conversion {
  constructor() {
    this.collection = 'conversion'
    this.mongoDB = new MongoLib()
  }

  async createConversion({ unitId, conversion }) {
    const conversionId = await this.mongoDB.create(this.collection, conversion)
    return await this.addConversion({ unitId, conversionId })
  }

  async updateConversion({ id, data }) {
    const updateConversionId = await this.mongoDB.update(this.collection, { id, data })
    return updateConversionId
  }

  async deleteConversion(unitId, conversionId) {
    const modify = await this.removeConversion({ unitId, conversionId })
    let deletedConversionId = ''
    if(modify)
      deletedConversionId = await this.mongoDB.delete(this.collection, conversionId)
    return deletedConversionId
  }

  addConversion({ unitId, conversionId }) {
    return this.mongoDB.add('units', unitId, { conversions: conversionId })
  }

  removeConversion({ unitId, conversionId }) {
    return this.mongoDB.remove('units', unitId, 'conversions', conversionId)
  }
}

export default Conversion
