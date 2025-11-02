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

// General Kenobi's wise and civilized responses
const kenobiResponses = [
  'Hello there! ⚔️',
  'The Force will be with you, always. ✨',
  'These aren\'t the droids you\'re looking for... or are they? 🤔',
  'In my experience, there\'s no such thing as luck.',
  'Your eyes can deceive you; don\'t trust them.',
  'Who\'s the more foolish: the fool, or the fool who follows him?',
  'Many of the truths we cling to depend greatly on our own point of view.',
  'You were right about me. Tell your sister... you were right. Wait, wrong timeline!',
  'I have the high ground! (Sorry, couldn\'t resist)',
  'That\'s... why I\'m here. 😊',
];

// Special responses for certain keywords
const specialResponses = {
  'hello': 'Hello there! A civilized greeting! ⚔️',
  'hi': 'Greetings, young one. How may I assist you?',
  'help': 'Remember, the Force will be with you, always.',
  'thanks': 'May the Force be with you.',
  'thank you': 'You\'re most welcome. Stay on the path of the Light.',
  'grievous': 'Ah yes, General Grievous. *ignites lightsaber* Hello there!',
  'anakin': '*sighs sadly* He was my brother... I loved him.',
  'skywalker': 'Ah, the Skywalkers. A family of great destiny.',
  'luke': 'Young Skywalker! He represents our greatest hope.',
  'r2': 'Ah, R2-D2! That astromech has gotten me out of many tight situations.',
  'r2d2': 'R2-D2 is quite the resourceful little droid!',
  'r2-d2': 'I owe much to that brave astromech.',
  'c3po': 'C-3PO! A most proper protocol droid, if a bit worrisome at times.',
  'protocol': 'Ah yes, protocol and etiquette - C-3PO\'s specialty!',
  'high ground': 'It\'s over! I have the high ground! *smirks* ⛰️',
  'master': 'I am no longer a Padawan, but I always honor my teachers.',
  'jedi': 'The Jedi Order represents peace and justice in the galaxy.',
  'sith': 'Only a Sith deals in absolutes.',
  'force': 'The Force is what gives a Jedi his power. It surrounds us, penetrates us, and binds the galaxy together.',
  'lightsaber': '*ignites elegant blue lightsaber* An elegant weapon for a more civilized age. ⚔️',
};

// Get a random Kenobi response
function getKenobiResponse(message) {
  const lowerMessage = message.content.toLowerCase();

  // Check for special keywords
  for (const [keyword, response] of Object.entries(specialResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Return random response
  return kenobiResponses[Math.floor(Math.random() * kenobiResponses.length)];
}

// Send the flag to a user
async function deliverFlag(user, channelId) {
  const channel = await client.channels.fetch(channelId);

  // Kenobi appears in the channel first
  await channel.send('*A hooded figure emerges from the shadows, his robes flowing in the desert wind*');
  await new Promise(resolve => setTimeout(resolve, 2500));
  await channel.send('**General Kenobi:** Hello there! I understand R2-D2 has something important for me? ⚔️');
  await new Promise(resolve => setTimeout(resolve, 2000));
  await channel.send('**General Kenobi:** *examines the holographic Death Star plans* Remarkable... Princess Leia was wise to trust these droids.');
  await new Promise(resolve => setTimeout(resolve, 2500));
  await channel.send('**General Kenobi:** This information is vital to the Rebellion. These plans reveal a critical weakness in the Death Star\'s design! 🛸');
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Send the flag via DM
  try {
    await user.send(
      '⚔️ **ENCRYPTED MESSAGE FROM GENERAL KENOBI** ⚔️\n\n' +
      '```\n' +
      'REBEL ALLIANCE - CLASSIFIED\n' +
      'TRANSMISSION: DEATH STAR TACTICAL ANALYSIS\n' +
      '═══════════════════════════════════════════\n' +
      '```\n\n' +
      'Young Rebel,\n\n' +
      'You have successfully helped R2-D2 and C-3PO deliver the stolen Death Star plans to me. ' +
      'Your assistance to the Rebellion has not gone unnoticed.\n\n' +
      'The technical readouts reveal a critical weakness: a small thermal exhaust port, ' +
      'only two meters wide, leads directly to the main reactor. A precise shot will start a chain reaction.\n\n' +
      '**Your Rebel Alliance Access Code:**\n\n' +
      '`dr4g0nbyt3{H3ll0_Th3r3}`\n\n' +
      '```\n' +
      'MISSION STATUS: COMPLETE ✓\n' +
      'AUTHORIZATION: GENERAL OBI-WAN KENOBI\n' +
      'SECURITY CLEARANCE: LEVEL 9\n' +
      '```\n\n' +
      '*"The Force will be with you, always."*\n\n' +
      'May the Force guide you in battles to come.\n\n' +
      '— General Kenobi ⚔️'
    );

    await channel.send(`**General Kenobi:** *turns to ${user.tag}* Your assistance has been invaluable. The encrypted access code has been transmitted. May the Force be with you, young Rebel! ⭐`);
    console.log(`✅ General Kenobi delivered flag to ${user.tag}`);

    // Reset user state
    sharedState.resetUser(user.id);
  } catch (error) {
    console.error(`❌ Could not DM user ${user.tag}:`, error.message);
    await channel.send('*General Kenobi looks troubled* I sense a disturbance... I cannot reach you through the Force. Please check your communication settings.');
  }
}

client.on('ready', () => {
  console.log(`✅ General Kenobi is online as ${client.user.tag}`);
  console.log('⚔️ Hello there! Monitoring the Force...');

  // Check for pending flag deliveries every 2 seconds
  setInterval(async () => {
    try {
      const pendingDeliveries = sharedState.getPendingFlagDeliveries();

      for (const [userId, data] of pendingDeliveries) {
        console.log(`⚔️ General Kenobi preparing to deliver flag to user ${userId}...`);

        try {
          const user = await client.users.fetch(userId);
          await deliverFlag(user, data.channelId);
          sharedState.clearPendingFlagDelivery(userId);
        } catch (error) {
          console.error(`Error delivering flag to ${userId}:`, error);
          sharedState.clearPendingFlagDelivery(userId);
        }
      }
    } catch (error) {
      console.error('Error checking flag deliveries:', error);
    }
  }, 2000);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots
  if (message.author.bot) return;

  // Check if Kenobi is mentioned or message starts with !kenobi
  const mentioned = message.mentions.has(client.user.id);
  const startsWithCommand = message.content.toLowerCase().startsWith('!kenobi') ||
                           message.content.toLowerCase().startsWith('kenobi') ||
                           message.content.toLowerCase().startsWith('!obi') ||
                           message.content.toLowerCase().startsWith('obi-wan');

  if (mentioned || startsWithCommand) {
    // Get response
    const response = getKenobiResponse(message);

    // Send response
    await message.reply(response);
  }
});

// Login
client.login(process.env.KENOBI_TOKEN);
