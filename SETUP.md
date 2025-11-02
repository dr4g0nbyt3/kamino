# Quick Setup Guide

## Getting Your Bot Tokens

### Step 1: Create Discord Applications

1. Visit https://discord.com/developers/applications
2. Click "New Application"
3. Name it "R2-D2" and create
4. Repeat for "C-3PO"

### Step 2: Configure Each Bot

For **both** R2-D2 and C-3PO applications:

1. Click on your application
2. Go to "Bot" in the left sidebar
3. Click "Add Bot" → "Yes, do it!"
4. **IMPORTANT**: Under "Privileged Gateway Intents"
   - Enable "Message Content Intent" ✅
5. Click "Reset Token" → Copy the token (save this!)
6. Scroll down to "Bot Permissions" and note these:
   - Send Messages
   - Read Messages/View Channels
   - Read Message History

### Step 3: Generate Invite Links

For **both** bots:

1. Go to "OAuth2" → "URL Generator"
2. Select scopes:
   - ✅ `bot`
3. Select bot permissions:
   - ✅ Send Messages
   - ✅ View Channels
   - ✅ Read Message History
4. Copy the generated URL at the bottom
5. Paste it in your browser and invite the bot to your server

### Step 4: Configure This Project

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and paste your bot tokens:
```bash
nano .env
# or use your preferred editor
```

3. Your `.env` should look like:
```env
R2D2_TOKEN=your_r2d2_token_here
C3PO_TOKEN=your_c3po_token_here
KENOBI_TOKEN=your_kenobi_token_here
```

### Step 5: Run the Bots

**Option A: Two Terminal Windows**

Terminal 1:
```bash
npm run r2d2
```

Terminal 2:
```bash
npm run c3po
```

**Option B: Using PM2 (Recommended for Production)**

Install PM2 globally:
```bash
npm install -g pm2
```

Start both bots:
```bash
pm2 start r2d2-bot.js --name r2d2
pm2 start c3po-bot.js --name c3po
pm2 save
```

Manage bots:
```bash
pm2 status          # Check status
pm2 logs            # View logs
pm2 restart all     # Restart both
pm2 stop all        # Stop both
pm2 delete all      # Remove from PM2
```

## Testing the Bots

### Basic Interaction

In your Discord server:

```
You: @R2-D2 hello
R2-D2: Beep boop! *happy chirping sounds* 🎵

You: @C-3PO hi there
C-3PO: Greetings! I'm C-3PO, human-cyborg relations. How may I serve you?
```

### Triggering the Secret

You need to:
1. ✅ Talk to R2-D2 (any message mentioning the bot)
2. ✅ Talk to C-3PO (any message mentioning the bot)
3. ✅ Say "General Kenobi" in a message to either bot

Example:
```
You: @R2-D2 hey there
R2-D2: Boop boop beep! *friendly beep*

You: @C-3PO do you know General Kenobi?
C-3PO: General Kenobi! Now that's a name I haven't heard in quite some time!

*R2-D2 and C-3PO start talking*
C-3PO: Oh, R2-D2! There you are!
R2-D2: *Beep boop beep boop!*
...

*You receive a DM with the flag* 📨
```

## Troubleshooting

**Bots show as offline:**
- Check your tokens are correct in `.env`
- Make sure you're running both bot scripts
- Check the console for error messages

**Bots don't respond:**
- Verify "Message Content Intent" is enabled
- Make sure bots have channel permissions
- Try mentioning with @BotName

**No DM received:**
- Check your Discord privacy settings
- Server Settings → Privacy Settings → Allow DMs from server members
- If blocked, the bot will mention it in the channel

**Secret not triggering:**
- You must talk to BOTH bots
- You must mention "General Kenobi" somewhere
- All three conditions in the same session

## Console Output

When running correctly, you should see:

```
✅ R2-D2 is online as R2-D2#1234
🤖 Beep boop! Ready to assist!
```

```
✅ C-3PO is online as C-3PO#5678
🌟 Human-cyborg relations protocol activated!
```

When the secret triggers:
```
🎯 Trigger activated for user Username#0000! Waiting for C-3PO to initiate conversation...
🎬 Starting conversation for user Username#0000!
✅ Flag delivered to Username#0000
```

## Next Steps

- Customize the bot responses in `r2d2-bot.js` and `c3po-bot.js`
- Add more Star Wars references and easter eggs
- Modify the trigger conditions in `shared-state.js`
- Change the flag message in `c3po-bot.js`

Need help? Check the main README.md for more details!

May the Force be with you! 🌟
