import getTwilioClient from "../../config/getTwilioClient";
import { ErrorHandler } from "../../utils/errorHandler";

/**
 * Envia uma mensagem via Twilio
 * @param {string} environment - O ambiente de configuração (ex.: 'prd', 'hml').
 * @param {string} to - Número de destino (ex.: '5511999999999').
 * @param {string} from - Número de origem (ex.: '5511888888888').
 * @param {string} message - Conteúdo da mensagem.
 */
async function sendMessage(
  environment: string,
  to: string,
  from: string,
  message: string
) {
  try {
    const twilioClient = getTwilioClient(environment);

    const messageInstance = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:+${from}`,
      to: `whatsapp:+${to}`,
    });

    console.log(
      `✅ Mensagem enviada com sucesso!\n` +
        `📱 Para: ${to}\n` +
        `📱 De: ${from}\n` +
        `💬 Mensagem: ${message}\n` +
        `🆔 SID: ${messageInstance.sid}`
    );
  } catch (error) {
    ErrorHandler.handleApiError(error, "enviar mensagem");
  }
}

export default sendMessage;
