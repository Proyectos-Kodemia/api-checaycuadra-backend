const mongoose = require('mongoose')
const DocumentSchema = require('./utils/documentos')
const { Schema } = mongoose
const Comment = mongoose.model("Comment")

const schema = new Schema({
  user: {
		 type: Schema.Types.ObjectId, 
    ref: 'Usuario'
  },
  userAccount: {
    type: String,
    required: true,
    minlength: 1
	  },
  Date: {
    type: Date,
    required: true,
    minlength: 1
	  },
  link: {
    type: String,
    required: true,
    minlength: 1
	  },
  time: {
    type: String,
    required: true,
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
  
  documents: [DocumentSchema],
  chat: {}
},

meetingComment:[{ 
  type: Schema.Types.ObjectId, 
  ref: 'Comment' 
}]

{
  timestamp: true
})

// {
// 	usuario: 'ObjectId(wereyy234565434re)',
// 	hora: '',
// 	fecha: '',
// 	documents: [
// 		{

// 		}
// 	]
// }

module.exports = {
  model: mongoose.model('Cita', schema),
  schema
}
