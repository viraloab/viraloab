const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// MongoDB Connection Setup
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
} else {
  console.warn('MONGODB_URI not provided. Database functionality will be limited.');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Redis client conditionally if REDIS_URL is provided
let redisClient = null;
if (process.env.REDIS_URL) {
  try {
    const redis = require('redis');
    redisClient = redis.createClient({
      url: process.env.REDIS_URL
    });
    
    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
    
    // Connect to Redis
    (async () => {
      try {
        await redisClient.connect();
        console.log('Redis client connected successfully');
      } catch (err) {
        console.error('Redis connection error:', err);
        redisClient = null; // Reset client on connection failure
      }
    })();
  } catch (error) {
    console.error('Redis initialization error:', error);
    redisClient = null;
  }
}

// Middleware
app.use(cors({
  origin: ['https://viraloab.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Create mail transporter with better error handling
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
    debug: true, // Enable debug logs
    logger: true // Log to console
  });
  
  // Verify SMTP connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.error('SMTP verification failed:', error);
    } else {
      console.log('SMTP server is ready to take our messages');
    }
  });
} catch (error) {
  console.error('Failed to create SMTP transporter:', error);
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, company, phone } = req.body;
    
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid email format' 
      });
    }

    // Handle rate limiting if Redis is available
    if (redisClient && redisClient.isReady) {
      try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const rateLimitKey = `ratelimit:contact:${ip}`;
        
        const rateLimitCount = await redisClient.get(rateLimitKey);
        if (rateLimitCount && parseInt(rateLimitCount) >= 5) {
          return res.status(429).json({ 
            success: false, 
            error: 'Rate limit exceeded. Please try again later.' 
          });
        }
  
        // Increment rate limit counter
        await redisClient.incr(rateLimitKey);
        await redisClient.expire(rateLimitKey, 3600); // Expire after 1 hour
      } catch (redisError) {
        console.error('Redis error during rate limiting:', redisError);
        // Continue processing even if rate limiting fails
      }
    }

    // Store the contact submission in the database
    const newContact = {
      name,
      email,
      message,
      company: company || '',
      phone: phone || '',
      createdAt: new Date(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    // If MongoDB is connected, save to database
    if (mongoose.connection.readyState === 1) {
      try {
        const Contact = mongoose.model('Contact', new mongoose.Schema({
          name: String,
          email: String,
          message: String,
          company: String,
          phone: String,
          createdAt: Date,
          ip: String
        }));
        
        await new Contact(newContact).save();
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue processing even if database save fails
      }
    }

    // Simple email sending implementation
    if (transporter) {
      try {
        // Send admin notification
        await transporter.sendMail({
          from: `"Viraloab Contact" <${process.env.SMTP_USER || 'noreply@viraloab.com'}>`,
          to: process.env.CONTACT_EMAIL_RECIPIENT || 'viraloabofficial@gmail.com',
          subject: `New Contact Form Submission from ${name}`,
          text: `
            Name: ${name}
            Email: ${email}
            Company: ${company || 'Not provided'}
            Phone: ${phone || 'Not provided'}
            
            Message:
            ${message}
          `,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue processing even if email sending fails
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Server error processing contact form' 
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  console.log('Health check request received');
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 