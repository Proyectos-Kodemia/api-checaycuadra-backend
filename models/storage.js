const mongoose = require('mongoose')
const { Schema } = mongoose

const StorageSchema = new Schema({
  idUpload: {
    type: String,
    required: true
  },
  nameDocument: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  comments: {
    type: String
  },
  Date: {
    type: Date,
    required: true,
    minlength: 1
  }
}, {
  timestamp: true
})

module.exports = {
  model: mongoose.model('Storage', StorageSchema),
  StorageSchema
}
