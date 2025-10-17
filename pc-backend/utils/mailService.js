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

// generic send function
export async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"PCVerse 🚀" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Mail sent successfully to:", to);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
  }
}
