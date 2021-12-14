const mongoose = require('mongoose')
const { Schema } = mongoose
const Cita = mongoose.model('Cita')

const commentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }

})

module.exports = {
  model: mongoose.model('Comment', commentsSchema),
  commentsSchema
}
