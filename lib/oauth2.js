
const { google } = require('googleapis')
const config = require('../lib/config')
/**
 * OAuth2 Authentication
 */

// const authClient= async (googleClientId,googleSecret,googleRedirectUri)=>{
//     const oauth2Client = new google.auth.OAuth2(
//     googleClientId,
//     googleSecret,
//     googleRedirectUri
//     )

//     return await oauth2Client

// }

const redirectUrl = async (googleClientId, googleSecret, googleRedirectUri) => {
  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleSecret,
    googleRedirectUri
  )

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  })

  return url
}

const getTokens = async (code) => {
  const googleClientId = config.google.clientId
  const googleSecret = config.google.secret
  const googleRedirectUri = config.google.redirectUri

  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleSecret,
    googleRedirectUri
  )

  const { tokens } = await oauth2Client.getToken(code)
  console.log('tokens google', tokens)
  return tokens
}
// //console.log(url);

// oauth2Client
//   .getToken(
//     "4/0AX4XfWiI8KgodtkdF8_XEiSwD0jCZY4rEuR9VY_B7qT54moWU9je3beZDjOY6NKeucr1-w"
//   )
//   .then((value) => //console.log(value));

// //console.log(tokens);

const setCredentials = (accessToken, refreshToken) => {
  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleSecret,
    googleRedirectUri
  )

  const setCredentials = oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
    scope: 'https://www.googleapis.com/auth/calendar',
    token_type: 'Bearer',
    expiry_date: 1641974277408
  })
}

// //console.log(oauth2Client);

module.exports = { redirectUrl, setCredentials, getTokens }
