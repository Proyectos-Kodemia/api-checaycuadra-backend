const express = require('express')
const router = express.Router()
const account = require('../usercases/account/index')
const user = require('../usercases/user')

router.post('/', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const token = await account.logIn(username, password)
    res.status(200).json({
      ok: true,
      message: 'Log in Succesful',
      token: token
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Autentication Failed, Password or Email invalid'
    })
    next(error)
  }
})

router.post('/users', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const token = await user.logIn(email, password)
    res.status(200).json({
      ok: true,
      message: 'Log in User Succesful',
      token: token
    })
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: 'Autentication Failed, Password or Email invalid'
    })
    next(error)
  }
})

module.exports = router
