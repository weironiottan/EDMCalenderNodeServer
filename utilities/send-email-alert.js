require('dotenv').config()

function sendErrorEmailAlert(error) {
  error = error ? error : 'No error log was captured'
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'chrisgabrielsson@pm.me', // Change to your recipient
  from: 'edmeventapiserver@edmvegas.club', // Change to your verified sender
  subject: 'EDM Event API Server Error',
  text: `Something went wrong with the EDM Event API Server please check out the Error log: ${error}`,
}
sgMail
  .send(msg)
  .then(() => {
    console.log('EDM Event API Server Error Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
  }

module.exports = { sendErrorEmailAlert }
