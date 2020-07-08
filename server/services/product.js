import MongoLib from '../lib/mongo'

class Products {
  constructor() {
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getProduct({ id, skip, limit, category }) {
    let data = []
    if(id)
      data = await this.mongoDB.get(this.collection, id)
    else {
      const query = category ? { category } : {}
      data = await this.mongoDB.getAll(this.collection, { query, skip, limit })
    }
    return data
  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product)
    return createProductId
  }

  async updateProduct({ id, data }) {
    console.log(id, data)
    const updateProductId = await this.mongoDB.update(this.collection, { id, data })
    return updateProductId
  }

  async deleteProduct(id) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      id
    )
    return deletedProductId
  }
}

export default Products
