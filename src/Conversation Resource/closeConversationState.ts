import getTwilioClient from "../config/getTwilioClient";
const environment = "prd";

/**
 * Closes the conversation state for a given conversation SID.
 * @param {string} conversationSid - The SID of the conversation to close.
 * @returns {Promise<void>}
 */

async function closeConversationState(conversationSid: string): Promise<void> {
  const twilioClient = await getTwilioClient(environment);

  try {
    await twilioClient.conversations.v1.conversations(conversationSid).update({
      state: "closed",
    });

    console.log(
      `✅ Conversation state for ${conversationSid} closed successfully.`
    );
  } catch (error) {
    console.error("❌ Error closing conversation state:", error);
    throw error;
  }
}

const conversationSid = "CHXXXXXXXXXXXXXXXX";
closeConversationState(conversationSid);
