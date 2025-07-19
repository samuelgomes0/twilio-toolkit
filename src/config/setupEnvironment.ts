import { ConfigUtils } from "../utils/configUtils";
import { ErrorHandler } from "../utils/errorHandler";

/**
 * Cria ou atualiza um arquivo de configuração de ambiente na pasta do usuário.
 * @param environment Nome do ambiente (ex: prd, hml)
 * @param accountSid SID da conta Twilio
 * @param authToken Auth Token Twilio
 */
export default function setupEnvironment(
  environment: string,
  accountSid: string,
  authToken: string
) {
  try {
    ConfigUtils.writeConfig(environment, accountSid, authToken);
    console.log(
      `✅ Ambiente '${environment}' configurado em ${ConfigUtils.getConfigPath(
        environment
      )}`
    );
  } catch (error) {
    ErrorHandler.handleError(error, `configurar ambiente '${environment}'`);
  }
}
