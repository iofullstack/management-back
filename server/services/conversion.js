const MongoLib = require('../lib/mongo')

class Conversion {
  constructor() {
    this.collection = 'conversion'
    this.mongoDB = new MongoLib()
  }

  async createConversion({ conversion }) {
    const createConversionId = await this.mongoDB.create(this.collection, conversion)
    return createConversionId
  }

  async updateConversion({ id, data }) {
    const updateConversionId = await this.mongoDB.update(this.collection, { id, data })
    return updateConversionId
  }

  async deleteConversion(id) {
    const deletedConversionId = await this.mongoDB.delete(this.collection, id)
    return deletedConversionId
  }
}

export default Conversion
