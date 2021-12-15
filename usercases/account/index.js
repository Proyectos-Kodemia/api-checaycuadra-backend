const Account = require('../../models/account')
const encrypt = require('../../lib/crypt')
const jwt = require('../../lib/jwt')

const create = async (dataAccount) => {
  // const {id, username, name, password, email, telephone, degree, profileImage, description} = dataAccount
  const { name, lastname, password, email, telephone, role } = dataAccount
  try {
    const hash = await encrypt.hashPassword(password)
    const account = new Account.model({ name, lastname, password: hash, email, telephone, role })
    const savedAccount = await account.save()
    return savedAccount
  } catch (err) {
    console.log('Error desde create usecase', err)
  }
}

const get = async () => {
  return await Account.model.find({}).exec()
}

const getById = async (id) => {
  return await Account.model.findById(id).exec()
}

const getByUser = async (username) => {
  return await Account.model.findOne(username).exec()
}

const authenticate = async (user, password) => {
  const hash = user.password
  return await encrypt.verifyPassword(password, hash)
}

const logIn = async (username, password) => {
  const userObject = await getByUser({ username })
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
    console.log('error en login')
  }
}

const update = async (id, accountData) => {
  const { email, telephone } = accountData
  return await Account.model.findByIdAndUpdate(id, { email, telephone }).exec()
}

module.exports = { get, getById, getByUser, update, create, logIn, authenticate }
