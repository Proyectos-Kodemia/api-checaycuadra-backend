const accountRouter = require('./accountRouter')
const authRouter = require('./authRouter')
// const documentsRouter = require('./documentsRouter')
const scheduleRouter = require('./scheduleRouter')
const mettingRouter = require('./mettingRouter')
// const serviceRouter = require('./servicesRouter')
const userRouter = require('./userRouter')
const storageRouter = require('./storageRouter')
const googleRouter = require('./googleRouter')
const mercadopagoRouter = require('./mercadopagoRouter')
// const registerRouter = require('./registerRouter')

const apiRouter = (app) => {
  app.use('/account', accountRouter)
  app.use('/auth', authRouter)
  // app.use('/register', registerRouter)
  // app.use("/documents", documentsRouter);
  app.use('/schedule', scheduleRouter);
  app.use('/metting', mettingRouter)
  // app.use("/service", serviceRouter);
  app.use('/storage/', storageRouter)
  app.use('/google', googleRouter)
  app.use('/mercadopago', mercadopagoRouter)
  app.use('/users', userRouter)
}

module.exports = apiRouter
