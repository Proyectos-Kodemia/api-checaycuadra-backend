const mongoose = require('mongoose')
const { Schema } = mongoose

const ScheduleSchema = new Schema({
  costHour: {
    type: String,
    required: true
  }

}, {
  timestamp: true
})

module.exports = ScheduleSchema
