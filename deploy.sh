#!/bin/bash

echo "Building React Components..."
npm run build

echo "Build completed successfully!"
echo "Deploy to Vercel with: vercel --prod"
echo "Or push to your connected Git repository for automatic deployment."
