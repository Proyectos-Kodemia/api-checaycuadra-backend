const express = require('express')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const storage = require ('../usercases/storage')
const router = express.Router()
const upload = require('../lib/multer')

router.post('/',upload.single('file'), async (req, res, next) => {
    try {
      console.log('tipo de dato:', typeof(req.body))
      console.log(req.body)

      const fileData = JSON.parse(req.body.data)
      console.log('file json parse',fileData)
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

      const dataFiles={
        idUpload: fileData.idUpload,
        nameDocument: fileData.nameDocument,
        description:fileData.description,
        comments: fileData.comments,
        linkAWS: urlImage,
      }

      const fileCreated = await storage.create(dataFiles)
      const { _id } = fileCreated

      res.status(201).json({
        ok: true,
        message: 'File Created successfully',
        payload: {
          _id,
          urlImgage
        }
      })
    } catch (err) {
      next(err)
      console.log(err)
    }
  })


  
module.exports = router