const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOSTNAME,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailer = (to, subject, message) => {
  transporter.sendMail(
    {
      from: { address: process.env.MAIL_USERNAME, name: process.env.MAIL_FROM },
      to: to,
      subject: subject,
      text: message,
    },
    (err, res) => {
      console.log("Email sent: " + res.response);
    }
  );
};

module.exports = mailer;
