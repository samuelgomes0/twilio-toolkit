import fs from "fs";
import os from "os";
import path from "path";

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
    const homeDir = os.homedir();
    const configDir = path.join(homeDir, ".twilio-toolkit");

    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const configPath = path.join(configDir, `${environment}.json`);
    const data = { accountSid, authToken };

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), "utf-8");

    console.log(`✅ Ambiente '${environment}' configurado em ${configPath}`);
  } catch (error) {
    console.error(`❌ Erro ao configurar ambiente '${environment}':`, error);
    process.exit(1);
  }
}
