import express from 'express'

import { ConversionService } from '../services'

const conversionService = new ConversionService(),
      router = express.Router()

router.post('/', async (req, res, next) => {
  const { body: { unitId, conversion } } = req

  try {
    const data = await conversionService.createConversion(unitId, conversion)
  
    res.status(201).json({
      message: 'Conversion created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.delete('/:id/unit/:unitId/', async (req, res, next) => {
  const { id, unitId } = req.params

  try {
    const data = await conversionService.deleteConversion(unitId, id)

    res.status(200).json({
      message: 'Conversion deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
