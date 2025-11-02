# Discord R2-D2 & C-3PO Bots

Two Star Wars-themed Discord bots that interact with users and each other to deliver a special CTF flag!

## Features

- **R2-D2**: Communicates in beeps and boops with occasional context
- **C-3PO**: Verbose protocol droid with proper etiquette
- **Interactive Easter Egg**: Get both droids talking and mention the right phrase to unlock a secret!

## How the Easter Egg Works

To trigger the special bot-to-bot conversation and receive the flag via DM, users must:

1. **Talk to R2-D2** - Mention the bot or use `!r2` command
2. **Talk to C-3PO** - Mention the bot or use `!c3po` command
3. **Say the magic phrase** - Include "General Kenobi" in any message to either bot

Once all three conditions are met:
- The bots will have a conversation with each other in the channel
- They'll send you a private message with the flag: `dr4g0nbyt3{H3ll0_Th3r3}`
- This is a reference to General Grievous saying "General Kenobi!" in Star Wars

## Setup Instructions

### Prerequisites

- Node.js 16.x or higher
- Two Discord bot applications (one for R2-D2, one for C-3PO)

### Step 1: Create Discord Bots

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create two applications (R2-D2 and C-3PO)
3. For each application:
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy the bot token (you'll need this)
   - Enable "Message Content Intent" under Privileged Gateway Intents
   - Go to OAuth2 → URL Generator
   - Select scopes: `bot`
   - Select permissions: `Send Messages`, `Read Messages/View Channels`, `Read Message History`
   - Copy the generated URL and use it to invite the bot to your server

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your bot tokens:
```env
R2D2_TOKEN=your_r2d2_bot_token_here
C3PO_TOKEN=your_c3po_bot_token_here
```

### Step 4: Run the Bots

You need to run both bots simultaneously. Open two terminal windows:

**Terminal 1 - R2-D2:**
```bash
npm run r2d2
```

**Terminal 2 - C-3PO:**
```bash
npm run c3po
```

Alternatively, you can use a process manager like `pm2`:
```bash
npm install -g pm2
pm2 start r2d2-bot.js --name r2d2
pm2 start c3po-bot.js --name c3po
```

## Usage

### Talking to the Bots

**R2-D2:**
- `@R2-D2 hello`
- `!r2 help me`
- `r2 what do you think?`

**C-3PO:**
- `@C-3PO greetings`
- `!c3po tell me about protocol`
- `c3po what are the odds?`

### Easter Eggs & References

Both bots respond to various Star Wars references:

- **"odds"** - References to never telling the odds
- **"Skywalker"** - Recognition of Luke/Anakin
- **"Princess" / "Leia"** - References to Princess Leia
- **"General Kenobi"** - The secret trigger phrase! 🎯
- **"maker"** - Thank the Maker!
- And many more...

### Triggering the Secret Conversation

Example interaction:
```
User: @R2-D2 hello there!
R2-D2: Beep boop! *happy chirping sounds* 🎵

User: @C-3PO what do you know about General Kenobi?
C-3PO: General Kenobi! Now that's a name I haven't heard in quite some time!

*Bots start talking to each other*
C-3PO: Oh, R2-D2! There you are!
R2-D2: *Beep boop beep boop!*
...

*You receive a DM with the flag*
```

## Project Structure

```
discord-r2-c3po/
├── r2d2-bot.js          # R2-D2 bot implementation
├── c3po-bot.js          # C-3PO bot implementation
├── shared-state.js      # Shared state manager for tracking interactions
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables (tokens)
├── .env.example         # Example environment file
└── README.md           # This file
```

## How It Works

1. **Shared State**: Both bots share a state manager that tracks:
   - Which users have talked to R2-D2
   - Which users have talked to C-3PO
   - Which users have said "General Kenobi"

2. **Trigger Detection**: When all three conditions are met for a user, the system flags a pending conversation

3. **Bot Conversation**: C-3PO initiates a scripted conversation with R2-D2 in the channel

4. **Flag Delivery**: After the conversation, both bots send a DM to the user with the CTF flag

## Troubleshooting

**Bots not responding:**
- Make sure both bots are online
- Check that Message Content Intent is enabled in Discord Developer Portal
- Verify bots have permission to read/send messages in the channel

**Not receiving DMs:**
- Check your Discord privacy settings
- Make sure you allow DMs from server members
- The bot will notify in the channel if it can't DM you

**Conversation not triggering:**
- Make sure you've talked to BOTH bots
- Make sure you've mentioned "General Kenobi" in a message
- Check console logs for trigger status

## Security Notes

- Never commit your `.env` file
- Keep your bot tokens secret
- If a token is exposed, regenerate it in the Discord Developer Portal

## License

MIT

---

May the Force be with you! 🌟
