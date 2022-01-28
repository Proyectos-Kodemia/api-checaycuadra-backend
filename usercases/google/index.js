const oauth2 = require('../../lib/oauth2')

// Authorize Google process

const authUserRedirect = async (googleClientId, googleSecret, googleRedirectUri) => {
  const url = await oauth2.redirectUrl(googleClientId, googleSecret, googleRedirectUri)

  return url
}

const getTokens = async (code) => {
  console.log('code google', code)
  return await oauth2.getTokens(code)
}

module.exports = {
  authUserRedirect,
  getTokens
}
