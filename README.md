# 🚀 Viraloab

**Innovative Digital Solutions for the Modern Web**

---

![Viraloab Banner](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80)

## 🌟 Overview

Viraloab is a full-stack web application designed to deliver seamless digital experiences. Built with a modern React frontend and a robust Node.js/Express backend, Viraloab is your go-to solution for scalable, maintainable, and beautiful web projects.

---

## 🏗️ Project Structure

```
viraloab/
├── Frontend/   # React + Vite + Tailwind CSS
│   ├── src/
│   ├── public/
│   └── ...
├── Backend/    # Node.js + Express + Nodemailer + MongoDB + Redis
│   ├── server.js
│   └── ...
└── README.md   # You are here!
```

---

## ✨ Features

- ⚡ **React + Vite** for blazing-fast frontend development
- 🎨 **Tailwind CSS** for modern, responsive UI
- 🔒 **Express.js Backend** for secure API handling
- 📧 **Nodemailer Integration** for contact forms
- 🌐 **CORS Enabled** for smooth frontend-backend communication
- 🛡️ **Environment Variable Support** for secure configuration
- 🧪 **Health Check API** for easy monitoring
- 📱 **Progressive Web App (PWA)** for offline capabilities and mobile installation
- 🔄 **Background Sync** for offline form submissions
- 📊 **Custom Analytics** for tracking user interactions
- 🚀 **Performance Optimizations** with lazy loading and resource prefetching
- 💾 **Database Integration** with MongoDB and Redis

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, ESLint, Service Workers
- **Backend:** Node.js, Express, Nodemailer, MongoDB, Redis, dotenv
- **Other:** GitHub, REST API, PowerShell/Terminal, IndexedDB

---

## 🚦 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Mrgig7/Viraloab.git
cd Viraloab
```

### 2. Setup the Frontend
```bash
cd Frontend
npm install
# Create a .env.local file (see below)
npm run dev
```

### 3. Setup the Backend
```bash
cd ../Backend
npm install
# Create a .env file (see below)
npm start
```

### 4. Environment Variables (Frontend)
Create a `.env.local` file in the `Frontend/` directory:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_ENVIRONMENT=development
VITE_ANALYTICS_ENABLED=false
```

### 5. Environment Variables (Backend)
Create a `.env` file in the `Backend/` directory:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
CONTACT_EMAIL_RECIPIENT=recipient-email
MONGODB_URI=your-mongodb-uri
REDIS_URL=your-redis-url (optional)
```

---

## 📬 API Endpoints

### POST `/api/contact`
- Accepts: `{ name, email, company (optional), phone (optional), message }`
- Stores in MongoDB (if connected)
- Rate limited with Redis (if configured)
- Sends email to admin
- Returns: `{ success: true/false, message: string }`

### GET `/api/health`
- Returns: `{ status: "ok" }`
- Used for health checks and API connectivity tests

---

## 🖥️ Frontend Highlights
- Modern, responsive design with glass card styling
- Progressive Web App capabilities
- Offline form submission with background sync
- API health checking during initial load
- Performance optimizations (lazy loading, prefetching)
- Custom analytics tracking

## 🗄️ Backend Highlights
- Secure email handling with Nodemailer
- MongoDB integration for data storage
- Redis for rate limiting and caching (optional)
- Robust error handling and logging
- Cross-origin support for frontend-backend communication

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is licensed under the MIT License.

---

## 🙌 Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [Nodemailer](https://nodemailer.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)

---

> Made with ❤️ by the Viraloab Team 