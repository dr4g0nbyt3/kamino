// Main entry point - runs all three bots in the same process
// This allows them to truly share state (sharedState) in memory

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

console.log('✅ All tokens found. Launching bots in same process...\n');

// Import all three bots - they will all start automatically when imported
// Since they're in the same process, they'll share the same sharedState instance
await import('./r2d2-bot.js');
await import('./c3po-bot.js');
await import('./kenobi-bot.js');

console.log('🚀 All bots are running in the same process!');
console.log('✨ Shared state is now truly shared between bots!');
console.log('Press Ctrl+C to stop all bots.\n');

// Handle termination signals
process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down all bots...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all bots...');
  process.exit(0);
});
