const mongoose = require('mongoose')
const { Schema } = mongoose

const ScheduleSchema = new Schema({
  costHour: {
    type: String,
    required: false
  },
  daysAvailable: { // [l.m.m,j,v,s]
    type: Array,
    required: false
  },
  startHour: { // 18-20 hrs
    type: String,
    required: false
  },
  endHour: { // 18-20 hrs
    type: String,
    required: false
  },
}, {
  timestamp: true
})

module.exports = ScheduleSchema


// hoursReserved: { 
//   // [ {startDateHour:YYYY-MM-DDTHH:mm:ss endDateHour:YYYY-MM-DDTHH:mm:ss }]
//   type: Array,
//   required: false
// },