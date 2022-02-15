const express = require('express')
const router = express.Router()
const account = require('../usercases/account')
const { authHandler } = require('../middlewares/authHandlers')

// Obtiene dayAvailable , hoursAvailabe y meetings del contador
router.get('/', authHandler, async (req, res, next) => {
  try {
    const { sub } = req.params.tokenPayload
    const accountData = req.body

    if (sub) {
      const accountObject = await account.getById(sub)
      console.log(accountObject)
      res.status(200).json({
        Schedule: accountObject.Schedule
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Accoun Id not Found'
      })
    }
  } catch (err) {
    console.log('error en el patch Schedule  GetById', err)
    next(err)
  }
})

// Modifica dayAvailable , hoursAvailabe (en este punto ya esta creado el contador)
router.patch('/', authHandler, async (req, res, next) => {
  try {
    const { sub } = req.params.tokenPayload
    const accountData = req.body

    if (sub) {
      const accountObject = await account.update(sub, accountData)
      console.log(accountObject)
      res.status(200).json({
        Schedule: accountObject.Schedule
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Accoun Id not Found'
      })
    }
  } catch (err) {
    console.log('error en el patch Schedule  GetById', err)
    next(err)
  }
})

module.exports = router
