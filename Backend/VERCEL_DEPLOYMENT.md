# Backend Deployment Guide for Vercel

This guide will help you deploy the backend of your application to Vercel as a serverless API.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Git](https://git-scm.com/) installed
3. The Vercel CLI installed (optional):
   ```
   npm install -g vercel
   ```

## Deployment Steps

### Option 1: Deploy with Vercel CLI

1. Login to Vercel CLI:
   ```
   vercel login
   ```

2. Navigate to the backend directory:
   ```
   cd Backend
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. Follow the prompts and set the environment variables when asked.

### Option 2: Deploy via GitHub

1. Push your project to GitHub:
   ```
   git push
   ```

2. Login to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." > "Project"

4. Import your GitHub repository

5. Configure the project:
   - Framework Preset: Other
   - Root Directory: `Backend`
   - Build Command: `npm install`
   - Output Directory: Leave empty

6. Add all required environment variables (see below)

7. Click "Deploy"

## Environment Variables

Set the following environment variables in the Vercel dashboard:

- `SMTP_HOST`: Your SMTP server host
- `SMTP_PORT`: Your SMTP server port (usually 587 or 465)
- `SMTP_USER`: Your SMTP username/email
- `SMTP_PASS`: Your SMTP password
- `FROM_EMAIL`: The email address from which emails will be sent
- `ADMIN_EMAIL`: The email address to receive contact form submissions
- `SKIP_EMAILS`: Set to "false" for production

## CORS Configuration

After deploying your frontend, you'll need to update the CORS settings in your backend.

1. Go to your project in the Vercel dashboard
2. Go to "Settings" > "Environment Variables"
3. Add a new environment variable:
   - Name: `FRONTEND_URL`
   - Value: Your frontend URL (e.g., `https://your-frontend-url.vercel.app`)

Then, update your server.js file to use this environment variable for CORS:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in the Vercel dashboard
2. Click on "Domains"
3. Add your domain and follow the verification steps

## Accessing Logs

1. Go to the Vercel dashboard
2. Click on your backend project
3. Click on "Deployments"
4. Select the deployment you want to check logs for
5. Click on "Functions" to see logs for your serverless functions

## Troubleshooting

- If your deployment fails, check the build logs in the Vercel dashboard
- Ensure all dependencies are correctly listed in `package.json`
- If you're having CORS issues, verify the CORS settings in your server.js file
- For email issues, check that all SMTP environment variables are set correctly 