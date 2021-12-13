const mongoose = require('mongoose')
const { Schema } = mongoose

const DocumentSchema = new Schema({
  nameDocument: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  whoSent: {
    type: String,
    enum: ['user', 'account']
  },
  comments: {
    type: String
  }
}, {
  timestamp: true
})

module.exports = DocumentSchema
