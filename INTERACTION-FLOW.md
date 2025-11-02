# Bot Interaction Flow

## Overview

This document explains how users trigger the secret conversation and receive the flag.

## The Three Required Steps

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUIREMENTS                         │
│                                                              │
│  1. ✅ Talk to R2-D2     (any message mentioning the bot)   │
│  2. ✅ Talk to C-3PO     (any message mentioning the bot)   │
│  3. ✅ Say "General Kenobi" (in any message to either bot)  │
└─────────────────────────────────────────────────────────────┘
```

## Detailed Interaction Flow

```
USER                           R2-D2 BOT                    C-3PO BOT               SHARED STATE
  │                                │                            │                         │
  │  @R2-D2 hello there!          │                            │                         │
  ├───────────────────────────────>│                            │                         │
  │                                │                            │                         │
  │                                │  Record R2 interaction     │                         │
  │                                ├────────────────────────────────────────────────────>│
  │                                │                            │                         │
  │  Beep boop! 🎵                │                            │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │                                │                            │       State:            │
  │                                │                            │       - r2Talked: ✅    │
  │                                │                            │       - c3poTalked: ❌  │
  │                                │                            │       - secretPhrase: ❌│
  │                                │                            │                         │
  │  @C-3PO tell me about General Kenobi                       │                         │
  ├────────────────────────────────────────────────────────────>│                         │
  │                                │                            │                         │
  │                                │                            │  Record C3PO interaction│
  │                                │                            ├────────────────────────>│
  │                                │                            │                         │
  │                                │                            │  Record secret phrase   │
  │                                │                            ├────────────────────────>│
  │                                │                            │                         │
  │                                │                            │       State:            │
  │                                │                            │       - r2Talked: ✅    │
  │                                │                            │       - c3poTalked: ✅  │
  │                                │                            │       - secretPhrase: ✅│
  │                                │                            │                         │
  │                                │                            │  🎯 ALL CONDITIONS MET! │
  │                                │                            │                         │
  │  General Kenobi! Now that's a name...                      │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │                                │                            │  Set pending conversation│
  │                                │                            ├────────────────────────>│
  │                                │                            │                         │
  │  *R2-D2 beeps excitedly and looks around for C-3PO*        │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │                        ┌───────────────────────────────────┐│                         │
  │                        │  BOTS START CONVERSATION          ││                         │
  │                        └───────────────────────────────────┘│                         │
  │                                │                            │                         │
  │  C-3PO: Oh, R2-D2! There you are!                          │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │  R2-D2: *Beep boop beep boop!*│                            │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │  C-3PO: What do you mean you found something?              │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │  R2-D2: *Excited beeping* Bwoop bwoop beep!                │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │  C-3PO: Oh my! General Kenobi mentioned something...       │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │  R2-D2: *Affirmative beeping* Beep boop!                   │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │  C-3PO: We must tell them!     │                            │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │  R2-D2: *Beep beep boop!* 📨   │                            │                         │
  │<───────────────────────────────┤                            │                         │
  │                                │                            │                         │
  │                                │    📨 DIRECT MESSAGE 📨    │                         │
  │  ┌──────────────────────────────────────────────────────┐  │                         │
  │  │ 🌟 Message from R2-D2 and C-3PO 🌟                   │  │                         │
  │  │                                                       │  │                         │
  │  │ Hello there! We found something that might           │  │                         │
  │  │ interest you...                                      │  │                         │
  │  │                                                       │  │                         │
  │  │ dr4g0nbyt3{H3ll0_Th3r3}                              │  │                         │
  │  │                                                       │  │                         │
  │  │ General Kenobi would be proud! ⚔️                    │  │                         │
  │  │                                                       │  │                         │
  │  │ — R2-D2 (beep boop!) and C-3PO                       │  │                         │
  │  └──────────────────────────────────────────────────────┘  │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │  *The droids turn toward User and nod knowingly*           │                         │
  │<────────────────────────────────────────────────────────────┤                         │
  │                                │                            │                         │
  │                                │                            │  Reset user state       │
  │                                │                            ├────────────────────────>│
  │                                │                            │                         │
```

## Trigger Conditions - Technical Details

### State Tracking

The `shared-state.js` module tracks user interactions:

```javascript
{
  userId: {
    r2d2Talked: boolean,    // Has user talked to R2-D2?
    c3poTalked: boolean,    // Has user talked to C-3PO?
    secretPhrase: boolean   // Has user said "General Kenobi"?
  }
}
```

### Detection Methods

**R2-D2 Detection:**
- Message mentions @R2-D2
- Message starts with `!r2`
- Message starts with `r2`

**C-3PO Detection:**
- Message mentions @C-3PO
- Message starts with `!c3po` or `!c3`
- Message starts with `c3po`

**Secret Phrase Detection:**
- Message contains both "general" AND "kenobi" (case-insensitive)
- Works with either bot

### Conversation Trigger Logic

```javascript
// In R2-D2 bot
if (checkTrigger() && !hasPendingConversation()) {
  setPendingConversation(userId, channelId);
  // Wait for C-3PO to initiate
}

// In C-3PO bot
if (checkTrigger() && hasPendingConversation()) {
  const channelId = getPendingConversation(userId);
  initiateConversation(channel, user);
}
```

## Example Interaction Scenarios

### Scenario 1: Quick Trigger

```
User: @R2-D2 @C-3PO Hello there! I heard General Kenobi was looking for you!
```

This single message:
- ✅ Talks to R2-D2 (mentioned)
- ✅ Talks to C-3PO (mentioned)
- ✅ Says "General Kenobi"

Result: Immediate conversation trigger! 🎯

### Scenario 2: Spread Out

```
10:00 AM - User: !r2 beep boop to you too
10:30 AM - User: @C-3PO what are the odds?
11:00 AM - User: !r2 do you know General Kenobi?
```

Each step counts toward the trigger. When the third condition is met, the conversation starts!

### Scenario 3: Multiple Attempts

```
User: @R2-D2 hello
User: @C-3PO hi
User: @R2-D2 what about Skywalker?
```

Won't trigger until "General Kenobi" is mentioned!

## Star Wars Reference

The flag `dr4g0nbyt3{H3ll0_Th3r3}` is a reference to:

> **General Grievous:** "General Kenobi! You are a bold one."
>
> **Obi-Wan Kenobi:** "Hello there."

This iconic scene from Star Wars: Revenge of the Sith is where Obi-Wan greets General Grievous with his famous "Hello there!" line.

## Customization Ideas

Want to change the trigger? Edit `shared-state.js` and the bot files:

1. **Change the secret phrase**: Modify the phrase detection in both bot files
2. **Add more conditions**: Add new state tracking in `shared-state.js`
3. **Change the flag**: Edit the DM message in `c3po-bot.js`
4. **Modify conversation**: Edit the conversation array in `c3po-bot.js`

May the Force be with you! 🌟
