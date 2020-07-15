import { ObjectId } from 'mongodb'
import MongoLib from '../lib/mongo'

class Conversion {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
  }

  async createConversion(id, data) {
    // Return UnitId
    data['_id'] = ObjectId()
    const _ = await this.mongoDB.add(this.collection, id, { conversions: data })
    return data['_id']
  }

  async deleteConversion(unitId, conversionId) {
    // Return modifiedCount
    return await this.mongoDB.remove(this.collection, unitId, { conversions: { _id: ObjectId(conversionId) } })
  }
}

export default Conversion
