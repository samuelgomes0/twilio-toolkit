import getTwilioClient from "../../config/getTwilioClient";

/**
 * Fecha o estado de uma conversa específica com base no SID informado.
 * @param {string} environment - O ambiente de configuração a ser utilizado (ex.: 'prd', 'hml').
 * @param {string} conversationSid - O SID da conversa que deve ser fechada.
 */
async function closeConversationState(
  environment: string,
  conversationSid: string
) {
  try {
    const twilioClient = getTwilioClient(environment);

    await twilioClient.conversations.v1.conversations(conversationSid).update({
      state: "closed",
    });

    console.log(
      `✅ Estado da conversa para ${conversationSid} fechado com sucesso.`
    );
  } catch (error) {
    console.error("❌ Erro ao fechar o estado da conversa:", error);
    process.exit(1);
  }
}

export default closeConversationState;
