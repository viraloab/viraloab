# Viraloab Backend

This backend handles the contact form submissions for the Viraloab website, sending emails to both the admin and the user who submitted the form.

## Features

- Contact form submission endpoint
- Email notifications to admin
- Confirmation emails to users
- Environment variable configuration
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   SMTP_HOST=smtp.mailersend.net
   SMTP_PORT=587
   SMTP_USER=your_smtp_username
   SMTP_PASS=your_smtp_password
   ADMIN_EMAIL=viraloabofficial@gmail.com
   FROM_EMAIL=info@viraloab.com
   ```

3. Start the server:
   ```
   npm start
   ```

   Or for development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### POST /api/contact
Submit a contact form.

Request Body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "phone": "1234567890", // optional
  "message": "Contact message"
}
```

Response:
```json
{
  "success": true,
  "message": "Your message has been sent successfully"
}
```

### GET /api/health
Health check endpoint.

Response:
```json
{
  "status": "ok"
}
``` 