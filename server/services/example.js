const MongoLib = require('../lib/mongo')

class Examples {
  constructor() {
    this.collection = 'test'
    this.mongoDB = new MongoLib()
  }

  async test() {
    const test = await this.mongoDB.test_connection(this.collection)
    return test || {}
  }

  async getExamples({ _id, field, skip, limit } = {}) {
    const examples = []
    if(_id)
      examples = await this.mongoDB.get(this.collection, _id)
    else {
      const query = field ? { field } : {}
      examples = await this.mongoDB.getAll(this.collection, { query, skip, limit })
    }
    return examples
  }

  async createExample({ example }) {
    const createExampleId = await this.mongoDB.create(this.collection, example)
    return createExampleId
  }

  async updateExample({ id, data }) {
    const updateExampleId = await this.mongoDB.update(
      this.collection,
      id,
      data
    )
    return updateExampleId
  }

  async deleteExample({ exampleId }) {
    const deletedExampleId = await this.mongoDB.delete(
      this.collection,
      exampleId
    )
    return deletedExampleId
  }
}

export default Examples
