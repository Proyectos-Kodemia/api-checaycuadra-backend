const mongoose = require('mongoose')
const config = require('./config')

const connect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(`mongodb+srv://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.name}?retryWrites=true&w=majority`,
      { useNewUrlParser: true })

    const db = mongoose.connection

    db.on('open', () => {
      console.warn('Connection succesfull')
      resolve(mongoose)
    })
    db.on('error', (error) => {
      console.error('Connection failed', error)
      reject(error)
    })
  })
}

module.exports = { connect }
