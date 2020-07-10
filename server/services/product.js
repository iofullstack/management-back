import MongoLib from '../lib/mongo'
import { dateTime } from '../utils/plus'

class Products {
  constructor() {
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getProduct({ id, skip, limit, fields={} }) {
    let data = []
    if(id)
      data = await this.mongoDB.get(this.collection, id)
    else {
      if(fields['tags'])
        fields['tags'] = { $in: fields['tags'] }
      data = await this.mongoDB.getAll(this.collection, { query: fields, skip, limit })
    }
    return data
  }

  async createProduct({ product }) {
    product['createdAt'] = product['createdAt'] || dateTime()
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
