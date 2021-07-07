import express from 'express'

import { UnitService } from '../services'

const unitService = new UnitService(),
      router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await unitService.getUnits()

    res.status(200).json({
      message: 'Units litened',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: unit } = req

  try {
    const data = await unitService.createUnit(unit)
  
    res.status(201).json({
      message: 'Unit created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: unit } = req

    try {
      const data = await unitService.updateUnit(id, unit)
    
      res.status(200).json({
        message: 'Unit updated',
        data
      })
    } catch(err) {
      next(err)
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await unitService.deleteUnit(id)
  
    res.status(200).json({
      message: 'Unit deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
