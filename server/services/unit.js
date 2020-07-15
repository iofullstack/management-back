import MongoLib from '../lib/mongo'

class Unit {
  constructor() {
    this.collection = 'units'
    this.mongoDB = new MongoLib()
  }

  async getUnits() {
    const units = await this.mongoDB.getAll(this.collection)
    await this.mongoDB.populate(units, 'conversions', { match:'conversion', array:true })
    for(const unit of units)
      if (unit['conversions'])
        await this.mongoDB.populate(unit['conversions'], 'unit', { match:'units' })
    return units
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
    const units = await this.mongoDB.getAll(this.collection)
    let deleted = ''
    let deletedUnitId = ''
    await this.mongoDB.populate(units, 'conversions', { match:'conversion', array:true })
    for(const unit of units)
      if (unit['conversions'])
        for(const conversion of unit['conversions'])
          if (conversion['unit'] == id)
            deleted = await this.mongoDB.remove('units', unit['_id'], 'conversions', conversion['_id'])
    if (deleted)
      deleted = await this.deleteAllConversion(id)
    if (deleted)
      deletedUnitId = await this.mongoDB.delete(this.collection, id)
    return deletedUnitId
  }

  deleteAllConversion(unitId) {
    return this.mongoDB.deleteAllByField('conversion', { unit: unitId })
  }
}

export default Unit
