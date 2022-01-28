const Storage = require('../../models/storage')

const create = async (dataFiles) => {
  // {fileData: {...}. linkAWS: "https://"}
  const { idUpload, nameDocument, description, comments, linkAWS } = dataFiles
  const date = await new Date()

  const files = new Storage.model({ idUpload, nameDocument, description, comments, Date: date, linkAWS })

  const filesSaved = await files.save()
  return filesSaved
}

const updateById = async (id, dataFile) => {
  const fileUpdated = Storage.model.findByIdAndUpdate(id, dataFile, { new: true })
  return fileUpdated
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
    //console.log('error desde login usuario usecase')
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

module.exports = { create, updateById, get, getById, getByEmail, authenticate, logIn, update, del }
