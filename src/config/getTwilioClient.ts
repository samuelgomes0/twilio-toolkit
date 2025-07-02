import fs from "fs";
import os from "os";
import path from "path";
import { Twilio } from "twilio";

/**
 * Obtém o cliente Twilio configurado com base no ambiente.
 * Lê o arquivo de configuração do diretório do usuário.
 * @param environment O ambiente desejado (ex: prd, hml)
 * @returns Instância do cliente Twilio
 */
export default function getTwilioClient(environment: string): Twilio {
  const homeDir = os.homedir();
  const configPath = path.join(
    homeDir,
    ".twilio-toolkit",
    `${environment}.json`
  );

  if (!fs.existsSync(configPath)) {
    console.error(
      `❌ Nenhum arquivo de configuração encontrado para o ambiente '${environment}'.\n` +
        `💡 Use o comando: twilio-toolkit configure-env --env ${environment} --accountSid ... --authToken ...`
    );
    process.exit(1);
  }

  try {
    const { accountSid, authToken } = require(configPath);
    if (!accountSid || !authToken) {
      console.error(
        `❌ Configuração inválida em '${configPath}'.\n` +
          `💡 Verifique se 'accountSid' e 'authToken' estão definidos corretamente.`
      );
      process.exit(1);
    }

    return new Twilio(accountSid, authToken);
  } catch (error) {
    console.error(
      `❌ Erro ao ler o arquivo de configuração '${configPath}'.\n` +
        `💡 Verifique se o arquivo é um JSON válido.`
    );
    process.exit(1);
  }
}
