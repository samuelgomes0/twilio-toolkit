import { Twilio } from "twilio";
import { ConfigUtils } from "../utils/configUtils";
import { ErrorHandler } from "../utils/errorHandler";

/**
 * Obtém o cliente Twilio configurado com base no ambiente.
 * Lê o arquivo de configuração do diretório do usuário.
 * @param environment O ambiente desejado (ex: prd, hml)
 * @returns Instância do cliente Twilio
 */
export default function getTwilioClient(environment: string): Twilio {
  try {
    const config = ConfigUtils.readConfig(environment);
    return new Twilio(config.accountSid, config.authToken);
  } catch (error) {
    ErrorHandler.handleConfigError(error as Error);
  }
}
