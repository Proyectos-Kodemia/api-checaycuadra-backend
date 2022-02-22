const config = require('../../lib/config')
const sgMail = require('@sendgrid/mail')

const mail = config.mailing.secretKey
sgMail.setApiKey(mail)

const sendMail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: 'checaycuadra@gmail.com',
    subject,
    text,
    html
  }
  const response = await sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      return true
    })
    .catch((error) => {
      console.error('error desde sendMail', error)
      return false
    })
  return response
}

module.exports = { sendMail }
