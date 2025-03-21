#!/usr/bin/env node
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env files
const envFiles = ['.env.local', '.env'];
for (const file of envFiles) {
  const envPath = path.resolve(rootDir, file);
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const requiredEnvVars = [
  'VITE_OPENAI_API_KEY',
  'VITE_APP_ENV'
];

const validateEnv = () => {
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Missing required environment variables:');
    missingVars.forEach(variable => {
      console.error(`   - ${variable}`);
    });
    console.error('\nPlease set these variables in your environment or .env file.');
    process.exit(1);
  }

  console.log('\x1b[32m%s\x1b[0m', '✅ All required environment variables are set!');
  process.exit(0);
};

validateEnv(); 