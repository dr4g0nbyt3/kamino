// Main entry point - runs all three bots together
// This allows Railway to run all bots in a single process

import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

console.log('🌟 Starting All Star Wars Discord Bots...\n');

// Check if all tokens are present
if (!process.env.R2D2_TOKEN) {
  console.error('❌ R2D2_TOKEN not found in environment variables!');
  process.exit(1);
}
if (!process.env.C3PO_TOKEN) {
  console.error('❌ C3PO_TOKEN not found in environment variables!');
  process.exit(1);
}
if (!process.env.KENOBI_TOKEN) {
  console.error('❌ KENOBI_TOKEN not found in environment variables!');
  process.exit(1);
}

console.log('✅ All tokens found. Launching bots...\n');

// Start R2-D2
const r2d2 = spawn('node', ['r2d2-bot.js'], {
  stdio: 'inherit',
  env: process.env
});

// Start C-3PO
const c3po = spawn('node', ['c3po-bot.js'], {
  stdio: 'inherit',
  env: process.env
});

// Start General Kenobi
const kenobi = spawn('node', ['kenobi-bot.js'], {
  stdio: 'inherit',
  env: process.env
});

// Handle process exits
r2d2.on('exit', (code) => {
  console.error(`❌ R2-D2 exited with code ${code}`);
  process.exit(code);
});

c3po.on('exit', (code) => {
  console.error(`❌ C-3PO exited with code ${code}`);
  process.exit(code);
});

kenobi.on('exit', (code) => {
  console.error(`❌ General Kenobi exited with code ${code}`);
  process.exit(code);
});

// Handle termination signals
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down all bots...');
  r2d2.kill();
  c3po.kill();
  kenobi.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all bots...');
  r2d2.kill();
  c3po.kill();
  kenobi.kill();
  process.exit(0);
});

console.log('🚀 All bots are running!');
console.log('Press Ctrl+C to stop all bots.\n');
