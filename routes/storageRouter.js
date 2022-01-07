const express = require('express')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const storage = require ('../usercases/storage')
const router = express.Router()

router.post('/', async (req, res, next) => {
    try {
      const filesData = req.body
      const meetCreated = await storage.create(filesData)
      const { _id } = filesCreated

      res.status(201).json({
        ok: true,
        message: 'Meet Created successfully',
        payload: {
          _id
        }
      })
    } catch (err) {
      next(err)
      console.log(err)
    }
  })

module.exports = router