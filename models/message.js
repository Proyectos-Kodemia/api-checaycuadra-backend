const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    user: {
      type: String,
      required: true,
      minlength: 1
    },
    userAccount: {
      type: String,
      required: true,
      minlength: 1
    },
    date: {
      type: Date,
      required: true,
      default: Date.now()
    },
    message: {
      type: String,
      required: true,
      minlength: 1
    },
    documentName: {
      type: String
    },
    documentUrl: {
      type: String
    }
  },
  {
    timestamp: true
  }
)

module.exports = {
  model: mongoose.model('Messages', schema),
  schema
}
