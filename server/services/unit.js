import MongoLib from '../lib/mongo'

class Unit {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
  }

  async getUnits() {
    // Return array
    return await this.mongoDB.getAll(this.collection)
  }

  async createUnit(unit) {
    // Return UnitId
    return await this.mongoDB.create(this.collection, unit)
  }

  async updateUnit(id, data) {
    // Return UnitId
    return await this.mongoDB.update(this.collection, id, data)
  }

  async deleteUnit(id) {
    // Return UnitId deleted
    return await this.mongoDB.delete(this.collection, id)
  }
}

export default Unit
