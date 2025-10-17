import nodemailer from "nodemailer";

export async function sendEmail(to, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Gmail uses TLS (not SSL)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"PCVerse Team" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent successfully to ${to} (${info.messageId})`);
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
  }
}
