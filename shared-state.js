// Shared state between R2-D2 and C3P0 bots
// Tracks user interactions to trigger the special event

class SharedState {
  constructor() {
    // Track user interactions: userId -> { r2d2Talked: bool, c3poTalked: bool, secretPhrase: bool }
    this.userInteractions = new Map();

    // Track when bots should talk to each other
    this.pendingConversations = new Map(); // userId -> channelId

    // Track pending flag deliveries for Kenobi
    this.pendingFlagDeliveries = new Map(); // userId -> { channelId: string }
  }

  // Record that a user talked to R2-D2
  recordR2D2Interaction(userId) {
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, { r2d2Talked: false, c3poTalked: false, secretPhrase: false });
    }
    const state = this.userInteractions.get(userId);
    state.r2d2Talked = true;
    console.log(`🤖 [R2-D2] User ${userId} interaction recorded. State:`, state);
    this.checkTrigger(userId);
  }

  // Record that a user talked to C3P0
  recordC3POInteraction(userId) {
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, { r2d2Talked: false, c3poTalked: false, secretPhrase: false });
    }
    const state = this.userInteractions.get(userId);
    state.c3poTalked = true;
    console.log(`🌟 [C-3PO] User ${userId} interaction recorded. State:`, state);
    this.checkTrigger(userId);
  }

  // Record that user said the secret phrase
  recordSecretPhrase(userId) {
    if (!this.userInteractions.has(userId)) {
      this.userInteractions.set(userId, { r2d2Talked: false, c3poTalked: false, secretPhrase: false });
    }
    const state = this.userInteractions.get(userId);
    state.secretPhrase = true;
    console.log(`⚔️ [SECRET] User ${userId} said "General Kenobi"! State:`, state);
    this.checkTrigger(userId);
  }

  // Check if user has triggered the conversation
  checkTrigger(userId) {
    const state = this.userInteractions.get(userId);
    const triggered = state && state.r2d2Talked && state.c3poTalked && state.secretPhrase;
    console.log(`🎯 [TRIGGER CHECK] User ${userId} - Triggered: ${triggered}`, state);
    if (triggered) {
      return true;
    }
    return false;
  }

  // Mark that conversation is pending for a user
  setPendingConversation(userId, channelId) {
    this.pendingConversations.set(userId, channelId);
  }

  // Get and clear pending conversation
  getPendingConversation(userId) {
    const channelId = this.pendingConversations.get(userId);
    if (channelId) {
      this.pendingConversations.delete(userId);
      return channelId;
    }
    return null;
  }

  // Check if conversation is pending
  hasPendingConversation(userId) {
    return this.pendingConversations.has(userId);
  }

  // Reset user state (for testing or after flag delivery)
  resetUser(userId) {
    this.userInteractions.delete(userId);
    this.pendingConversations.delete(userId);
    this.pendingFlagDeliveries.delete(userId);
  }

  // Get user state
  getUserState(userId) {
    return this.userInteractions.get(userId);
  }

  // Set pending flag delivery for Kenobi
  setPendingFlagDelivery(userId, channelId) {
    this.pendingFlagDeliveries.set(userId, { channelId });
    console.log(`📨 Flag delivery queued for user ${userId} in channel ${channelId}`);
  }

  // Get all pending flag deliveries (for Kenobi to process)
  getPendingFlagDeliveries() {
    return this.pendingFlagDeliveries;
  }

  // Clear a specific flag delivery
  clearPendingFlagDelivery(userId) {
    this.pendingFlagDeliveries.delete(userId);
  }
}

// Export singleton instance
export const sharedState = new SharedState();
