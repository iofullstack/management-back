const express = require('express')

const { ConversionService } = require('../services')

const conversionService = new ConversionService();
const router = express.Router()

router.post('/', async (req, res, next) => {
  const { body: conversion } = req

  try {
    const data = await conversionService.createConversion({ conversion })
  
    res.status(201).json({
      message: 'Conversion created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: _data } = req

    try {
      const data = await conversionService.updateConversion({ id, data: _data })
    
      res.status(200).json({
        message: 'Conversion updated',
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
    const data = await conversionService.deleteConversion(id)
  
    res.status(200).json({
      message: 'Conversion deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
