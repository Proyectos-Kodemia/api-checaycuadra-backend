const express = require('express')
const router = express.Router()
const account = require('../usercases/account/index')
const user = require('../usercases/user')

router.post('/account', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const token = await account.logIn(email, password)
    if (token) {
      res.status(200).json({
        status: true,
        message: 'Log in Succesful',
        token: token
      })
    } else {
      res.status(401).json({
        status: false,
        message: 'Autentication Failed, Password or Email invalid'
      })
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Autentication Failed, Password or Email invalid'
    })
    next(error)
  }
})

router.post('/users', async (req, res, next) => {
  try {
    const { email, password } = req.body
    console.log(email, password)

    const token = await user.logIn(email, password)
    console.log(token)
    if (token) {
      res.status(200).json({
        status: true,
        message: 'Log in Succesful',
        token: token
      })
    } else {
      res.status(401).json({
        status: false,
        message: 'Autentication Failed, Password or Email invalid'
      })
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Autentication Failed, Password or Email invalid'
    })
    next(error)
  }
})

module.exports = router
