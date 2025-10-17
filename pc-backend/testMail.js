import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: process.env.SMTP_USER,
  to: process.env.SMTP_USER, // send to yourself
  subject: "✅ Test Email from PC Blog",
  text: "Your SMTP settings are working perfectly!",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Failed to send email:", error.message);
  } else {
    console.log("✅ Email sent successfully:", info.response);
  }
});
