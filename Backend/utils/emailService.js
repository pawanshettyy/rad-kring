const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Send welcome email to new newsletter subscribers
const sendWelcomeEmail = async (email, firstName = '') => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"RAD KRING AVIATION" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '✈️ Welcome to RAD KRING AVIATION Newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 20px;">
          <div style="text-align: center; padding: 20px 0;">
            <h1 style="color: #FF6B00; font-size: 28px; margin-bottom: 10px;">RAD KRING AVIATION</h1>
            <p style="color: #ccc; font-size: 16px;">Fly Above Traffic. Effortlessly.</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #1a1a1a, #2a2a2a); padding: 30px; border-radius: 10px; margin: 20px 0;">
            <h2 style="color: #FF6B00; margin-bottom: 20px;">Welcome Aboard${firstName ? `, ${firstName}` : ''}! ✈️</h2>
            
            <p style="line-height: 1.6; margin-bottom: 20px;">
              Thank you for subscribing to the RAD KRING AVIATION newsletter. You're now part of an exclusive community that's shaping the future of urban air mobility.
            </p>
            
            <h3 style="color: #00CFFF; margin-bottom: 15px;">What to Expect:</h3>
            <ul style="line-height: 1.6; margin-bottom: 20px;">
              <li>🚁 Latest updates on our Sankalpa v1 eVTOL aircraft</li>
              <li>📰 Breaking news in electric aviation</li>
              <li>🎟️ Early access to flight bookings</li>
              <li>🔬 Behind-the-scenes technology insights</li>
              <li>🌍 Environmental impact stories</li>
            </ul>
            
            <p style="line-height: 1.6; margin-bottom: 20px;">
              Stay tuned for exciting updates as we revolutionize urban transportation with zero-emission flight technology.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'https://radkringaviation.com'}" 
                 style="background: linear-gradient(45deg, #FF6B00, #FF8533); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #333; margin-top: 30px;">
            <p style="color: #888; font-size: 14px; margin-bottom: 10px;">
              Made in India, Built for the World
            </p>
            <p style="color: #666; font-size: 12px;">
              You're receiving this email because you subscribed to our newsletter.<br>
              <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #FF6B00;">Unsubscribe</a> | 
              <a href="${process.env.FRONTEND_URL}/privacy-policy" style="color: #FF6B00;">Privacy Policy</a>
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
    return true;

  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
};

// Send contact form notification to admin
const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"RAD KRING AVIATION" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: '📧 New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background: #000; color: #fff; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: #FF6B00; margin: 0;">New Contact Submission</h1>
            <p style="color: #ccc; margin: 5px 0 0 0;">RAD KRING AVIATION</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
            <h3 style="color: #333; margin-bottom: 20px;">Contact Details:</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${contactData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${contactData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${contactData.contactNo}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Time:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${contactData.preferredTime}</td>
              </tr>
              ${contactData.message ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0;">${contactData.message}</td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Submitted on: ${new Date().toLocaleString()}<br>
                Contact ID: ${contactData._id || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Contact notification sent to admin`);
    return true;

  } catch (error) {
    console.error('❌ Error sending contact notification:', error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendContactNotification
};
