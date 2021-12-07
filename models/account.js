const AddressSchema = require('./utils/address')
const ScheduleSchema = require('./utils/schedule')
const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25,
    minlength: 1,
    unique: true
  },
  name: {
    type: String,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    minlength: 1
  },
  telephone: {
    type: Number,
    minlength: 1
  },
  degree: { // cedula
    type: String,
    minlength: 1
  },
  profileImage: { // imagen perfil
    type: String
  },
  description: {
    type: String,
    minlength: 1
  },

  address: AddressSchema, // direccion

  Schedule: ScheduleSchema // horario
}, {
  timestamp: true
})

module.exports = {
  model: mongoose.model('Account', schema),
  schema
}
