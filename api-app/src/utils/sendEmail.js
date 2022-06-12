const nodemailer = require('nodemailer')

const sendMail = (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error: ', err)
    } else {
      console.log('Data: ', data)
    }
  })
}

module.exports = sendMail
