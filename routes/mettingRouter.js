const express = require('express')
const meet = require('../usercases/meeting')
const { authHandler, userHandler } = require('../middlewares/authHandlers')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const meetData = req.body
    const meetCreated = await meet.create(meetData)
    const { _id } = meetCreated
    res.status(201).json({
      ok: true,
      message: 'Meet Created successfully',
      payload: {
        _id
      }
    })
  } catch (err) {
    next(err)
    console.log(err)
  }
})

// A partir de este punto se necesita token

router.use(authHandler)

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const meetObject = await meet.getById(id)

    res.status(200).json({
      payload: {
        id: meetObject._id,
        email: meetObject.email,
        name: meetObject.name
      }

    })
  } catch (err) {
    next(err)
    console.log(err)
  }
})

// Usamos userhHandler para que solo el usuario puede modificar su propio registro
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const meetData = req.body

    const meetUpdate = await meet.update(id, meetData)
    res.status(200).json({
      status: true,
      message: 'Update succesfully',
      payload: {
        userUpdate: meetUpdate
      }
    })
  } catch (err) {
    next(err)
    console.log(err)
  }
})
//Verificar como aplicaran los middlewares e.g userHandler
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
    console.log(err)
  }
})

module.exports = router
