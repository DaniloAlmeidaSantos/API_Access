const mailSender = require('../../config/mailerConfig');

module.exports = {
    emailSender(to, subject, text) {
        var status = 200;
        var message;

        const sendEmail = {
            from: process.env.MAIL_USER_EMAIL,
            to: to,
            subject: subject,
            text: text
        }

        mailSender.sendMail(sendEmail, function(error) {
            if (error) {
                status = 400;
                message = "Falha no envio: " + error;
            } else {
                message = "E-Mail enviado com sucesso!";
            }
        });

        return [status, message];
    }
}




