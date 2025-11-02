# Railway Deployment Guide

This guide will walk you through deploying your Star Wars Discord bots to Railway.app for 24/7 operation.

## Prerequisites

- ✅ GitHub account
- ✅ Private GitHub repository created
- ✅ Three Discord bot tokens (R2-D2, C-3PO, General Kenobi)
- ✅ Railway.app account (free to create)

---

## Step 1: Push Code to GitHub

### 1a. Initialize Git (if not already done)

```bash
cd /Users/cmcgennis/Dev/bots/discord-r2-c3po
git init
```

### 1b. Add all files

```bash
git add .
```

### 1c. Create first commit

```bash
git commit -m "Initial commit - Star Wars Discord bots"
```

### 1d. Add your GitHub repository as remote

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 1e. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

## Step 2: Create Railway Account

1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign up with your **GitHub account** (easiest way)
4. Authorize Railway to access your GitHub

---

## Step 3: Create New Project on Railway

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"**
4. Select your private repository: `discord-r2-c3po` (or whatever you named it)
5. Click **"Deploy Now"**

Railway will automatically:
- Detect it's a Node.js project
- Run `npm install`
- Try to start with `npm start`

**It will FAIL first** - this is expected! We need to add environment variables.

---

## Step 4: Add Environment Variables

1. In your Railway project, click on your deployment
2. Click the **"Variables"** tab
3. Click **"+ New Variable"**
4. Add each of these three variables:

### Variable 1: R2D2_TOKEN
- **Name:** `R2D2_TOKEN`
- **Value:** `[Your R2-D2 bot token from Discord Developer Portal]`

### Variable 2: C3PO_TOKEN
- **Name:** `C3PO_TOKEN`
- **Value:** `[Your C-3PO bot token from Discord Developer Portal]`

### Variable 3: KENOBI_TOKEN
- **Name:** `KENOBI_TOKEN`
- **Value:** `[Your General Kenobi bot token from Discord Developer Portal]`

4. Click **"Add"** for each variable

---

## Step 5: Deploy!

1. After adding all variables, Railway will **automatically redeploy**
2. Click on the **"Deployments"** tab to watch the build
3. You should see:
   ```
   Building...
   Installing dependencies...
   Starting application...
   ✅ R2-D2 is online
   ✅ C-3PO is online
   ✅ General Kenobi is online
   ```

4. Check your Discord server - all three bots should be **ONLINE** 🟢

---

## Step 6: Verify Everything Works

In your Discord server:

1. Test R2-D2: `@R2-D2 hello`
2. Test C-3PO: `@C-3PO hi`
3. Test Kenobi: `@General Kenobi hello there`
4. **Trigger the full sequence:**
   - `@R2-D2 hey`
   - `@C-3PO hi`
   - `@R2-D2 do you know General Kenobi?`
   - Watch the Death Star plans conversation!
   - Get your DM with the flag!

---

## 💰 Cost

Railway pricing:
- **Free Trial:** $5 credit (lasts about 1 month for these bots)
- **After trial:** ~$5/month for all 3 bots running 24/7
- **No credit card required** to start

---

## 📊 Monitoring Your Bots

### View Logs
1. Go to your Railway project
2. Click on your deployment
3. Click **"Logs"** tab
4. You'll see real-time output from all three bots

### Restart Bots
1. Go to your Railway project
2. Click **"Settings"**
3. Click **"Restart"**

### Update Bots
Just push to GitHub:
```bash
git add .
git commit -m "Update bot responses"
git push
```
Railway will automatically redeploy!

---

## 🔧 Troubleshooting

### ❌ Bots show as offline
**Check:**
1. Railway logs for errors
2. Verify all 3 environment variables are set correctly
3. Make sure tokens haven't expired

**Fix:**
- Go to Variables tab and verify tokens
- Click "Restart" to reboot

### ❌ "Used disallowed intents" error
**Fix:**
- Go to Discord Developer Portal
- For each bot: Bot → Privileged Gateway Intents → Enable "MESSAGE CONTENT INTENT"

### ❌ Build fails
**Check:**
- Logs tab for specific error
- Make sure `package.json` and all `.js` files are in the repo

---

## 🎉 Success!

Your bots are now running 24/7! They will:
- ✅ Auto-restart if they crash
- ✅ Auto-deploy when you push to GitHub
- ✅ Send you email alerts if something goes wrong
- ✅ Run reliably without any maintenance

---

## 📝 Useful Railway Commands

### View deployment URL
```
Railway assigns a URL but bots don't need it (they connect to Discord directly)
```

### Download logs
1. Click "Logs" tab
2. Click the download icon

### Delete deployment
1. Settings → Danger Zone → Delete Service

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Check your logs first - they usually show the exact issue!

May the Force be with you! 🌟
