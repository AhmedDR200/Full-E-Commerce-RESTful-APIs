const nodemailer = require('nodemailer')



const sendEmail = async(options) => {
    // create transporter (service that will send email => gmail , ...)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // secure false => 587, true => 465
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // define email options (from, to, subject, content)
    const mailOptions = {
        from: "DEVLANT <djangotest810@gmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;