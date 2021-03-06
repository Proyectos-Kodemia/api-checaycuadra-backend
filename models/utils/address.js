const mongoose = require('mongoose')
const { Schema } = mongoose

const AddressSchema = new Schema({
  street: { // calle
    type: String,
    minlength: 1
  },
  interiorNumber: { // numero interior
    type: Number,
    minlength: 1
  },
  outdoorNumber: { // numero exterior
    type: Number,
    minlength: 1
  },
  district: { // colonia
    type: String,
    minlength: 1
  },
  town: { // municipio
    type: String,
    minlength: 1
  },
  state: { // estado
    type: String,
    minlength: 1
  },
  cp: {
    type: Number,
    minlength: 1
  }
}, {
  timestamp: true
})

module.exports = AddressSchema
