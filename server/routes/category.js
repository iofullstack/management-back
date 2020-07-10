const express = require('express')

const { CategoryService } = require('../services')

const categoryService = new CategoryService();
const router = express.Router()

router.get('/', async (req, res, next) => {

  try {
    const data = await categoryService.getCategory()

    res.status(200).json({
      message: 'Category litened',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: category } = req

  try {
    const data = await categoryService.createCategory({ category })
  
    res.status(201).json({
      message: 'Category created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: category } = req

    try {
      const data = await categoryService.updateCategory({ id, data: category })
    
      res.status(200).json({
        message: 'Category updated',
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
    const data = await categoryService.deleteCategory(id)
  
    res.status(200).json({
      message: 'Category deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
