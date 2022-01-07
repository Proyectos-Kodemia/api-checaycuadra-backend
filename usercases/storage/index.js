const Storage = require('../../models/storage')

const create = async (dataFiles) => {
  const { idUpload, nameDocument,description,comments} = dataFiles



  const files = new Storage.model({ idUpload, nameDocument, description,comments })

  const filesSaved = await files.save()
  return filesSaved
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
  const hash = userObject.password
  const isValid = await encrypt.verifyPassword(password, hash)

  if (isValid) {
    const payload = {
      sub: userObject._id,
      role: userObject.role
    }

    const token = await jwt.sign(payload)
    return token
  } else {
    console.log('error desde login usuario usecase')
    return false
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
