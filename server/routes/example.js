const express = require('express')

const { ExampleService } = require('../services')

const exampleService = new ExampleService();
const router = express.Router()

router.get('/', async (req, res, next) => {
  //const { _id, skip, limit, category } = req.query

  try {
    //const data = await exampleService.getExamples({ _id, skip, limit, category })
    const test = await exampleService.test()

    res.status(200).json(test)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: example } = req

  try {
    const createdExample = await exampleService.createExample({ example })
  
    res.status(201).json({
      message: 'Example created',
      data: createdExample
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:exampleId', async (req, res, next) => {
    const { exampleId } = req.params
    const { body: example } = req

    try {
      const updatedExample = await exampleService.updateExample({ exampleId, example })
    
      res.status(200).json({
        data: updatedExample,
        message: 'example updated'
      })
    } catch(err) {
      next(err)
    }
  }
)

router.delete(
  '/:exampleId',
  async (req, res, next) => {
  const { exampleId } = req.params
  
  try {
    const deletedExample = await exampleService.deleteExample({ exampleId })
  
    res.status(200).json({
      data: deletedExample,
      message: 'example deleted'
    })
  } catch(err) {
    next(err)
  }
})

export default router
