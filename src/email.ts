import nodemailer from "nodemailer"

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.gmail.com
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true হলে 465 port use করতে হবে
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: `"Furnix Shop" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })

    console.log("Email sent:", info.messageId)
  } catch (err) {
    console.error("Failed to send email:", err)
    throw err
  }
}
