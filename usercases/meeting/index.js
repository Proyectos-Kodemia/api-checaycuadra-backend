const Meeting = require('../../models/meeting')

const create = async (meetData) => {
  const date = await new Date()
  const { user, userAccount, time, service, total} = meetData

  // Falta crear el link de zoom y agregarlo aquí
  const link ="https:hjaoijfopjasdf"
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
