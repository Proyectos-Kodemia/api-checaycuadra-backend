const Meeting = require('../../models/meeting')
const linkMeet = require('google-meet-api').meet
const oauth2 = require("../../lib/oauth2") 

// Authorize Google process

const authUserRedirect= async (googleClientId,googleSecret,googleRedirectUri)=>{

  const url = await oauth2.redirectUrl(googleClientId,googleSecret,googleRedirectUri)

  return url

}

const authUserSetCredencials = async (accestTOken,refreshToken)=>{
  return await oauth2.setCredentials(accesToken,refresToken)
}

const create = async (meetData) => {
  const date = await new Date()
  const { user, userAccount, time, service, total} = meetData

  // Falta crear el link de zoom y agregarlo aquí

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
  del,
  authUserRedirect
}
