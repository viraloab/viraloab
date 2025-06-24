const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
} else {
  console.warn('⚠️ MONGODB_URI not provided. DB will be skipped.');
}

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Mail transporter
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    debug: true,
    logger: true
  });

  transporter.verify((err, success) => {
    if (err) console.error('❌ SMTP verification failed:', err);
    else console.log('✅ SMTP server ready to send mail');
  });
} catch (error) {
  console.error('❌ Failed to create SMTP transporter:', error);
}

// Contact model
const Contact = mongoose.models.Contact || mongoose.model('Contact', new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  company: String,
  phone: String,
  createdAt: Date,
  ip: String
}));

// API endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company, phone } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const newContact = {
      name,
      email,
      message,
      company: company || '',
      phone: phone || '',
      createdAt: new Date(),
      ip
    };

    if (mongoose.connection.readyState === 1) {
      try {
        await new Contact(newContact).save();
      } catch (dbError) {
        console.error('⚠️ DB save failed:', dbError.message);
      }
    }

    // Admin Notification Email
    await transporter.sendMail({
      from: `"Viraloab Contact" <${process.env.SMTP_USER}>`,
      to: 'viraloabofficial@gmail.com',
      subject: `📥 New Contact Submission from ${name}`,
      html: `
        <div style="font-family:'Segoe UI', sans-serif; background-color:#f9f9f9; padding:40px;">
          <table style="width:100%; max-width:600px; margin:auto; background:#ffffff; border:1px solid #ddd; border-radius:8px; padding:20px;">
            <tr><td style="text-align:center; font-size:20px; color:#d32f2f;"><strong>🚨 New Contact Submission</strong></td></tr>
            <tr><td style="padding:15px 0;">
              <strong>👤 Name:</strong> ${name}<br/>
              <strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a><br/>
              <strong>🏢 Company:</strong> ${company || 'N/A'}<br/>
              <strong>📱 Phone:</strong> ${phone || 'N/A'}
            </td></tr>
            <tr><td>
              <strong>📝 Message:</strong><br/>
              <div style="border-left:4px solid #d32f2f; padding:10px; margin-top:5px; background:#fefefe;">
                <p style="margin:0; white-space:pre-line;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </td></tr>
            <tr><td style="text-align:center; font-size:12px; color:#888; padding-top:20px;">
              📍 IP: ${ip}<br/>
              © ${new Date().getFullYear()} Viraloab Admin Alert
            </td></tr>
          </table>
        </div>
      `
    });

    // Client Confirmation Email
    try {
      await transporter.sendMail({
        from: `"Viraloab" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `🤝 Thanks for reaching out to Viraloab, ${name}!`,
        html: `
          <div style="font-family:'Segoe UI', sans-serif; background-color:#f9f9f9; padding:40px;">
            <table style="width:100%; max-width:600px; margin:auto; background:#ffffff; border:1px solid #ccc; border-radius:8px; padding:20px;">
              <tr><td style="text-align:center; font-size:22px; color:#1976d2;"><strong>🎉 Thank You, ${name}!</strong></td></tr>
              <tr><td style="padding:20px 0; color:#333;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to <strong>Viraloab</strong>! 💼</p>
                <p>We've received your message and our team will get back to you soon. ⏳</p>
                <p style="margin-top:20px;">Explore more about us: <a href="https://viraloab.com" target="_blank" style="color:#1976d2;">viraloab.com</a></p>
                <p style="margin-top:30px;">Cheers,<br/>🌟 <strong>The Viraloab Team</strong></p>
              </td></tr>
              <tr><td style="text-align:center; font-size:12px; color:#888; padding-top:20px;">
                📬 This is an automated message. We’ll get in touch soon.<br/>
                © ${new Date().getFullYear()} Viraloab. All rights reserved.
              </td></tr>
            </table>
          </div>
        `
      });
    } catch (clientEmailError) {
      console.error('⚠️ Confirmation email failed:', clientEmailError.message);
    }

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (err) {
    console.error('❌ Server error:', err.message);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  console.log('Health check hit');
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
