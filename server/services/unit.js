const MongoLib = require('../lib/mongo')

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

  async updateUnit({ id, data }) {
    const updateUnitId = await this.mongoDB.update(this.collection, { id, data })
    return updateUnitId
  }

  async deleteUnit(id) {
    const deletedUnitId = await this.mongoDB.delete(this.collection, id)
    return deletedUnitId
  }
}

export default Unit
