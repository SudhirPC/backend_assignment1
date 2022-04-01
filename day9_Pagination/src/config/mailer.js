const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "548e55e77fb0f1", // generated ethereal user
        pass: "4130c8539ef75f", // generated ethereal password
    },
});

module.exports = transporter;