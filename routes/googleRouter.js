const express = require('express')
const google = require('../usercases/google')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require("../lib/config")
const router = express.Router()


router.post('/auth', async (req, res, next) => {
    try {
  
      const googleClientId = config.google.clientId
      const googleSecret = config.google.secret
      const googleRedirectUri = config.google.redirectUri
  
       
      const auth = await google.authUserRedirect(googleClientId,googleSecret,googleRedirectUri)
        
      res.status(200).json({
        ok: true,
        payload: {
          authUrl: auth
        }
      })
    } catch (err) {
      next(err)
      console.log(err)
    }
  })



router.get('/auth', async (req, res, next) => {
    try {

        const {userId} = req.body // Id del cliente o contador
        const {type} = req.body
        const code = req.query.code

        const tokens = await google.getTokens(code)

        const accessToken = tokens.access_token
        const refreshToken = tokens.refresh_token

        console.log(tokens)
        console.log(accessToken)
        console.log(refreshToken)


        
      res.status(200).json({
        ok: true,
        payload: {
          message: "Usuario autenticado"
        }
      })
    } catch (err) {
      next(err)
      console.log(err)
      res.status(400).json({
          ok:false,
          payload:{
              message:"Usuario no autenticado, intente nuevamente"
          }
      })
    }
  })


  module.exports = router
