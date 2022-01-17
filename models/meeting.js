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
    type: String, 
  },
  description: {
    type: String, 
  },
  startDateTime:{
    type:String,
  },
  endDateTime:{
    type:String,
  },
  link: {
    type: String,
    required: false,
    minlength: 1
  },
  service: {
    type: String,
    required: true,
    minlength: 1
  },
  total: {
    type: String,
    required: false,
    minlength: 1
  },
  documents:{ // Recibe los distintos documentos de la cita enviados por cliente o contador
    type: Array,
  },
}, {
  timestamp: true
})

module.exports = {
  model: mongoose.model('Cita', schema),
  schema
}
