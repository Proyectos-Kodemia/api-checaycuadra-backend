const accountRouter = require('./accountRouter')
const authRouter = require('./authRouter')
// const documentsRouter = require('./documentsRouter')
// const messageRouter = require('./documentsRouter')
const mettingRouter = require('./mettingRouter')
// const serviceRouter = require('./servicesRouter')
const userRouter = require('./userRouter')
const storageRouter = require('./storageRouter')

const apiRouter = (app) => {
  app.use('/account', accountRouter)
  app.use('/auth', authRouter)
  // app.use("/documents", documentsRouter);
  // app.use("/message", messageRouter);
  app.use('/metting', mettingRouter)
  // app.use("/service", serviceRouter);
  app.use('/storage/',storageRouter)
  app.use('/users', userRouter)
}

module.exports = apiRouter
