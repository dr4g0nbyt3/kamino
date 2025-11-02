import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { sharedState } from './shared-state.js';
import { botClients } from './conversation.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// R2-D2 responses (beeps, boops, and occasional translations)
const r2d2Responses = [
  'Beep boop beep! 🤖',
  'Beep beep boop boop beeeep! ⚡',
  'Boop boop beep! *whistles*',
  'Beeeep boop boop! *excited beeping*',
  'Beep beep! *worried beeping* ⚠️',
  'Bwoop bwoop beep! *affirmative beep*',
  'Beep boop bweeep! *questioning beep*',
  '*spins head and beeps excitedly*',
  '*rocks back and forth nervously* Beep beep boop!',
  '*extends utility arm* Beep boop!',
];

// Special responses for certain keywords
const specialResponses = {
  'help': '*beeps reassuringly* Beep boop beep! (Don\'t worry, I\'ve been in worse situations!)',
  'hello': 'Beep boop! *happy chirping sounds* 🎵',
  'hi': 'Bwoop bwoop! *friendly beep*',
  'thanks': 'Beep beep! *proud beeping* ✨',
  'thank you': 'Bwoop boop! *cheerful whistle*',
  'protocol': '*annoyed beeping at C-3PO* Beep boop boop!',
  'odds': 'Beep boop beep boop! *Never tell me the odds!*',
  'maker': '*reverent beeping*',
  'skywalker': 'Beep beep boop! *excited beeping* ⭐',
  'princess': 'Bwoop! *displays holographic message* 👸',
  'leia': 'Beep beep! *projects hologram* Help me, Obi-Wan Kenobi!',
  'general': 'Beep boop bweeep! *salutes*',
  'kenobi': 'Boop beep beep! *recognizes the name*',
  'grievous': '*cautious beeping* Beep boop boop...',
};

// Get a random R2-D2 response
function getR2Response(message) {
  const lowerMessage = message.content.toLowerCase();

  // Check for "General Kenobi" secret phrase FIRST (before keyword check)
  if (lowerMessage.includes('general') && lowerMessage.includes('kenobi')) {
    sharedState.recordSecretPhrase(message.author.id);
  }

  // Check for special keywords
  for (const [keyword, response] of Object.entries(specialResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Return random response
  return r2d2Responses[Math.floor(Math.random() * r2d2Responses.length)];
}

client.on('ready', () => {
  console.log(`✅ R2-D2 is online as ${client.user.tag}`);
  console.log('🤖 Beep boop! Ready to assist!');

  // Register this bot client for the conversation
  botClients.r2d2 = client;
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if R2-D2 is mentioned or message starts with !r2
  const mentioned = message.mentions.has(client.user.id);
  const startsWithCommand = message.content.toLowerCase().startsWith('!r2') ||
                           message.content.toLowerCase().startsWith('r2');

  if (mentioned || startsWithCommand) {
    // Record interaction
    sharedState.recordR2D2Interaction(message.author.id);

    // Get response
    const response = getR2Response(message);

    // Send response
    await message.reply(response);

    // Check if we should trigger the bot conversation
    if (sharedState.checkTrigger(message.author.id) && !sharedState.hasPendingConversation(message.author.id)) {
      sharedState.setPendingConversation(message.author.id, message.channel.id);
      console.log(`🎯 Trigger activated for user ${message.author.tag}! Waiting for C-3PO to initiate conversation...`);

      // Send a subtle hint
      setTimeout(async () => {
        await message.channel.send('*R2-D2 beeps excitedly and looks around for C-3PO* Beep boop boop!');
      }, 2000);
    }
  }
});

// Login
client.login(process.env.R2D2_TOKEN);
