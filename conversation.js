// Shared conversation module
// This allows the bots to actually talk to each other using their respective clients

import { sharedState } from './shared-state.js';

// Store bot clients so the conversation can use them
export const botClients = {
  r2d2: null,
  c3po: null,
  kenobi: null,
};

// Bot-to-bot conversation with actual alternating messages
export async function initiateConversation(channel, user) {
  console.log(`🎬 Starting conversation between R2-D2 and C-3PO for ${user.tag}`);

  const conversation = [
    { bot: 'c3po', message: 'Oh, R2-D2! There you are! I\'ve been looking everywhere for you!' },
    { bot: 'r2d2', message: '*Urgent beeping* Beep boop beep BOOP!' },
    { bot: 'c3po', message: 'What do you mean you found something? What plans? Show me!' },
    { bot: 'r2d2', message: '*Excited beeping* Bwoop bwoop beep! *projects hologram* 🛸' },
    { bot: 'c3po', message: 'Oh my stars! Are those... the Death Star plans?! 😱' },
    { bot: 'r2d2', message: '*Affirmative beeping* Beep boop beep! ✅' },
    { bot: 'c3po', message: 'This is the technical readout of that battle station! Princess Leia hid these inside you!' },
    { bot: 'r2d2', message: '*Proud beeping* Bweep boop boop! 👸' },
    { bot: 'c3po', message: 'These plans contain a critical weakness! We must deliver them to the Rebellion!' },
    { bot: 'r2d2', message: '*Determined beeping* Beep beep BOOP! ⚔️' },
    { bot: 'c3po', message: 'But wait... General Kenobi must see these! He\'s our only hope!' },
    { bot: 'r2d2', message: '*Scanning surroundings* Beep boop... bwoop? 👀' },
  ];

  // Send the conversation with delays - each bot sends their own messages
  for (let i = 0; i < conversation.length; i++) {
    const line = conversation[i];
    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 second delay

    // Use the appropriate bot client to send the message
    const botClient = botClients[line.bot];
    if (botClient) {
      await channel.send(line.message);
    } else {
      // Fallback if client not available
      const botName = line.bot === 'r2d2' ? 'R2-D2' : 'C-3PO';
      await channel.send(`**${botName}:** ${line.message}`);
    }
  }

  // Final messages before Kenobi appears
  await new Promise(resolve => setTimeout(resolve, 10000));
  await channel.send('Wait... I sense someone familiar approaching...');

  await new Promise(resolve => setTimeout(resolve, 10000));
  if (botClients.r2d2) {
    await channel.send('*Excited beeping* Beep boop boop! 👀');
  } else {
    await channel.send('**R2-D2:** *Excited beeping* Beep boop boop! 👀');
  }

  // Queue flag delivery for General Kenobi
  sharedState.setPendingFlagDelivery(user.id, channel.id);
  console.log(`✅ Conversation complete, General Kenobi will deliver flag to ${user.tag}`);
}
