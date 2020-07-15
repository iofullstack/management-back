import { ObjectId } from 'mongodb'
import MongoLib from '../lib/mongo'

class Unit {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
  }

  async getUnits() {
    // Return array
    const units = await this.mongoDB.getAll(this.collection)
    for (const unit of units)
      if (unit['conversions'])
        await this.mongoDB.populate(unit['conversions'], 'unit', 'units', { projection:{symbol:1} })
    return units
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
    // Return deletedUnitId and modifiedCount
    const units = await this.mongoDB.getAll(this.collection)
    let modifiedCount = 0
    let deletedUnitId = ''
    for(const unit of units)
      if (unit['conversions'])
        for(const conversion of unit['conversions'])
          if (conversion['unit'] === id)
            modifiedCount = await this.mongoDB.remove(this.collection, unit['_id'], { conversions: {_id: ObjectId(conversion['_id'])} })
    deletedUnitId = await this.mongoDB.delete(this.collection, id)
    return { deletedUnitId, modifiedCount }
  }
}

export default Unit
