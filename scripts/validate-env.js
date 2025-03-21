#!/usr/bin/env node
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '..', '.env.production');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Required environment variables
const requiredEnvVars = [
  'VITE_OPENAI_API_KEY'
];

// Check for missing required environment variables
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:');
  missingVars.forEach(envVar => {
    console.error(`- ${envVar}`);
  });
  process.exit(1);
}

console.log('Environment variables validated successfully'); 