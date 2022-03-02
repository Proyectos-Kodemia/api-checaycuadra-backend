const Meeting = require('../../models/meeting')
const schema = require('../../models/meeting')
const linkMeet = require('google-meet-api').meet // con esta libreria se crea el link del google meet
const { google } = require('googleapis')
const randomstring = require('randomstring')
const config = require('../../lib/config')
const userCase = require('../user')
const accountCase = require('../account')

// const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
// const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const create = async (meetData, sub) => {
  const user = sub
  const { userAccount, title, startDateTime, endDateTime, unit_price, quantity, statusPayment } = meetData
  console.log("todo la data", meetData)

  // Guardando cita en la base de datos
  const meeting = new Meeting.model({ user, userAccount, startDateTime, endDateTime, title, quantity, unit_price, statusPayment })

  const savedMeeting = await meeting.save()

  return savedMeeting
}

const getById = async (id) => {
  return await Meeting.model.findById(id).exec()
}

const createLink = async (id) => {
  const idMeeting = id
  // const idMeeting = mongoose.Types.ObjectId.createFromHexString(id)
  // const idMeeting = mongoose.mongo.BSONPure.ObjectId.fromHexString(id)

  // const idMeeting = id
  const meetData = await Meeting.model.findById(idMeeting).exec()

  const { user, userAccount, title, startDateTime, endDateTime, unit_price, quantity, statusPayment } = meetData

  // Ejemplo
  // 'dateTime': '2015-05-28T09:00:00-07:00',
  // 'timeZone': 'America/Los_Angeles',
  // new Date(startDateTime).toLocaleDateString("en-US", { timeZone: 'America/Mexico_City' }),

  const startMex = `${startDateTime}:00-06:00`
  const endMex = `${endDateTime}:00-06:00`
  const summary = `Cita para la consultoría de ${title}`
  const description = 'Cita creada por Checa y Cuadra'
  // Obtener refresh token de DB
  const account = userAccount.valueOf()
  console.log("el contador con refreshhToken ", account)
  const { refreshToken } = await accountCase.getById(account)

  const googleClientId = config.google.clientId
  const googleSecret = config.google.secret
  const googleRedirectUri = config.google.redirectUri

  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleSecret,
    googleRedirectUri
  )

  // Setting user credentials
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  const requestId = randomstring.generate()

  // Obtener email del usuario
  const { email } = await userCase.getById(user)

  // Crear evento
  const calendar = google.calendar('v3')
  const meetGoogle = await calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    conferenceDataVersion: 1,
    requestBody: {
      summary: summary,
      description: description,
      colorId: '7',
      start: {
        dateTime: new Date(startDateTime),
        timezone: 'America/Mexico_City'
      },
      end: {
        dateTime: new Date(endDateTime),
        timezone: 'America/Mexico_City'
      },
      attendees: [
        { email: email }
      ],

      conferenceData: {
        createRequest: {
          requestId: requestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }

        }
      }
    }
  })

  const { hangoutLink } = meetGoogle.data
  console.log(hangoutLink)
  // Guardando cita en la base de datos
  const meetingWithLink = await Meeting.model.findByIdAndUpdate(idMeeting, { hangoutLink }).exec()

  return meetingWithLink
}

const getAll = async () => {
  return await Meeting.model.find({}).exec()
}

const getByUserClient = async (id) => {
  return await Meeting.model.find({ user: id }).exec()
}

const getByUserAccount = async (id) => {
  return await Meeting.model.find({ userAccount: id }).exec()
}

const update = async (meetingId, meetingData) => {
  const { userAccount, title, startDateTime, endDateTime, unit_price, quantity, statusPayment } = meetingData
  return await Meeting.model.findByIdAndUpdate(meetingId, { userAccount, title, startDateTime, endDateTime, unit_price, quantity, statusPayment }).exec()
}

const del = async (meetingId) => {
  return await Meeting.model.findByIdAndDelete(meetingId).exec()
}

module.exports = {
  getAll,
  getById,
  getByUserAccount,
  getByUserClient,
  update,
  create,
  createLink,
  del
}
