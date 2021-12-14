const express = require('express')
const config = require('./lib/config')
const cors = require('cors')
const app = express()

const apiRouter = require('./routes')

// const { logErrors, errorHandler } = require('./middlewares/errorHandlers')
// const authHandler = require('./middlewares/authHandlers')

app.use(cors('*'))

const db = require('./lib/db')
const port = config.app.port

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World😊!')
})

// app.use(authHandler)

apiRouter(app)

// app.use(logErrors);
// app.use(errorHandler);

app.listen(port, () => {
  db.connect()
    .then(() => {
      console.log('DB connected🤩')
      console.log(`Listening on port: http://localhost:${port}`)
    })
    .catch((error) => {
      console.error('Connection refused 😔', error)
    })
})
