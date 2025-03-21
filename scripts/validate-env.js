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
  'VITE_OPENAI_API_KEY',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_APP_ENV',
  'VITE_APP_URL',
  'VITE_API_URL'
];

// Optional environment variables with defaults
const optionalEnvVars = {
  'VITE_ENABLE_ANALYTICS': 'false',
  'VITE_ENABLE_SENTRY': 'false'
};

// Check for missing required environment variables
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:');
  missingVars.forEach(envVar => {
    console.error(`- ${envVar}`);
  });
  process.exit(1);
}

// Set default values for optional variables
Object.entries(optionalEnvVars).forEach(([key, defaultValue]) => {
  if (!process.env[key]) {
    process.env[key] = defaultValue;
  }
});

console.log('Environment variables validated successfully'); 