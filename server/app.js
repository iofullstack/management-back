import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import boom from 'boom'

import { productRouter, categoryRouter } from './routes'
import { config } from './config'
import {
  logErrors,
  wrapErrors,
  clientErrorHandler
} from './utils/middlewares/errorsHandlers'

// App
const app = express()

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Security
if (config.dev) {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/category', categoryRouter)
app.use('/api/products', productRouter)

// Redirect
app.get('/', (req, res, next) => {
  try {
    res.redirect('/api/example')
  } catch(err) {
    next(err)
  }
})

// Verify router
app.use((req, res, next) => {
  const {
    output: { statusCode, payload }
  } = boom.notFound()

  res.status(statusCode).json(payload)
})

// Error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)

export default app
