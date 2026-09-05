// Nodemailer configuration for sending emails using Brevo SMTP . Use Brevo SMTP if User increase and with Brevo you can send 300 emails/day
// To use this First Install Nodemailer
// To Use Brevo SMTP you have Two methods
// 1) With  domain like resumeforge.com or any anoher domain
// 2) With personal eamil Id  but the eamil need to be verified By Brevo

// --> Creditial Which are need to use brevo
// BREVO_SMTP_HOST=
// BREVO_SMTP_PORT=
// BREVO_SMTP_USER=
// BREVO_SMTP_KEY=
// EMAIL_FROM=

// Example: if you want to use Brevo SMTP with email

// import nodemailer from "nodemailer";
// import config from "../../../Configuration/Env.config.js";
// const transporter = nodemailer.createTransport({
//   host: config.BREVO_SMTP_HOST,
//   port: Number(config.BREVO_SMTP_PORT),
//   secure: false,
//   auth: {
//     user: config.BREVO_SMTP_USER,
//     pass: config.BREVO_SMTP_KEY,
//   },
// });
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Error connecting to email server:", error);
//   } else {
//     console.log("Email server is ready to send messages");
//   }
// });
// export const sendOtp = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"From ResumeForge" <${config.EMAIL_FROM}>`, // must be a verified sender in Brevo
//       to,
//       subject,
//       text,
//       html,
//     });
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };

// -------------------------------------------------------------------

// With Emailjs and personal eamilId (200 email per month now be send)
// EmailJS configuration for sending emails using EmailJS service

import emailjs from "@emailjs/nodejs";
import config from "../../../Configuration/Env.config.js";

// 1. Initialize the EmailJS client
// This replaces your nodemailer.createTransport() block
emailjs.init({
  publicKey: config.EMAILJS_PUBLIC_KEY,
  privateKey: config.EMAILJS_PRIVATE_KEY, // Required for Node.js backends
});

// 2. Simplified sendOtp function
// We removed subject, text, and html since those are handled in the EmailJS dashboard
export const sendOtp = async (to, otpCode) => {
  try {
    // Variables must exactly match the {{variable_names}} in your EmailJS template
    const templateParams = {
      to_email: to,
      otp: otpCode,
    };

    // This replaces transporter.sendMail()
    const response = await emailjs.send(
      config.EMAILJS_SERVICE_ID,
      config.EMAILJS_TEMPLATE_ID,
      templateParams,
    );

    console.log(
      "Email sent successfully via EmailJS:",
      response.status,
      response.text,
    );
    return response;
  } catch (error) {
    console.error("Error sending email via EmailJS:", error);
    throw error;
  }
};
