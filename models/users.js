const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({

  username: {
    type: String,
    required: false,
    trim: true,
    maxlength: 25,
    minlength: 1,
    unique: false

  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1

  },
  lastname: {
    type: String,
    required: true,
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
    required: false,
    minlength: 1
  },
  telephone: {
    type: Number,
    minlength: 1
  },
  profileImage: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
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
