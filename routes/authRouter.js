const express = require('express')
const router = express.Router()
const user = require('../usercases/user')

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
      message: 'Autentication , Password or email invalid'

    })
    next(error)
  }
})

// Exportando router
module.exports = router
