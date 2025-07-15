#!/bin/bash

# Railway Deployment Helper Script
# This script helps prepare your project for Railway deployment

echo "🚀 Preparing InfluStyle for Railway deployment..."

# Create production environment files
echo "📝 Creating environment file templates..."

# Check if .env exists for frontend
if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo "✅ Frontend .env created from .env.example"
else
    echo "⚠️  Frontend .env already exists"
fi

# Check if server .env exists
if [ ! -f server/.env ]; then
    echo "Creating backend .env file..."
    cp server/.env.example server/.env
    echo "✅ Backend .env created from server/.env.example"
else
    echo "⚠️  Backend .env already exists"
fi

echo ""
echo "📋 Next steps for Railway deployment:"
echo "1. Push your code to GitHub if you haven't already"
echo "2. Go to https://railway.app and create a new project"
echo "3. Deploy the backend first (set root directory to 'server')"
echo "4. Configure backend environment variables using .env.production"
echo "5. Deploy the frontend (set root directory to '/' or leave empty)"
echo "6. Configure frontend environment variables"
echo "7. Update CORS URLs in both services"
echo ""
echo "📖 For detailed instructions, see RAILWAY_DEPLOYMENT.md"
echo ""
echo "✨ Good luck with your deployment!"
