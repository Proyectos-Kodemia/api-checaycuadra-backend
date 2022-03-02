const express = require('express')
const router = express.Router()
const account = require('../usercases/account')
const { authHandler } = require('../middlewares/authHandlers')

// Obtiene dayAvailable , hoursAvailabe y meetings del contador
router.get('/', authHandler, async (req, res, next) => {
  try {
    console.log('entro en id')
    const { id } = req.params
    console.log(id)

    if (id) {
      const accountObject = await account.getById(id)
      console.log(accountObject)
      res.status(200).json({
        id: accountObject.id,
        name: accountObject.name,
        lastname: accountObject.lastname,
        degree: accountObject.degree,
        degreeId: accountObject.degreeId,
        profileImage: accountObject.profileImage,
        description: accountObject.description,
        role: accountObject.role,
        evaluation: accountObject.evaluation,
        specialities: accountObject.specialities,
        address: accountObject.address,
        Schedule: accountObject.Schedule
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Id not Found'
      })
    }
  } catch (err) {
    console.log('error del GetById', err)
    next(err)
  }
})

// Create dayAvailable , hoursAvailabe
router.post('/', authHandler, async (req, res, next) => {
  try {
    const { sub } = req.params.tokenPayload
    console.log('entro en id')
    const { startHour } = req.body
    console.log(id)

    if (sub) {
      const accountObject = await account.update(sub, accountData)
      console.log(accountObject)
      res.status(200).json({
        status: true,
        message: 'Schedule confirmation',
        Schedule: accountObject.Schedule
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Accoun Id not Found'
      })
    }
  } catch (err) {
    console.log('error en el post Schedule  GetById', err)
    next(err)
  }
}// catch (err) {
  // console.log('error del GetById', err)
  // next(err)
  // }
)

// Modifica dayAvailable , hoursAvailabe
router.patch('/', authHandler, async (req, res, next) => {
  try {
    console.log('entro en patch de schedulerouter')
    const { sub } = req.params.tokenPayload
    const accountData = req.body
    const id = sub
    if (id) {
      const accountObject = await account.updateSchedule(id,accountData)
      console.log(accountObject)
      res.status(200).json({
       accountData
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Id not Found'
      })
    }
  } catch (err) {
    console.log('error del GetById', err)
    next(err)
  }
})

module.exports = router
