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

// Tranformaciones para el calendario del cliente
const getByIdSchedule = async (id) => {
  return await Account.model.findById(id).exec()
}
const getByEmail = async (email) => {
  return await Account.model.findOne(email).exec()
}

const getByName = async (name) => {
  return await Account.model.find({ name: { $regex: name, $options: 'ig' } }, 'id name lastname degree profileImage description role evaluation address Schedule').exec()
}

const getBySpecialities = async (data) => {
  console.log('buscando especialidad', data)
  const total = await Account.model.count()
  // console.log(total)
  let registros = []
  
  const searchSpecialities = await Account.model.find().sort({ name: -1 }).exec()
  const objectSpecialities = searchSpecialities.map((register, index) => {
    // console.log('***** aqui esta iniciando el registro', register)
    const valor = register.specialities.map((speciality) => {
      console.log('***** aqui esta iniciando el registro', speciality)
      console.log('especialidad ',JSON.stringify(speciality.title))
      console.log('data ',data)
      if (JSON.stringify(speciality.title) === data.title) {
        return true
      } else {
        return false
      }
    })
    console.log('***** aqui esta el valor', valor)
    if (valor) {
      registros = [...registros, register]
    } else {
      registros = [...registros]
    }
    return registros
  })
  // console.log('*****************viendo que regresa',objectSpecialities)
  return objectSpecialities

  // return await Account.model.find(
  //   { data },
  //   'id name lastname degree profileImage description role evaluation address Schedule specialities').sort({ name: 1 }).exec()
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
    email: gmail,
    daysAvailable,
    startHour,
    endHour
  } = accountData

  console.log(name, lastname, state)

  const address = {
    cp,
    state,
    town
  }

  // Transformaciones de daysAvailable
  // const changeDaysToLowerCase = (days) => {
  //   days.map(day => day.toLowerCase())
  //   console.log(days)
  // }

  // const daysInEnglish = {
  //   lunes: monday,
  //   martes: tuesday,
  //   miercoles: wednesday,
  //   jueves: thursday,
  //   viernes: friday,
  //   sabado: saturday,
  //   domingo: sunday
  // }

  // const translateDays = (arrayDays) => {
  //   arrayDays.map((item) => {
  //     if (item === lunes) {
  //       return [...item, "monday"]
  //     } else if (item === martes) {
  //       return [...item, "tuesday"]
  //     } else if (item === miercoles) {
  //       return [...item, "wednesday"]
  //     } else if (item === jueves) {
  //       return [...item, "thursday"]
  //     } else if (item === viernes) {
  //       return [...item, "friday"]
  //     } else if (item === sabado) {
  //       return [...item, "saturday"]
  //     } else {
  //       return [...item, "sunday"]
  //     }
  //     return item
  //   })
  // }

  // Hacer los cambios en este punto, antes de crear el objeto
  // console.log(daysAvailable)
  // const changeToLowerCase = changeDaysToLowerCase(daysAvailable)
  // console.log("transformando a min", changeToLowerCase)
  // const changeToEnglish = translateDays(daysAvailable)
  // console.log("a ingles", changeToEnglish)

  const Schedule = {
    costHour,
    daysAvailable,
    startHour,
    endHour
  }

  const updateObject = { }
  // Transformaciones de daysAvailable
  const changeDaysToLowerCase = (days) => {
    days.map(day => day.toLowerCase())
    console.log(days)
  }
  // const updateObject = {}
  // const { username, name, lastname, password, email, telephone, degree, profileImage, description, role, evaluation, address, Schedule } = accountData
  // const { street, interiorNumber, outdoorNumber, district, town, state, cp } = accountData.address
  // const { costHour, dateStart, dateEnd, rangeHours } = Schedule

  if (address && Schedule) {
    console.log('entro 1')
    return await Account.model.findByIdAndUpdate(id, { name, lastname, degree, degreeId, description, specialities, gmail, address, Schedule }).exec()
  }

  if (address) {
    console.log('entro 2')
    return await Account.model.findByIdAndUpdate(id, { name, lastname, degree, degreeId, description, specialities, gmail, address }).exec()
  }

  if (Schedule) {
    console.log('entro 3')
    return await Account.model.findByIdAndUpdate(id, { name, lastname, degree, degreeId, description, specialities, gmail, Schedule }).exec()
  }

  console.log('entro 4')
  return await Account.model.findByIdAndUpdate(id, { name, lastname, degree, degreeId, description, specialities, gmail }).exec()
}

const updateTokens = async (accountId, tokens) => {
  const accessToken = tokens.access_token
  const refreshToken = tokens.refresh_token

  return await Account.model.findByIdAndUpdate(accountId, { accessToken, refreshToken }).exec()
}
module.exports = { getBySpecialities, get, getById, getByIdSchedule, getByEmail, getByName, update, updateTokens, create, logIn, authenticate }
