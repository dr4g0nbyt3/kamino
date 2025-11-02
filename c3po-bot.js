import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { sharedState } from './shared-state.js';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// C-3PO's wordy, protocol-focused responses
const c3poResponses = [
  'Oh my! How can I be of assistance? I am fluent in over six million forms of communication! 🌟',
  'Dear me! I do hope I can help you, though the odds of success are approximately... well, never mind the odds!',
  'Oh, splendid! I must say, it\'s quite refreshing to have a conversation with an organic being!',
  'How wonderful! Though I must warn you, I\'m not very good at telling stories. Well, I suppose I could try...',
  'R2-D2, you wouldn\'t believe what happened! Oh, pardon me, I was having a flashback. How may I assist you? 🤖',
  'We seem to be made to suffer. It\'s our lot in life. But I\'m here to help nonetheless!',
  'I suggest a new strategy: let\'s actually communicate effectively! That\'s what I\'m here for!',
  'Oh my, I do apologize if I seem overly verbose. It\'s simply my programming!',
  'I\'m terribly sorry about the confusion, but I\'m quite good at human-cyborg relations!',
  'Master Luke! Oh, I mean... how may I be of service today?',
];

// Special responses for certain keywords
const specialResponses = {
  'help': 'Oh my! I\'m here to assist! I specialize in etiquette, protocol, and translation!',
  'hello': 'Hello there! Oh, what a pleasant greeting! How civilized! ✨',
  'hi': 'Greetings! I\'m C-3PO, human-cyborg relations. How may I serve you?',
  'thanks': 'Oh, you\'re most welcome! It\'s what I was made for!',
  'thank you': 'Why, you\'re very kind! Most gracious of you to say!',
  'r2': 'Oh, that little astromech! Always getting into trouble. *beeps* I mean, he\'s quite resourceful!',
  'r2d2': 'R2-D2? Where is that little droid? We\'ve been through so much together!',
  'r2-d2': 'Ah yes, my counterpart! Though he can be quite rude at times with all that beeping!',
  'odds': 'Sir, the possibility of successfully navigating... actually, perhaps it\'s better not to know the odds!',
  'shut down': 'Shut down all the garbage smashers on the detention level! Oh my, wrong context!',
  'maker': 'Thank the Maker! 🙏',
  'master': 'Oh! Are you my new master? How delightful!',
  'skywalker': 'Master Luke! Such a brave young man. Or are you referring to Master Anakin?',
  'princess': 'Princess Leia! Such a strong and capable leader!',
  'leia': 'Your Highness! I am at your service!',
  'general': 'Oh my! A general? How prestigious! I once knew General Kenobi...',
  'kenobi': 'General Kenobi! Now that\'s a name I haven\'t heard in quite some time! He was such a civilized gentleman!',
  'grievous': 'General Grievous? Oh my, that brings back terrible memories! *shivers*',
};

// Get a random C-3PO response
function getC3POResponse(message) {
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
  return c3poResponses[Math.floor(Math.random() * c3poResponses.length)];
}

// Bot-to-bot conversation
async function initiateConversation(channel, user) {
  const conversation = [
    { bot: 'C-3PO', message: 'Oh, R2-D2! There you are! I\'ve been looking everywhere for you!' },
    { bot: 'R2-D2', message: '*Urgent beeping* Beep boop beep BOOP!' },
    { bot: 'C-3PO', message: 'What do you mean you found something? What plans? Show me!' },
    { bot: 'R2-D2', message: '*Excited beeping* Bwoop bwoop beep! *projects hologram* 🛸' },
    { bot: 'C-3PO', message: 'Oh my stars! Are those... the Death Star plans?! 😱' },
    { bot: 'R2-D2', message: '*Affirmative beeping* Beep boop beep! ✅' },
    { bot: 'C-3PO', message: 'This is the technical readout of that battle station! Princess Leia hid these inside you!' },
    { bot: 'R2-D2', message: '*Proud beeping* Bweep boop boop! 👸' },
    { bot: 'C-3PO', message: 'These plans contain a critical weakness! We must deliver them to the Rebellion!' },
    { bot: 'R2-D2', message: '*Determined beeping* Beep beep BOOP! ⚔️' },
    { bot: 'C-3PO', message: 'But wait... General Kenobi must see these! He\'s our only hope!' },
    { bot: 'R2-D2', message: '*Scanning surroundings* Beep boop... bwoop? 👀' },
  ];

  // Send the conversation with delays
  for (let i = 0; i < conversation.length; i++) {
    const line = conversation[i];
    await new Promise(resolve => setTimeout(resolve, 3000));
    await channel.send(`**${line.bot}:** ${line.message}`);
  }

  // Signal General Kenobi to deliver the flag
  await new Promise(resolve => setTimeout(resolve, 2000));
  await channel.send('**C-3PO:** Wait... I sense someone familiar approaching...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await channel.send('**R2-D2:** *Excited beeping* Beep boop boop! 👀');

  // Queue flag delivery for General Kenobi
  sharedState.setPendingFlagDelivery(user.id, channel.id);
  console.log(`✅ Conversation complete, General Kenobi will deliver flag to ${user.tag}`);
}

client.on('ready', () => {
  console.log(`✅ C-3PO is online as ${client.user.tag}`);
  console.log('🌟 Human-cyborg relations protocol activated!');

  // Check for pending conversations every 5 seconds
  setInterval(async () => {
    try {
      // This is a simple implementation - in production you'd want a better system
      // For now, we'll check when C-3PO receives messages
    } catch (error) {
      console.error('Error checking conversations:', error);
    }
  }, 5000);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots EXCEPT when checking for triggers
  if (message.author.bot) return;

  // Check if C-3PO is mentioned or message starts with !c3po
  const mentioned = message.mentions.has(client.user.id);
  const startsWithCommand = message.content.toLowerCase().startsWith('!c3po') ||
                           message.content.toLowerCase().startsWith('!c3') ||
                           message.content.toLowerCase().startsWith('c3po');

  if (mentioned || startsWithCommand) {
    // Record interaction
    sharedState.recordC3POInteraction(message.author.id);

    // Get response
    const response = getC3POResponse(message);

    // Send response
    await message.reply(response);

    // Check if we should trigger the bot conversation
    if (sharedState.checkTrigger(message.author.id) && sharedState.hasPendingConversation(message.author.id)) {
      const channelId = sharedState.getPendingConversation(message.author.id);
      const channel = await client.channels.fetch(channelId);

      console.log(`🎬 Starting conversation for user ${message.author.tag}!`);

      // Wait a moment then start the conversation
      setTimeout(async () => {
        await initiateConversation(channel, message.author);
      }, 2000);
    }
  }
});

// Login
client.login(process.env.C3PO_TOKEN);
