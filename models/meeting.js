const mongoose = require('mongoose')
const DocumentSchema = require('./utils/documents')
const { Schema } = mongoose
const Comment = require('./utils/comments').model()
const Account = mongoose.model('Account')
const Usuario = mongoose.model('User')

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: Usuario
  },
  userAccount: {
    type: Schema.Types.ObjectId,
    ref: Account
  },
  summary: {
    type: String
  },
  description: {
    type: String
  },
  startDateTime: {
    type: String
  },
  endDateTime: {
    type: String
  },
  hangoutLink: {
    type: String,
    required: false,
    minlength: 1
  },
  title: { // Servicio
    type: String,
    required: true,
    minlength: 1
  },
  unit_price: {
    type: String,
    required: false,
    minlength: 1
  },
  quantity: {
    type: String,
    required: false,
    minlength: 1
  },
  statusPayment: {
    type: String,
    required: false,
    minlength: 1
  },
  documents: { // Recibe los distintos documentos de la cita enviados por cliente o contador
    type: Array
  },
  date: {
    type: Date,
    required: false
  },
  day: {
    type: String,
    required: false
  },
  hour: {
    type: String,
    required: false
  },
  week: {
    type: String,
    required: false
  }
}, {
  timestamp: true
})
module.exports = {
  model: mongoose.model('Cita', schema),
  schema
}
