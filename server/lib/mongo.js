import Debug from 'debug'
import { MongoClient, ObjectId } from 'mongodb'
import { config } from '../config'

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

const debug = Debug('app:mongodb'),
      MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`

class MongoLib {
  constructor() {
    /*const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: false,
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    }*/
    debug(MONGO_URI)
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    this.client = new MongoClient(MONGO_URI, options)
    this.dbName = DB_NAME
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if(error) {
          reject(error)
        }
        debug('Connected succesfully to mongo')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  test_connection(collection) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .findOne()
    })
  }

  getAll(collection, { query={}, skip=0, limit=0 } = {}) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray()
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) })
    })
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data)
      })
      .then(result => result.insertedId)
  }

  update(collection, { id, data, inc={} }) {
    return this.connect()
      .then(db => {
        if(Object.keys(inc).length)
          return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $inc: inc, $set: data }, { upsert: true })
        else
          return db
            .collection(collection)
            .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) })
      })
      .then(_ => id)
  }
}

module.exports = MongoLib
