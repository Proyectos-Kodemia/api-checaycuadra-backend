const express = require('express')
const meet = require('../usercases/meeting')
const { authHandler, userHandler } = require('../middlewares/authHandlers')
const config = require('../lib/config')
const router = express.Router()

// A partir de este punto se necesita token

router.post('/', authHandler, async (req, res, next) => {
  try {
    // El payload me lo regresa authHandler
    const { sub } = req.params.tokenPayload
    const meetData = req.body

    const meetCreated = await meet.create(meetData, sub)
    const { _id } = meetCreated

    res.status(201).json({
      ok: true,
      message: 'Meet Created successfully',
      payload: {
        meetCreated
      }
    })
  } catch (err) {
    next(err)
    // console.log(err)
  }
})

// Usamos userhHandler para que solo el usuario puede modificar su propio registro

router.patch('/hangout-link', authHandler, async (req, res, next) => {
  try {
    const { sub } = req.params.tokenPayload
    const { idMeeting } = req.body
    console.log('aqui el id Meeting en hangout-link', idMeeting)
    const meetingWithLink = await meet.createLink(idMeeting, sub)
    res.status(200).json({
      status: true,
      message: 'Meeting link create succesfully',
      payload: {
        Meeting: meetingWithLink
      }
    })
  } catch (err) {
    next(err)
    console.log(err)
  }
})

router.use(authHandler)

// Get by Id cita
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const meetObject = await meet.getById(id)

    res.status(200).json({
      payload: {
        meetObject
      }

    })
  } catch (err) {
    next(err)
    // console.log(err)
  }
})

// Get Meeting by UserClient
router.get('/client/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const meetObject = await meet.getByUserClient(id)

    res.status(200).json({
      payload: {
        meetObject
      }

    })
  } catch (err) {
    next(err)
    // console.log(err)
  }
})

// Get meeting by User Account
router.get('/account/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const meetObject = await meet.getByUserAccount(id)

    res.status(200).json({
      payload: {
        meetObject
      }

    })
  } catch (err) {
    next(err)
    // console.log(err)
  }
})

// Usamos userhHandler para que solo el usuario puede modificar su propio registro
// Path with meeting Id
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const meetingData = req.body

    const meetingUpdate = await meet.update(id, meetingData)
    res.status(200).json({
      status: true,
      message: 'Update succesfully',
      payload: {
        userUpdate: meetingUpdate
      }
    })
  } catch (err) {
    next(err)
    console.log(err)
  }
})

// Verificar como aplicaran los middlewares e.g userHandler
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const delMeet = await meet.del(id)
    res.status(200).json({
      status: true,
      message: 'Meet {id} succesfully deleted',
      payload: {
        id: delMeet.id,
        userAccount: delMeet.userAccount
      }
    })
  } catch (err) {
    next(err)
    // console.log(err)
  }
})

module.exports = router
