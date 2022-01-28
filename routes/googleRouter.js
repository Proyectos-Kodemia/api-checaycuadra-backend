const express = require('express')
const google = require('../usercases/google')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require('../lib/config')
const router = express.Router()
const users = require('../usercases/user')

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
    console.log('entro en el callback google')
    const { code } = req.body // Chrcar Id del cliente, solo se guarda si el role es cliente

    const { sub, role } = req.params.tokenPayload
    console.log('sub', sub)
    console.log('role', role)
    console.log('aqui el code:', code)

    const tokens = await google.getTokens(code)
    console.log('los tokens:', tokens)

    const saveTokens = await users.updateTokens(sub, tokens)

    // //console.log("los token salvados", saveTokens)
    // // if(role==="cliente"){
    //     const saveTokens = await user.getTokens(userId,tokens)
    // }else{
    //     throw new Error ("Rol de usuario no autorizado")
    // }

    res.status(200).json({
      ok: true,
      payload: {
        message: 'Usuario autenticado correctamente',
        tokens: tokens
      }
    })
  } catch (err) {
    next(err)
    console.log('error', err)
    res.status(400).json({
      ok: false,
      payload: {
        message: 'Usuario no autenticado, intente nuevamente'
      }
    })
  }
})

module.exports = router
