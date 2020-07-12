const MongoLib = require('../lib/mongo')

class Category {
  constructor() {
    this.collection = 'category'
    this.mongoDB = new MongoLib()
  }

  async getCategory() {
    return await this.mongoDB.getAll(this.collection)
  }

  async createCategory({ category }) {
    const createCategoryId = await this.mongoDB.create(this.collection, category)
    return createCategoryId
  }

  async updateCategory({ id, data }) {
    const updateCategoryId = await this.mongoDB.update(this.collection, { id, data })
    return updateCategoryId
  }

  async deleteCategory(id) {
    const deletedCategoryId = await this.mongoDB.delete(this.collection, id)
    return deletedCategoryId
  }
}

export default Category
