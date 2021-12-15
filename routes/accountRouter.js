const express = require('express')

const account = require('../usercases/account')

const router = express.Router()

router.get('/', async (_, res, next) => {
  try {
    const accountGet = await account.get()
    res.status(200).json({
      status: true,
      message: 'Done!',
      payload: accountGet
    })
  } catch (err) {
    console.log('error del Get', err)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (id) {
      const accountObject = await account.getById(id)
      res.status(200).json({
        id: accountObject.id,
        userName: accountObject.username
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

router.post('/', async (req, res, next) => {
  try {
    const accountData = req.body
    console.log(accountData)
    const accountCreated = await account.create(accountData)
    const { _id } = accountCreated
    console.log(accountCreated)
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
module.exports = router

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    if (id) {
      const accountData = req.body

      const accountUpdate = await account.update(id, accountData)
      res.status(200).json({
        status: true,
        message: 'Update Successfully',
        payload: {
          Id: accountUpdate._id,
          name: accountUpdate.name,
          username: accountUpdate.username
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
