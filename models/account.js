const AddressSchema = require('./utils/address')
const ScheduleSchema = require('./utils/schedule')
const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  username: {
    type: String,
    trim: true,
    maxlength: 25,
    minlength: 1
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  lastname: {
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
    minlength: 1,
    unique: true,
    trim: true
  },
  gmail: {
    type: String,
    required: false,
    minlength: 1,
    unique: true,
    trim: true
  },
  telephone: {
    type: Number,
    minlength: 1
  },
  degree: {
    type: String,
    minlength: 1
  },
  degreeId: { // cedula
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
  role: {
    type: String,
    minlength: 1,
    required: true
  },
  evaluation: {
    type: Number
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  specialities:{
    type:Array
  },
  address: AddressSchema, // direccion
  Schedule: ScheduleSchema // horario
  // address: { type: Schema.ObjectId, ref: 'Address' }, // direccion
  // Schedule: { type: Schema.ObjectId, ref: 'schedule' } // horario

}, {
  timestamp: true
})

module.exports = {
  model: mongoose.model('Account', schema),
  schema
}
