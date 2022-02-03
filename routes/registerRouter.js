const express = require('express')

const account = require('../usercases/account')
const user = require('../usercases/user')

const router = express.Router()

router.post('/account', async (req, res, next) => {
  console.log('entro a registrar contador')
  const data = req.body
  console.log(data)
})

router.post('/users', async (req, res, next) => {
  console.log('entro a registrar usuario')
  const data = req.body
  console.log(data)
})
