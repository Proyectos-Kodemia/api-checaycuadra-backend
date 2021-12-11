const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
    trim: true,
    maxlength: 25,
    minlength: 1
  },
  name: {
    type: String,
    required: false,
    trim: true,
    minlength: 1
  },
  lastName: { // Verificar si se agrega solo a contadores o también a usuarios
    type: String,
    required: false,
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
    unique: true
  },
  role: {
    type: String,
    required: true,
    minlength: 1
  },
  telephone: {
    type: Number,
    minlength: 1
  },
  profileImage: {
    type: String
  },
  idMercadoPago: {
    type: String
  }
}, {
  timestamp: true
})

module.exports = {
  model: mongoose.model('User', UserSchema),
  UserSchema
}
