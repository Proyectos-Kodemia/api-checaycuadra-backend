const Meeting = require('../../models/meeting')
const linkMeet = require('google-meet-api').meet // con esta libreria se crea el link del google meet
const { google } = require("googleapis")
const randomstring= require("randomstring")
const config = require('../../lib/config')
const userCase = require('../user')

const create = async (meetData) => {
  const { user, userAccount, service, starDateTime,endDateTime, total} = meetData
  const summary = `Cita para el servicio de ${service}`
  const description = `Cita creada por Checa y Cuadra`
  // Obtener refresh token de DB

  const {refreshToken} = await userCase.getById(user)

  console.log(">Refresh token:",refreshToken)

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
  console.log("checar randomstring:",requestId)
  // checar randomstring.generate()

    // probar quitar acceso y obtener el refresh token nuevamente

  // Crear evento
  const calendar = google.calendar('v3')
  const meetGoogle = await calendar.events.insert({
    auth:oauth2Client,
    calendarId:'primary',
    requestBody:{
      summary:summary,
      description:description,
      colorId:'7',
      start:{
        dateTime: new Date(starDateTime),
        timezone:'America/Mexico_City'
      },
      end:{
        dateTime: new Date(endDateTime),
        timezone:'America/Mexico_City'
      },
      attendees:[
        {email:'phdmikes400@gmail.com'},
        {email:'ferdinand.bracho@gmail.com'}
      ],
      autoAddHangouts:true,
      // conferenceDataVersion:1,
      conferenceData:{
        createRequest:{
          requestId: requestId,
          conferenceSolutionKey:{
            type:'hangoutsMeet'
          },
          entryPoints:[
            {
              entryPointType:'video',
              label:requestId  //probando con request Id
            }
          ]
          
        }
      }
    }
  })


  // De donde saco el link???
  const meeting = new Meeting.model({user, userAccount, starDateTime,endDateTime, service, total})

  const savedMeeting = await meeting.save()

  return meetGoogle
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
  del
}
