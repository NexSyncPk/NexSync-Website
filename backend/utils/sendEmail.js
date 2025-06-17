const nodemailer = require("nodemailer");
const { JOB_APPLICATION_TEMPLATE } = require("./emailTemplate");

const sendEmail = async (to, subject, text, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"NexSync" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
};

const sendJobApplicationEmail = async (applicantData, jobTitle) => {
  const subject = `New Job Application for "${jobTitle}"`;
  const html = JOB_APPLICATION_TEMPLATE(applicantData, jobTitle);

  await sendEmail(process.env.ADMIN_EMAIL, subject, "", html);
};

module.exports = {
  sendEmail,
  sendJobApplicationEmail,
};
