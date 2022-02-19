const express = require('express')

const router = express.Router()

const Mail = require('../usercases/mailing')

router.post('/', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body
    const responseMail = await Mail.sendMail({ to, subject, text, html })
    if (responseMail) {
      res.status(201).json({
        status: true,
        message: 'Email Sent'
      })
    } else {
      res.status(404).json({
        status: false,
        message: 'Email not Sent'
      })
    }
  } catch (err) {
    console.log('error en mailig post router', err)
  }
})

module.exports = router
