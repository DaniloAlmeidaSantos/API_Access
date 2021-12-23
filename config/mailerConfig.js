const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    host: process.env.MAIL_USER_HOST,
    service: process.env.MAIL_USER_SERVICE,
    port: process.env.MAIL_USER_PORT,
    secure: process.env.MAIL_USER_SECURE,
    auth: {
        user: process.env.MAIL_USER_EMAIL,
        pass: process.env.MAIL_USER_PASS
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

module.exports = sender;