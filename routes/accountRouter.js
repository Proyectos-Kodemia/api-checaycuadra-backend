const express = require('express')
const moment = require('moment')

const account = require('../usercases/account')

const router = express.Router()
const { authHandler } = require('../middlewares/authHandlers')

router.get('/:id', async (req, res, next) => {
  try {
    console.log('entro en id')
    const { id } = req.params
    console.log(id)

    if (id) {
      const accountObject = await account.getById(id)
      const startHour = accountObject.Schedule.startHour
      const endHour = accountObject.Schedule.endHour

      const rangeHours = (startHour, endHour) => {
        const duration = parseInt(endHour) - parseInt(startHour)
        const schedulesAccount = []
          for (var i = 0; i < duration; i++) {
            schedulesAccount.push(
              `${parseInt(startHour)+i}:00 - ${parseInt(startHour) + i+1}:00`
            )
          }
        return schedulesAccount
        console.log("en la funcion ranges", schedulesAccount)
      }
      const schedules = rangeHours(startHour, endHour)

      console.log("los rangos", schedules)

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
        Schedule: accountObject.Schedule,
        schedules
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

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.params

    if (req.query.name) {
      // console.log('entro en name')
      const searchUser = req.query.name
      const accountGet = await account.getByName(searchUser)
      res.status(200).json({
        status: true,
        payload: accountGet
      })
    } else {
      const accountGet = await account.get()
      res.status(200).json({
        status: true,
        payload: accountGet
      })
    }
  } catch (err) {
    console.log('error del Get account', err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const accountData = req.body
    const accountCreated = await account.create(accountData)
    const { _id } = accountCreated
    res.status(201).json({
      status: true,
      message: 'Account Created Succesfully',
      payload: _id
    })
  } catch (err) {
    console.log('error del post', err)
    next(err)
  }
})


// router.patch('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params
//     if (id) {
//       const accountData = req.body

//       const accountUpdate = await account.update(id, accountData)
//       res.status(200).json({
//         status: true,
//         message: 'Update Successfully',
//         payload: {
//           Id: accountUpdate._id,
//           name: accountUpdate.name,
//           role: accountUpdate.role
//         }
//       })
//     } else {
//       res.status(404).json({
//         status: false,
//         message: 'Id not Found'
//       })
//     }
//   } catch (err) {
//     console.log('error del Patch', err)
//     next(err)
//   }
// })

router.delete('/:id', async (res, req, next) => {
  try {
    const { id } = req.params
    if (id) {
      const accountDel = await account.delete(id)
      res.status(200).json({
        status: true,
        message: 'the account was completely deleted',
        payload: accountDel
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Id not Found'
      })
    }
  } catch (err) {
    console.log('error del Delete', err)
    next(err)
  }

})

router.patch('/perfil', authHandler, async (req, res, next) => {
  console.log("entra al patch")
  const { sub } = req.params.tokenPayload
  console.log(sub)
  try {
    const { sub } = req.params.tokenPayload
    console.log("id en patch perfil", sub)

    if (sub) {
      const accountData = req.body

      console.log("recibiendo la data", accountData)

      const accountUpdate = await account.update(sub, accountData)
      res.status(200).json({
        status: true,
        message: 'Update Successfully',
        payload: {
          accountUpdate
        }
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Id not Found'
      })
    }
  } catch (err) {
    console.log('error del Patch', err)
    next(err)
  }
})

module.exports = router