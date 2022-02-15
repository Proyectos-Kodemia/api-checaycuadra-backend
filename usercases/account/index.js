const Account = require('../../models/account')
const encrypt = require('../../lib/crypt')
const jwt = require('../../lib/jwt')

const create = async (dataAccount) => {
  // const {id, username, name, password, email, telephone, degree, profileImage, description} = dataAccount
  const { name, lastname, email, password, telephone } = dataAccount
  try {
    const role = 'account'
    const hash = await encrypt.hashPassword(password)
    const account = new Account.model({ name, lastname, password: hash, email, telephone, role })
    const savedAccount = await account.save()
    return savedAccount
  } catch (err) {
    console.log('Error desde create usecase account', err)
  }
}

const get = async () => {
  return await Account.model.find({}, 'id name lastname degree profileImage description role evaluation address Schedule ').exec()
}

const getById = async (id) => {
  return await Account.model.findById(id).exec()
}

const getByEmail = async (email) => {
  return await Account.model.findOne(email).exec()
}

const getByName = async (name) => {
  return await Account.model.find({ name: { $regex: name, $options: 'ig' } }, 'id name lastname degree profileImage description role evaluation address Schedule').exec()
}

const authenticate = async (email, password) => {
  const hash = email.password
  return await encrypt.verifyPassword(password, hash)
}

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
    console.log('error desde login contador usecase')
    return false
  }
}

const update = async (id, accountData) => {
  console.log('completo data', accountData)
  const {
    nombre: name,
    apellidos: lastname,
    estado: state,
    municipio: town,
    cp,
    precio: costHour,
    cedula: degreeId,
    formacion: degree,
    especialidades: specialities,
    acercade: description,
    email: gmail
  } = accountData

  console.log(name, lastname, state)

  const address = {
    cp,
    state,
    town
  }

  const Schedule = {
    costHour
  }

  const updateObject = { }
  // const { username, name, lastname, password, email, telephone, degree, profileImage, description, role, evaluation, address, Schedule } = accountData
  // const { street, interiorNumber, outdoorNumber, district, town, state, cp } = accountData.address
  // const { costHour, dateStart, dateEnd, rangeHours } = Schedule

  if (address && Schedule) {
    console.log('entro 1')
    return await Account.model.findByIdAndUpdate(id, { name, lastname, degree, degreeId, description, specialities, gmail, address, Schedule }).exec()
  }

  // if (address) {
  //   console.log('entro 2')
  //   return await Account.model.findByIdAndUpdate(id, { name, lastname, password, email, telephone, degree, degreeId, profileImage, description, role, evaluation, address }).exec()
  // }

  // if (Schedule) {
  //   console.log('entro 3')
  //   return await Account.model.findByIdAndUpdate(id, { username, name, lastname, password, email, telephone, degree, degreeId, profileImage, description, role, evaluation, Schedule }).exec()
  // }

  // console.log('entro 4')
  // return await Account.model.findByIdAndUpdate(id, { name, lastname, password, email, telephone, degree,degreeId, profileImage, description, role, evaluation }).exec()
}

const updateTokens = async (accountId, tokens) => {
  const accessToken = tokens.access_token
  const refreshToken = tokens.refresh_token

  return await Account.model.findByIdAndUpdate(accountId, { accessToken, refreshToken }).exec()
}
module.exports = { get, getById, getByEmail, getByName, update, updateTokens, create, logIn, authenticate }
