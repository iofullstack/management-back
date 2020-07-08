import express from 'express'

import { ProductService } from '../services'

const productService = new ProductService()
const router = express.Router()

router.get('/', async (req, res, next) => {
  const { id, skip, limit, category } = req.query

  try {
    const data = await productService.getProduct({ id, skip, limit, category })

    res.status(200).json({
      message: 'Products litened',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: product } = req

  try {
    const data = await productService.createProduct({ product })

    res.status(201).json({
      message: 'Product created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: product } = req

    try {
      const data = await productService.updateProduct({ id, data: product })
 
      res.status(200).json({
        message: 'Product updated',
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
    const data = await productService.deleteProduct(id)
  
    res.status(200).json({
      message: 'Product deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
