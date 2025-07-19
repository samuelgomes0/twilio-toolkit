import getTwilioClient from "../../config/getTwilioClient";

/**
 * Busca todas as conversas ativas de um participante em um ambiente específico.
 * @param {string} environment - O ambiente de configuração (ex.: 'dev', 'prd').
 * @param {string} participantAddress - O endereço WhatsApp do participante (ex.: '5511999999999').
 */
async function fetchAllActiveConversations(
  environment: string,
  participantAddress: string
) {
  try {
    const twilioClient = getTwilioClient(environment);

    const conversations =
      await twilioClient.conversations.v1.participantConversations.list({
        address: `whatsapp:+${participantAddress}`,
      });

    const activeConversations = conversations.filter(
      (conversation) => conversation.conversationState === "active"
    );

    if (!activeConversations.length) {
      console.log(
        `ℹ️ Nenhuma conversa ativa encontrada para o participante ${participantAddress}.`
      );
      return;
    }

    console.log(
      `✅ Encontradas ${activeConversations.length} conversas ativas para o participante ${participantAddress}.`
    );

    for (const conversation of activeConversations) {
      console.log(
        `ℹ️ SID da conversa: ${conversation.conversationSid}, Estado: ${conversation.conversationState}`
      );
    }
  } catch (error) {
    console.error("❌ Erro ao buscar conversas ativas:", error);
    process.exit(1);
  }
}

export default fetchAllActiveConversations;
