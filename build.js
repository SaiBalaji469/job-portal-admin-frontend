import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run the build command with npx
console.log('Building the application...');
try {
  // Use npx to run vite build
  execSync('npx vite build', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 