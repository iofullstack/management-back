import MongoLib from '../lib/mongo'

class Buy {
  constructor() {
    this.collection = 'buy'
    this.mongoDB = new MongoLib()
  }

  async getBuy() {
    // Return array
    return await this.mongoDB.get(this.collection)
  }

  async createBuy(data) {
    // Return BuyId
    this.updateStockProducts(data['products'])
    return await this.mongoDB.create(this.collection, data)
  }

  async deleteBuy(id) {
    // Return deletedBuyId
    return await this.mongoDB.delete(this.collection, id)
  }

  async updateStockProducts(products) {
    console.log(products)
    //for(product of products)
  }
}

export default Buy
