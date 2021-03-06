const User = require('../../models/users')
const encrypt = require('../../lib/crypt')
const jwt = require('../../lib/jwt')

const create = async (dataUser) => {
  const { name, lastname, email, password, telephone } = dataUser
  const role = 'cliente'
  const hash = await encrypt.hashPassword(password)

  const user = new User.model({ name, lastname, password: hash, email, telephone, role })
  // if role usando user( userId)

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

const authenticate = async (email, password) => {
  const hash = email.password
  return await encrypt.verifyPassword(password, hash)
}

// Proceso LogIn de usuarios
const logIn = async (email, password) => {
  const userObject = await getByEmail({ email })
  console.log('esto es lo que retorno el usuario', userObject)
  if (userObject) {
    const hash = userObject.password
    const isValid = await encrypt.verifyPassword(password, hash)

    if (isValid) {
      const payload = {
        sub: userObject._id,
        role: 'usuario'
      }
      const token = await jwt.sign(payload)
      // //console.log(token)
      return token
    } else {
      // console.log('error desde login usuario usecase')
      return false
    }
  } else {
    const user = false
    return user
  }
}

const update = async (userId, userData) => {
  const { username, name } = userData
  return await User.model.findByIdAndUpdate(userId, { username, name }).exec()
}

const updateTokens = async (userId, tokens) => {
  const accessToken = tokens.access_token
  const refreshToken = tokens.refresh_token

  return await User.model.findByIdAndUpdate(userId, { accessToken, refreshToken }).exec()
}

const del = async (userId) => {
  return await User.model.findByIdAndDelete(userId).exec()
}

module.exports = {
  create,
  get,
  getById,
  getByEmail,
  authenticate,
  logIn,
  update,
  del,
  updateTokens
}
