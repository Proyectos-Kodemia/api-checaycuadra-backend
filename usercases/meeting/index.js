const Meeting = require('../../models/meeting')
const linkMeet = require('google-meet-api').meet // con esta libreria se crea el link del google meet

const create = async (meetData) => {
  const date = await new Date()
  const { user, userAccount, time, service, total} = meetData

  // El link de meet se crea en este punto trayendo el refresh-token del usuario

  const link = "FGFGSAASFDASD"
  const linktest = await linkMeet({
    clientId : process.env.GOOGLE_ID_Client_Auth,
    clientSecret : process.env.GOOGLE_Secret_Client_Auth,
    refreshToken : 'XXXXXXXXXCNfW2MMGvJUSk4V7LplXAXXXX',
    date : "2022-01-09",
    time : "22:59",
    summary : 'summary',
    location : 'location',
    description : 'description'
    }).then(function(result){
    console.log("Este seria el link:",result);//result is the final link
    })
    
    console.log(linktest)




  const meeting = new Meeting.model({user, userAccount, time, service, total, Date:date,link})

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
  del
}
