import { ConfigUtils } from "../utils/configUtils";
import { ErrorHandler } from "../utils/errorHandler";

/**
 * Lista todos os arquivos de ambiente salvos na pasta ~/.twilio-toolkit/
 * e exibe informações básicas de cada configuração.
 */
function listEnvironments() {
  try {
    const files = ConfigUtils.listConfigFiles();

    if (!files.length) {
      console.log("ℹ️ Nenhum ambiente configurado ainda.");
      return;
    }

    console.log(
      `✅ Ambientes configurados em ${ConfigUtils.getConfigDir()}:\n`
    );

    files.forEach((file) => {
      try {
        const envName = file.replace(".json", "");
        const config = ConfigUtils.readConfig(envName);
        console.log(
          `- Environment Name: ${envName} | Account SID: ${config.accountSid}`
        );
      } catch (error) {
        console.log(`⚠️  Erro ao ler ${file}: ${error}`);
      }
    });
  } catch (error) {
    ErrorHandler.handleError(error, "listar ambientes");
  }
}

export default listEnvironments;
