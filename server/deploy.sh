#!/bin/bash

echo "🚀 Starting Deployment..."

# Step 1: Navigate to the project directory
#cd /path/to/your/project || exit

# Step 2: Pull the latest changes (if using Git)
echo "📥 Pulling latest changes..."
#git add .
#git stash
#git pull origin main

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 3: Generate version info
echo "🏷️ Generating build version..."
#npm run prebuild:version

# Step 4: Read version.json
#VERSION=$(node -p "require('./version.json').version")
#BUILD_NO=$(node -p "require('./version.json').build")

# Step 5: Log version before restarting
#echo "📝 Build Info:"
#echo "   ➤ Version: $VERSION"
#echo "   ➤ Build No: $BUILD_NO"

# Step 4: Build the project (compile TypeScript to JavaScript)
echo "🔨 Building the project..."
npm run build

# Step 5: Restart all PM2 apps from ecosystem.config.js
echo "🔄 Restarting all PM2 processes..."
pm2 restart ecosystem.config.js

# Step 6: Save the PM2 process list (so it survives reboots)
pm2 save

echo "✅ Deployment Complete!"
