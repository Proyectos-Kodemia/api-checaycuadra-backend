const mongoose = require('mongoose')
const { Schema } = mongoose

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  score: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1
  }

})

module.exports = {
  model: mongoose.model('Comment', commentsSchema),
  commentsSchema
}
