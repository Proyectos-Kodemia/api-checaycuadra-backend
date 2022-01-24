const Meeting = require('../../models/meeting')
const linkMeet = require('google-meet-api').meet // con esta libreria se crea el link del google meet
const { google } = require("googleapis")
const randomstring= require("randomstring")
const config = require('../../lib/config')
const userCase = require('../user')
const accountCase = require('../account')

const create = async (meetData,sub) => {
  const user = sub
  const { userAccount, title, startDateTime,endDateTime, unit_price, quantity,statusPayment} = meetData

  // Guardando cita en la base de datos
  const meeting = new Meeting.model({user, userAccount, startDateTime,endDateTime, title, quantity,unit_price,statusPayment})

  const savedMeeting = await meeting.save()
  
  return savedMeeting
}

const createLink = async (meetData,sub) => {
  const user = sub
  const { userAccount, service, startDateTime,endDateTime, total} = meetData
  const summary = `Cita para el servicio de ${service}`
  const description = `Cita creada por Checa y Cuadra`
  // Obtener refresh token de DB

  const {refreshToken} = await userCase.getById(user)

  const googleClientId = config.google.clientId
  const googleSecret = config.google.secret
  const googleRedirectUri = config.google.redirectUri

  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleSecret,
    googleRedirectUri
    )

    // Setting user credentials
  oauth2Client.setCredentials({refresh_token:refreshToken})
  const requestId = randomstring.generate()

    // Obtener email del contador
    const {email} = await accountCase.getById(userAccount)

  // Crear evento
  const calendar = google.calendar('v3')
  const meetGoogle = await calendar.events.insert({
    auth:oauth2Client,
    calendarId:'primary',
    conferenceDataVersion:1,
    requestBody:{
      summary:summary,
      description:description,
      colorId:'7',
      start:{
        dateTime: new Date(startDateTime),
        timezone:'America/Mexico_City'
      },
      end:{
        dateTime: new Date(endDateTime),
        timezone:'America/Mexico_City'
      },
      attendees:[
        {email:email}
      ],
      
      conferenceData:{
        createRequest:{
          requestId: requestId,
          conferenceSolutionKey:{
            type:'hangoutsMeet'
          }
          
        }
      }
    }
  })
  
  const {hangoutLink} = meetGoogle.data

  // Guardando cita en la base de datos
  const meeting = new Meeting.model({user, userAccount, startDateTime,endDateTime, service, total,hangoutLink})

  const savedMeeting = await meeting.save()
  
  return savedMeeting
}

const getAll = async () => {
  return await Meeting.model.find({}).exec()
}

const getById = async (id) => {
  return await Meeting.model.findById(id).exec()
}

const getByUserClient = async (id) => {
  return await Meeting.model.find({user: id}).exec()
}

const getByUserAccount = async (id) => {
  return await Meeting.model.find({userAccount: id}).exec()
}

const update = async (meetingId, meetingData) => {
  const { user, userAccount, link, time, service, total } = meetingData
  return await Meeting.model.findByIdAndUpdate(meetingId, { user, userAccount, link, time, service, total }).exec()
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
