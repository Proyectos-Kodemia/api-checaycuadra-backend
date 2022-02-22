const express = require('express')
const google = require('../usercases/google')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require('../lib/config')
const router = express.Router()
const account = require('../usercases/account')

router.post('/auth', async (req, res, next) => {
  try {
    const googleClientId = config.google.clientId
    const googleSecret = config.google.secret
    const googleRedirectUri = config.google.redirectUri

    const auth = await google.authUserRedirect(googleClientId, googleSecret, googleRedirectUri)

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

// patch que recibe el code del front
router.patch('/callback', authHandler, async (req, res, next) => {
  try {
    console.log('entro a callback')

    const { sub } = req.params.tokenPayload
    console.log(sub)
    const code = req.body
    console.log('aqui el code:', code)

    const tokens = await google.getTokens(code)
    console.log('los tokens:', tokens)

    const saveTokens = await account.updateTokens(sub, tokens)

    // //console.log("los token salvados", saveTokens)
    // // if(role==="cliente"){
    //     const saveTokens = await user.getTokens(userId,tokens)
    // }else{
    //     throw new Error ("Rol de usuario no autorizado")
    // }

    res.status(200).json({
      ok: true,
      payload: {
        message: 'Usuario autenticado correctamente, tokens salvados',
        tokens: tokens
      }
    })
  } catch (err) {
    next(err)
    console.log('error desde next googleRouter', err)
    res.status(400).json({
      ok: false,
      payload: {
        message: err
      }
    })
  }
})

module.exports = router
