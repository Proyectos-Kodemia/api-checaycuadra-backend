const User = require('../../models/users')
const encrypt = require('../../lib/crypt')
const jwt = require('../../lib/jwt')

const create = async (dataUser) => {
  const { password, email } = dataUser
  const hash = await encrypt.hashPassword(password)

  const user = new User.Model({ password: hash, email })
  const savedUser = await user.save()
  return savedUser
}

const get = async () => {
  return await User.Model.find({}).exec()
}

const getById = async (idUser) => {
  return await User.Model.findById(idUser).exec()
}

const getByUser = async (user) => {
  console.log(user)
  return await User.Model.findOne(user).exec()
}

const authenticate = async (user, password) => {
  const hash = user.password
  return await encrypt.verifyPassword(password, hash)
}

// Proceso LogIn de usuarios
const logIn = async (username, password) => {
  const userObject = await getByUser({ username })
  const hash = userObject.password
  const isValid = await encrypt.verifyPassword(password, hash)

  if (isValid) {
    const payload = {
      sub: userObject._id

    }

    const token = await jwt.sign(payload)
    return token
  } else {
    error()
  }
}

const update = async (userId, userData) => {
  const { username, name } = userData
  return await User.model.findByIdAndUpdate(userId, { username, name }).exec()
}

const del = async (userId) => {
  return await User.model.findByIdAndDelete(userId).exec()
}

module.exports = { create, get, getById, getByUser, authenticate, logIn, update, del }
