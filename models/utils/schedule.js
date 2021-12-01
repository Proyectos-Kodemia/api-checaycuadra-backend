const mongoose = require('mongoose')
const { Schema } = mongoose

const ScheduleSchema = new Schema({
  costHour: {
    type: String,
    required: true
  },
  dateStart: {
    type: Date,
    required: true,
    minlength: 1
  },
  dateEnd: {
    type: Date,
    required: true,
    minlength: 1
  },
  rangeHours: {
    type: Array,
    required: true,
    minlength: 1
  }
}, {
  timestamp: true
})

module.exports = ScheduleSchema
