const express = require('express')
const google = require('../usercases/google')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require("../lib/config")
const router = express.Router()
const users = require('../usercases/user')


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



router.get('/callback', async (req, res, next) => {
    try {

        const {userId, role} = req.body // Id del cliente, solo se guarda si el role es cliente
        const code = req.query.code
        console.log("aqui el code:",code)
        const tokens = await google.getTokens(code)
        console.log("los tokens:",tokens)

        const saveTokens = await users.updateTokens(userId,tokens)
        console.log("los token salvados", saveTokens)
        // if(role==="cliente"){
        //     const saveTokens = await user.getTokens(userId,tokens)
        // }else{
        //     throw new Error ("Rol de usuario no autorizado")
        // }
        
      res.status(200).json({
        ok: true,
        payload: {
          message: "Usuario autenticado correctamente",
          tokens: saveTokens
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

  router.post('/create-event', async (req, res, next) => {
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


  module.exports = router
