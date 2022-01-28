const express = require('express')
const user = require('../usercases/user')
const { authHandler, userHandler } = require('../middlewares/authHandlers')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const userData = req.body

    // //console.log(userData)

    const userCreated = await user.create(userData)
    const { _id } = userCreated
    res.status(201).json({
      status: true,
      message: 'User Created successfully',
      payload: {
        _id
      }
    })
  } catch (err) {
    next(err)
    //console.log(err)
  }
})

// A partir de este punto se necesita token

router.use(authHandler)

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params

    const userObject = await user.getById(id)

    res.status(200).json({
      payload: {
        id: userObject._id,
        email: userObject.email,
        name: userObject.name
      }

    })
  } catch (err) {
    next(err)
    //console.log(err)
  }
})

// Usamos userhHandler para que solo el usuario puede modificar su propio registro
router.patch('/:id', userHandler, async (req, res, next) => {
  try {
    const { id } = req.params
    const userData = req.body

    const userUpdate = await user.update(id, userData)
    res.status(200).json({
      status: true,
      message: 'Update succesfully',
      payload: {
        userUpdate
      }
    })
  } catch (err) {
    next(err)
    //console.log(err)
  }
})

router.delete('/:id', userHandler, async (req, res, next) => {
  const { id } = req.params
  try {
    const delUser = await user.del(id)
    res.status(200).json({
      status: true,
      message: 'User {id} succesfully deleted',
      payload: {
        id: delUser.id,
        email: delUser.email
      }
    })
  } catch (err) {
    next(err)
    //console.log(err)
  }
})

module.exports = router
