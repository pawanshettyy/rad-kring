// Backend/utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendContactEmail = async ({ name, email, message }) => {
  const mailOptions = {
    from: `Rad Kring Contact <${process.env.SMTP_USER}>`,
    to: 'info@radkring.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`
  };
  await transporter.sendMail(mailOptions);
};

exports.sendNewsletterEmail = async (subscriberEmail) => {
  const mailOptions = {
    from: `Rad Kring Newsletter <${process.env.SMTP_USER}>`,
    to: 'info@radkring.com',
    subject: 'New Newsletter Subscription',
    text: `New subscriber: ${subscriberEmail}`,
    html: `<p>New subscriber: <strong>${subscriberEmail}</strong></p>`
  };
  await transporter.sendMail(mailOptions);
};

exports.sendCareerApplicationEmail = async ({ name, email, phone, position, resumeUrl, message }) => {
  const mailOptions = {
    from: `Rad Kring Careers <${process.env.SMTP_USER}>`,
    to: 'info@radkring.com',
    subject: `New Career Application: ${position}`,
    text:
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nResume: ${resumeUrl}\nMessage: ${message || ''}`,
    html:
      `<p><strong>Name:</strong> ${name}</p>` +
      `<p><strong>Email:</strong> ${email}</p>` +
      `<p><strong>Phone:</strong> ${phone}</p>` +
      `<p><strong>Position:</strong> ${position}</p>` +
      `<p><strong>Resume:</strong> <a href='${resumeUrl}'>Download</a></p>` +
      (message ? `<p><strong>Message:</strong> ${message}</p>` : '')
  };
  await transporter.sendMail(mailOptions);
};
