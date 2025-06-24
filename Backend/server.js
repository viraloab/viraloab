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

// Contact Form API
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

    // Admin email
    await transporter.sendMail({
      from: `"Viraloab" <${process.env.SMTP_USER}>`,
      to: 'viraloabofficial@gmail.com',
      subject: `📥 New Contact Submission from ${name}`,
      html: `
        <div style="font-family:'Segoe UI', sans-serif; background:#f5f5f5; padding:30px;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.05); overflow:hidden;">
            <div style="background:#d32f2f; color:#fff; text-align:center; padding:25px 20px;">
              <h2 style="margin:0;">🚨 New Contact Submission</h2>
            </div>
            <div style="padding:25px; color:#333;">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>🏢 Company:</strong> ${company || 'N/A'}</p>
              <p><strong>📱 Phone:</strong> ${phone || 'N/A'}</p>

              <div style="margin-top:20px;">
                <h3>📝 Message:</h3>
                <div style="background:#fafafa; border-left:4px solid #d32f2f; padding:15px; border-radius:8px;">
                  <p style="white-space:pre-line; margin:0;">${message.replace(/\n/g, '<br>')}</p>
                </div>
              </div>
            </div>
            <div style="background:#eee; text-align:center; padding:15px; font-size:13px; color:#777;">
              © ${new Date().getFullYear()} Viraloab Admin Alert · 📍 IP: ${ip}
            </div>
          </div>
        </div>
      `
    });

    // Client confirmation email
    try {
      await transporter.sendMail({
        from: `"Viraloab" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `🤝 Thanks for reaching out to Viraloab, ${name}!`,
        html: `
          <div style="font-family:'Segoe UI', sans-serif; background:#f5f5f5; padding:30px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; box-shadow:0 0 10px rgba(0,0,0,0.05); overflow:hidden;">
              <div style="background:#1976d2; color:#fff; text-align:center; padding:25px 20px;">
                <h2 style="margin:0;">🙌 Thank You, ${name}!</h2>
              </div>
              <div style="padding:25px; color:#333;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to <strong>Viraloab</strong>! 💼</p>
                <p>We've received your message and one of our team members will get back to you shortly. ⏳</p>
                <p style="margin-top:20px;">In the meantime, feel free to explore more about us at <a href="https://viraloab.in" target="_blank" style="color:#1976d2;">viraloab.in</a>.</p>
                <p style="margin-top:30px;">Cheers,<br>🌟 <strong>The Viraloab Team</strong></p>
              </div>
              <div style="background:#eeeeee; text-align:center; padding:15px; font-size:13px; color:#777;">
                📬 This is an automated message. We'll get back to you soon!<br>
                © ${new Date().getFullYear()} Viraloab. All rights reserved.
              </div>
            </div>
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
