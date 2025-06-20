# Frontend Deployment Guide for Vercel

This guide will help you deploy the frontend of your application to Vercel.

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

2. Navigate to the frontend directory:
   ```
   cd Frontend
   ```

3. Deploy the project:
   ```
   vercel
   ```

4. Follow the prompts. When asked for the build command, enter: `npm run build`

5. For the output directory, enter: `dist`

### Option 2: Deploy via GitHub

1. Push your project to GitHub:
   ```
   git push
   ```

2. Login to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New..." > "Project"

4. Import your GitHub repository

5. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `Frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. Add the environment variable:
   - Name: `VITE_API_URL`
   - Value: URL to your deployed backend (e.g., `https://your-backend-url.vercel.app`)

7. Click "Deploy"

## Post Deployment

After deployment, take note of your frontend URL as you'll need it to set CORS in your backend.

## Environment Variables

Make sure to set the following environment variable in the Vercel dashboard:

- `VITE_API_URL`: The URL of your backend API (e.g., `https://your-backend-url.vercel.app`)

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project in the Vercel dashboard
2. Click on "Domains"
3. Add your domain and follow the verification steps

## Troubleshooting

- If your build fails, check the build logs in the Vercel dashboard
- Ensure all dependencies are correctly listed in `package.json`
- If API calls are failing, verify the `VITE_API_URL` environment variable is set correctly 