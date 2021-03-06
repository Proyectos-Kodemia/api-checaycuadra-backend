const express = require('express')
const moment = require('moment')
const upload = require('../lib/multer')
const storage = require('../usercases/storage')

const account = require('../usercases/account')

const router = express.Router()
const { authHandler } = require('../middlewares/authHandlers')

router.get('/:id', async (req, res, next) => {
  try {
    // console.log('entro en id')
    const { id } = req.params
    // console.log(id)

    if (id) {
      const accountObject = await account.getById(id)
      const startHour = accountObject.Schedule.startHour
      const endHour = accountObject.Schedule.endHour

      const rangeHours = (startHour, endHour) => {
        const duration = parseInt(endHour) - parseInt(startHour)
        const schedulesAccount = []
        for (let i = 0; i < duration; i++) {
          schedulesAccount.push(
            `${parseInt(startHour) + i}:00 - ${parseInt(startHour) + i + 1}:00`
          )
        }

        return schedulesAccount
      }
      const schedules = rangeHours(startHour, endHour)
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
    // console.log('error del GetById', err)
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    // const { id } = req.params
    console.log('entro en el get')

    if (req.query.name) {
      // //console.log('entro en name')
      const searchUser = req.query.name
      const accountGet = await account.getByName(searchUser)
      res.status(200).json({
        status: true,
        payload: accountGet
      })
    } else if (req.query.specialities) {
      console.log('entro en especialidad')
      // console.log(req.query.specialities)
      const searchSpecialities = req.query.specialities
      const specialitiesGet = await account.getBySpecialities(searchSpecialities)
      // console.log(specialitiesGet)
      res.status(200).json({
        status: true,
        payload: specialitiesGet
      })
    } else {
      const accountGet = await account.get()
      res.status(200).json({
        status: true,
        payload: accountGet
      })
    }
  } catch (err) {
    // console.log('error del Get account', err)
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

router.post('/verifyAuth', async (req, res, next) => {
  try {
    const { token } = req.headers
    const idByToken = await account.getIdByToken(token)
    res.status(201).json({
      status: true,
      message: 'Token Valid',
      payload: idByToken.sub
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
    // console.log('error del Delete', err)
    next(err)
  }
})

router.patch('/perfil', authHandler, upload.single('imgfile'), async (req, res, next) => {
  console.log('entra al patch')
  const { sub } = req.params.tokenPayload
  console.log(sub)
  console.log("toda la data account", req.body)

  try {
    const { sub } = req.params.tokenPayload
    console.log('id en patch perfil', sub)
    let profileImage = ''
    if (sub) {
      const accountData = req.body
      const fileData = req.body.imgfile

      if (fileData === 'undefined' ) {
        profileImage = null
      } else {
        console.log(">>> el fileData", fileData)
        const file = req.file

        console.log(">>el file", file)

        console.log("la imagen", fileData)
        console.log("este file", file)
        profileImage = file.location
      }



      console.log('recibiendo la data', accountData)

      const accountUpdate = await account.update(sub, accountData, profileImage)
      res.status(200).json({
        status: true,
        message: 'Update Successfully',
        payload: {
          accountUpdate,
        }
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Id not Found'
      })
    }
  } catch (err) {
    console.log('error del Patch accountRouter', err)
    next(err)
  }
})

module.exports = router
