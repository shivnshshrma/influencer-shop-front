# InfluStyle - Railway Deployment Guide

This guide will help you deploy both the frontend and backend of the InfluStyle application to Railway.

## Project Structure
- `/` - Frontend (React/Vite)
- `/server` - Backend (Node.js/Express)

## Deployment Steps

### 1. Backend Deployment

1. **Create a new Railway project for the backend:**
   - Go to [Railway.app](https://railway.app)
   - Click "Start a New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Choose "Add Service" > "GitHub Repo"
   - Set the root directory to `/server`

2. **Configure environment variables for backend:**
   ```
   NODE_ENV=production
   PORT=3002
   SUPABASE_URL=https://rdxciivhbhcaveraitmm.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeGNpaXZoYmhjYXZlcmFpdG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTU2MTAsImV4cCI6MjA2NTU3MTYxMH0.OzTyzoMc7UkVgRS8r-TLRvYGD0tnBNPEOYjwzbU5cjs
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeGNpaXZoYmhjYXZlcmFpdG1tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTk5NTYxMCwiZXhwIjoyMDY1NTcxNjEwfQ.J8TNhlOkhMH4_oTHmxaCewgoYKyUDyHJ9RMUgFwBd34
   JWT_SECRET=u9TdnRuTXofMtxkD4X/7AgUweOVWKDkzriQB1HqzdF2T+XlLrUOAwDiqEtz4LSzDIG1aT6+SYIWpzoVI2kmSEQ==
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```

3. **Deploy the backend:**
   - Railway will automatically detect and deploy your Node.js app
   - It will use the `railway.toml` configuration
   - Note the deployed URL (e.g., `https://your-backend-123abc.up.railway.app`)

### 2. Frontend Deployment

1. **Create another Railway service for the frontend:**
   - In the same Railway project, click "Add Service"
   - Choose "GitHub Repo" again
   - Set the root directory to `/` (root of the repository)

2. **Configure environment variables for frontend:**
   ```
   NODE_ENV=production
   VITE_SUPABASE_URL=https://rdxciivhbhcaveraitmm.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkeGNpaXZoYmhjYXZlcmFpdG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTU2MTAsImV4cCI6MjA2NTU3MTYxMH0.OzTyzoMc7UkVgRS8r-TLRvYGD0tnBNPEOYjwzbU5cjs
   VITE_API_BASE_URL=https://your-backend-123abc.up.railway.app/api
   ```

3. **Update CORS configuration:**
   - After frontend deployment, update the backend's `FRONTEND_URL` environment variable with the actual frontend URL

## Important Notes

1. **Build Process:**
   - Backend: Uses `npm start` (runs `node src/server.js`)
   - Frontend: Uses `npm run build` then `npm run start` (serves built static files)

2. **Port Configuration:**
   - Railway automatically assigns ports, both services are configured to use `process.env.PORT`

3. **Database:**
   - Already configured to use Supabase (no additional setup needed)

4. **Environment Variables:**
   - Make sure to update the frontend's `VITE_API_BASE_URL` with your actual backend URL
   - Update the backend's `FRONTEND_URL` with your actual frontend URL

## Troubleshooting

1. **Build Failures:**
   - Check logs in Railway dashboard
   - Ensure all dependencies are in `package.json`

2. **CORS Errors:**
   - Verify `FRONTEND_URL` is set correctly in backend
   - Check that frontend URL is in the CORS allowlist

3. **API Connection Issues:**
   - Verify `VITE_API_BASE_URL` points to correct backend URL
   - Ensure backend health check endpoint `/health` is accessible

## Health Checks

- Backend: `https://your-backend-url.railway.app/health`
- Frontend: `https://your-frontend-url.railway.app/`

Both services include health check configurations in their `railway.toml` files.
