require('dotenv').config()

const config = {
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
  },
  jwt: { secret: process.env.APP_SECRET },
  app: { port: process.env.APP_PORT_BACK },
  appFront: { port: process.env.APP_PORT_FRONT },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI
  },
  mercadopago: {
    secret: process.env.MERCADOPAGO_ACCESS_TOKEN_TEST_VENDEDOR
  }

}

module.exports = config
