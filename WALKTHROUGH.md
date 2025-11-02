# Complete Setup Walkthrough

Follow these steps exactly to get your R2-D2 and C-3PO bots running!

## 📋 Prerequisites Checklist

Before we start, make sure you have:
- [ ] A Discord account
- [ ] A Discord server where you have admin permissions (or can create one)
- [ ] This project downloaded/cloned to your computer
- [ ] Node.js installed (check with: `node --version`)

---

## Step 1: Access Discord Developer Portal

1. **Open your web browser** and go to:
   ```
   https://discord.com/developers/applications
   ```

2. **Log in** with your Discord account

3. You should see a page titled "Applications" with a button that says "New Application"

**✅ CHECKPOINT:** You should see the Discord Developer Portal dashboard

---

## Step 2: Create R2-D2 Bot Application

1. **Click the "New Application" button** (top right)

2. **Name your application:** Type `R2-D2`

3. **Agree to Terms:** Check the box agreeing to Discord's Developer Terms

4. **Click "Create"**

5. You'll see the application page with a sidebar on the left

**✅ CHECKPOINT:** You should see "R2-D2" at the top of the page with tabs like General Information, Bot, OAuth2, etc.

---

## Step 3: Configure R2-D2 Bot

### 3a. Add a Bot

1. **Click "Bot"** in the left sidebar

2. **Click "Add Bot"** button

3. **Confirm** by clicking "Yes, do it!"

4. You should now see a bot user with a token section

### 3b. Enable Required Permissions

**VERY IMPORTANT** - Scroll down to find "Privileged Gateway Intents"

1. Find the switch for **"MESSAGE CONTENT INTENT"**

2. **Turn it ON** (slide to the right, it should be blue/green)

3. **Click "Save Changes"** at the bottom

**Why?** Without this, the bot cannot read message content and won't work!

### 3c. Get Your Bot Token

1. **Scroll back up** to the "TOKEN" section

2. **Click "Reset Token"** (or "Copy" if visible)

3. **Confirm** if asked

4. **COPY THE TOKEN** - this is important!
   - It looks like: `MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.GaBcDe.xyz123...`

5. **Save this token somewhere safe** (like a text file temporarily)
   - You'll add it to your `.env` file later
   - ⚠️ **NEVER share this token publicly!**

**✅ CHECKPOINT:** You have R2-D2's bot token saved somewhere safe

---

## Step 4: Create Invite Link for R2-D2

1. **Click "OAuth2"** in the left sidebar

2. **Click "URL Generator"** (under OAuth2)

3. **In the "SCOPES" section**, check the box for:
   - ✅ `bot`

4. **In the "BOT PERMISSIONS" section** (appears after checking bot), check:
   - ✅ View Channels
   - ✅ Send Messages
   - ✅ Read Message History

5. **Copy the URL** at the very bottom (it's a long URL)

6. **Save this URL** for later (we'll use it in Step 6)

**✅ CHECKPOINT:** You have R2-D2's invite URL copied

---

## Step 5: Create C-3PO Bot Application

**Repeat Steps 2, 3, and 4 but for C-3PO:**

1. **Go back** to the Applications page
   - Click "Applications" at the top or visit: https://discord.com/developers/applications

2. **Click "New Application"** again

3. **Name it:** `C-3PO`

4. **Click "Create"**

5. **Follow Step 3** exactly:
   - Click "Bot" → "Add Bot"
   - Enable "MESSAGE CONTENT INTENT" ✅
   - Save Changes
   - Copy the bot token → **Save it separately from R2-D2's token!**

6. **Follow Step 4** to create the invite link:
   - OAuth2 → URL Generator
   - Check: bot (scope)
   - Check: View Channels, Send Messages, Read Message History
   - Copy the generated URL

**✅ CHECKPOINT:** You now have:
- R2-D2 bot token
- R2-D2 invite URL
- C-3PO bot token
- C-3PO invite URL

---

## Step 6: Invite Bots to Your Discord Server

### 6a. Invite R2-D2

1. **Open a new browser tab**

2. **Paste R2-D2's invite URL** (from Step 4)

3. **Select your server** from the dropdown

4. **Click "Continue"**

5. **Review permissions** (should show the ones we selected)

6. **Click "Authorize"**

7. **Complete the CAPTCHA** if prompted

8. **Go to your Discord server** - you should see R2-D2 appear in the member list!

### 6b. Invite C-3PO

**Repeat the same process** with C-3PO's invite URL

**✅ CHECKPOINT:** Both R2-D2 and C-3PO should appear in your Discord server's member list (they'll show as offline for now)

---

## Step 7: Configure Your Project

### 7a. Create .env File

1. **Open a terminal** in the project directory:
   ```bash
   cd /Users/cmcgennis/Dev/bots/discord-r2-c3po
   ```

2. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

3. **Open .env in a text editor:**
   ```bash
   # On Mac:
   open -e .env

   # Or use nano:
   nano .env

   # Or use your favorite editor:
   code .env     # VS Code
   ```

### 7b. Add Your Bot Tokens

The file should look like this:

```env
# Discord Bot Tokens
R2D2_TOKEN=your_r2d2_bot_token_here
C3PO_TOKEN=your_c3po_bot_token_here

# Discord Channel IDs (optional - bots will work in any channel they can see)
# MAIN_CHANNEL_ID=your_channel_id_here
```

**Replace the placeholder text:**

1. **Delete** `your_r2d2_bot_token_here`
2. **Paste** R2-D2's actual token
3. **Delete** `your_c3po_bot_token_here`
4. **Paste** C-3PO's actual token

**Example of what it should look like:**
```env
R2D2_TOKEN=your_actual_r2d2_token_from_discord_here
C3PO_TOKEN=your_actual_c3po_token_from_discord_here
KENOBI_TOKEN=your_actual_kenobi_token_from_discord_here
```

5. **Save the file**
   - In nano: Press `Ctrl+X`, then `Y`, then `Enter`
   - In other editors: File → Save

**✅ CHECKPOINT:** Your `.env` file contains both bot tokens

---

## Step 8: Start the Bots

### Option A: Using the Startup Script (Easiest)

1. **Make sure you're in the project directory:**
   ```bash
   cd /Users/cmcgennis/Dev/bots/discord-r2-c3po
   ```

2. **Run the startup script:**
   ```bash
   ./start-bots.sh
   ```

3. **You should see:**
   ```
   🌟 Starting Star Wars Discord Bots...
   ✅ Both bots started with PM2!
   ```

### Option B: Manual Start (Two Terminal Windows)

**Terminal Window 1:**
```bash
cd /Users/cmcgennis/Dev/bots/discord-r2-c3po
npm run r2d2
```

You should see:
```
✅ R2-D2 is online as R2-D2#1234
🤖 Beep boop! Ready to assist!
```

**Terminal Window 2:** (open a new terminal)
```bash
cd /Users/cmcgennis/Dev/bots/discord-r2-c3po
npm run c3po
```

You should see:
```
✅ C-3PO is online as C-3PO#5678
🌟 Human-cyborg relations protocol activated!
```

**✅ CHECKPOINT:** Both bots should now show as ONLINE in your Discord server!

---

## Step 9: Test the Bots

### Test 1: Basic Communication

**In your Discord server, try:**

```
@R2-D2 hello there
```

**Expected Response:**
```
R2-D2: Beep boop! *happy chirping sounds* 🎵
```

**Now try:**
```
@C-3PO greetings
```

**Expected Response:**
```
C-3PO: Greetings! I'm C-3PO, human-cyborg relations. How may I serve you?
```

**✅ CHECKPOINT:** Both bots respond to messages!

---

### Test 2: Trigger the Secret (CTF Flag)

Now let's trigger the special conversation! You need to complete three things:

**Step 1 - Talk to R2-D2:**
```
@R2-D2 hey there buddy
```

**Step 2 - Talk to C-3PO:**
```
@C-3PO hello
```

**Step 3 - Say the magic phrase:**
```
@C-3PO Do you know General Kenobi?
```

or

```
@R2-D2 I heard General Kenobi was looking for you
```

**What Should Happen:**

1. After the third step, you'll see a message like:
   ```
   *R2-D2 beeps excitedly and looks around for C-3PO* Beep boop boop!
   ```

2. Then the bots will have a conversation:
   ```
   C-3PO: Oh, R2-D2! There you are! I've been looking everywhere for you!
   R2-D2: *Beep boop beep boop!*
   C-3PO: What do you mean you found something? Show me!
   R2-D2: *Excited beeping* Bwoop bwoop beep! *projects hologram*
   ...
   ```

3. You'll receive a **Direct Message** from the bots with the flag!

**Check your DMs for:**
```
🌟 Message from R2-D2 and C-3PO 🌟

Hello there! We found something that might interest you...

dr4g0nbyt3{H3ll0_Th3r3}

General Kenobi would be proud! ⚔️

— R2-D2 (beep boop!) and C-3PO
```

**✅ CHECKPOINT:** You received the flag via DM! 🎉

---

## Troubleshooting

### ❌ Bots show as offline

**Check:**
1. Are both bot scripts running? Check your terminals
2. Are the tokens correct in `.env`?
3. Did you save the `.env` file?

**Fix:**
```bash
# Stop the bots (Ctrl+C in each terminal)
# Check your .env file
cat .env

# Restart the bots
npm run r2d2    # Terminal 1
npm run c3po    # Terminal 2
```

---

### ❌ Bots don't respond to messages

**Check:**
1. Did you enable "MESSAGE CONTENT INTENT"? (Step 3b)
2. Do the bots have permission to see/send messages in the channel?

**Fix for Intent:**
1. Go back to Discord Developer Portal
2. Click on your bot application
3. Click "Bot" in sidebar
4. Scroll to "Privileged Gateway Intents"
5. Enable "MESSAGE CONTENT INTENT"
6. Save Changes
7. Restart both bots

---

### ❌ Didn't receive DM with flag

**Check:**
1. Discord Privacy Settings - you need to allow DMs from server members
2. Check your terminal for error messages

**Fix:**
1. In Discord: User Settings → Privacy & Safety
2. Enable "Allow direct messages from server members"
3. Try triggering the secret again (talk to both bots + say "General Kenobi")

---

### ❌ Error: "Cannot find module"

**Fix:**
```bash
# Make sure dependencies are installed
npm install
```

---

### ❌ Error: "TOKEN_INVALID"

**Fix:**
1. Your token might be incorrect
2. Go to Discord Developer Portal
3. Go to your bot → Bot section
4. Click "Reset Token"
5. Copy the new token
6. Update `.env` file
7. Restart the bot

---

## Managing the Bots

### Stop the Bots

**If using start script with PM2:**
```bash
pm2 stop all
```

**If using manual start:**
- Press `Ctrl+C` in each terminal window

### Restart the Bots

**If using PM2:**
```bash
pm2 restart all
```

**If manual:**
- Stop them (Ctrl+C)
- Run the start commands again

### View Logs

**If using PM2:**
```bash
pm2 logs
```

**If manual:**
- Logs appear in the terminal windows

---

## Next Steps

Now that everything is working:

1. **Customize the responses** - Edit `r2d2-bot.js` and `c3po-bot.js`
2. **Change the flag** - Edit the DM message in `c3po-bot.js` (search for "dr4g0nbyt3")
3. **Add more Star Wars references** - Add keywords to `specialResponses`
4. **Change the trigger phrase** - Modify "General Kenobi" detection

---

## Quick Reference

### Useful Commands

```bash
# Start bots (easy way)
./start-bots.sh

# Start bots manually
npm run r2d2     # Terminal 1
npm run c3po     # Terminal 2

# Check if bots are running
pm2 status

# View logs
pm2 logs

# Stop bots
pm2 stop all
# or Ctrl+C in terminals

# Restart bots
pm2 restart all
```

### Test Commands

```
@R2-D2 hello
@C-3PO greetings
@R2-D2 what are the odds?
@C-3PO tell me about General Kenobi
```

---

## Need Help?

If you're stuck:

1. Check the console output for error messages
2. Make sure all steps were completed
3. Verify bot tokens are correct
4. Ensure "MESSAGE CONTENT INTENT" is enabled
5. Check that bots have proper channel permissions

May the Force be with you! 🌟
