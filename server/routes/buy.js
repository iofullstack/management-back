import express from 'express'

import { BuyService } from '../services'

const buyService = new BuyService()
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await buyService.getBuy()

    res.status(200).json({
      message: 'Buy litened',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: buy } = req

  try {
    const data = await buyService.createBuy(buy)

    res.status(201).json({
      message: 'Buy created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await buyService.deleteBuy(id)

    res.status(200).json({
      message: 'Buy deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
