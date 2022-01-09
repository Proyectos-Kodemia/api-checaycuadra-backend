const express = require('express')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const storage = require ('../usercases/storage')
const router = express.Router()
const upload = require('../lib/multer')

router.post('/',upload.single('file'), async (req, res, next) => {
    try {
      console.log(req.body)
      const fileData = req.body
      const file = req.file
      /*
      if (!file) {
        res.status(400).json({
          success: false,
          message: 'Agrega el archivo'
        })
      }
      */
      const urlImage = file.location


      const fileCreated = await storage.create({fileData,linkAWS:urlImage})
      const { _id } = fileCreated

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