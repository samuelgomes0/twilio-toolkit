import getTwilioClient from "../config/getTwilioClient";
const environment = "prd";

/**
 * Fetches all active conversations for a given participant address.
 * @param {string} participantAddress - The address of the participant (e.g., WhatsApp number).
 * @returns {Promise<void>}
 */

async function fetchAllActiveConversations(
  participantAddress: string
): Promise<void> {
  const twilioClient = await getTwilioClient(environment);

  try {
    const conversations =
      await twilioClient.conversations.v1.participantConversations.list({
        address: participantAddress,
      });

    const activeConversations = conversations.filter(
      (conversation) => conversation.conversationState === "active"
    );

    if (!activeConversations.length) {
      console.log(
        `ℹ️ No active conversations found for participant ${participantAddress}.`
      );
      return;
    }

    console.log(
      `✅ Fetched ${activeConversations.length} active conversations for participant ${participantAddress}.`
    );

    for (const conversation of activeConversations) {
      console.log(
        `ℹ️ Conversation SID: ${conversation.conversationSid}, State: ${conversation.conversationState}`
      );
    }
  } catch (error) {
    console.error("❌ Error closing conversation state:", error);
    throw error;
  }
}

const participantAddress = `whatsapp:+${"555381219026"}`;
fetchAllActiveConversations(participantAddress);
