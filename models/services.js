const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema(
  {
    id: {
      type: String
    },
    nameService: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      minlength: 1
    },
    toDo: [
      {
        // entregables
        type: String,
        required: true
      }
    ]
  },
  {
    timestamp: true
  }
)

module.exports = {
  model: mongoose.model('Services', schema),
  schema
}
