const Meeting = require('../../models/meeting')

const getAll = async () => {
  return await Meeting.model.find({}).exec()
}

const getById = async (id) => {
  return await Meeting.model.findById(id).exec()
}

const getByUser = async (user) => {
  return await Meeting.model.findOne(user).exec()
}

const update = async (postId, postData) => {
  const { Date, time, service, total } = postData
  return await Meeting.model.findByIdAndUpdate(postId, { Date, time, service, total }).exec()
}

module.exports = {
  getAll,
  getById,
  getByUser,
  update
}
