const User = require('../../models/users')
const encrypt = require('../../lib/crypt')
const jwt = require('../../lib/jwt')

const create = async (dataUser) => {
  const { password, email, role } = dataUser
  const hash = await encrypt.hashPassword(password)

  const user = new User.model({ password: hash, email, role })
  const savedUser = await user.save()
  return savedUser
}

const get = async () => {
  return await User.model.find({}).exec()
}

const getById = async (idUser) => {
  return await User.model.findById(idUser).exec()
}

const getByEmail = async (email) => {
  return await User.model.findOne(email).exec()
}

const authenticate = async (user, password) => {
  const hash = user.password
  return await encrypt.verifyPassword(password, hash)
}

// Proceso LogIn de usuarios
const logIn = async (email, password) => {
  const userObject = await getByEmail({ email })
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

module.exports = { create, get, getById, getByEmail, authenticate, logIn, update, del }
