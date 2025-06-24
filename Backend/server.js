const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env
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
    secure: false, // TLS
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

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Validate email format
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

    // Save to MongoDB
    if (mongoose.connection.readyState === 1) {
      try {
        await new Contact(newContact).save();
      } catch (dbError) {
        console.error('⚠️ DB save failed:', dbError.message);
      }
    }

    await transporter.sendMail({
      from: `"Viraloab Contact" <${process.env.SMTP_USER}>`,
      to: 'viraloabofficial@gmail.com',
      subject: `📥 New Contact Submission from ${name}`,
      html: `
        <div style="font-family:Arial, sans-serif; background:#f4f4f4; padding:30px;">
          <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <div style="background:#d32f2f; padding:20px; color:#fff; text-align:center;">
              <h2>New Contact Form Submission</h2>
            </div>
            <div style="padding:20px; color:#333;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <h3 style="margin-top:20px;">Message:</h3>
              <div style="background:#f9f9f9; padding:15px; border-radius:6px; border:1px solid #ddd;">
                <p style="white-space:pre-line;">${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#777;">
              © ${new Date().getFullYear()} Viraloab Admin Alert
            </div>
          </div>
        </div>
      `
    });

    // Confirmation email to client
    try {
      await transporter.sendMail({
        from: `"Viraloab Team" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Thanks for reaching out to Viraloab!`,
        html: `
          <div style="font-family:Arial, sans-serif; background:#f4f4f4; padding:30px;">
            <div style="max-width:600px; margin:auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
              <div style="background:#1976d2; padding:20px; color:#fff; text-align:center;">
                <h2>Thanks for contacting Viraloab, ${name}!</h2>
              </div>
              <div style="padding:20px; color:#333;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>We’ve received your inquiry and our team will get back to you as soon as possible.</p>
                <p style="margin-top:30px;">Regards,<br><strong>The Viraloab Team</strong></p>
              </div>
              <div style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#777;">
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

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check hit');
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
