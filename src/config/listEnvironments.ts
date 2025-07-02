import fs from "fs";
import os from "os";
import path from "path";

/**
 * Lista todos os arquivos de ambiente salvos na pasta ~/.twilio-toolkit/
 * e exibe informações básicas de cada configuração.
 */
function listEnvironments() {
  try {
    const homeDir = os.homedir();
    const configDir = path.join(homeDir, ".twilio-toolkit");

    if (!fs.existsSync(configDir)) {
      console.log("ℹ️ Nenhum ambiente configurado ainda.");
      return;
    }

    const files = fs
      .readdirSync(configDir)
      .filter((file) => file.endsWith(".json"));

    if (!files.length) {
      console.log("ℹ️ Nenhum ambiente configurado ainda.");
      return;
    }

    console.log(`✅ Ambientes configurados em ${configDir}:\n`);
    files.forEach((file) => {
      try {
        const configPath = path.join(configDir, file);
        const rawData = fs.readFileSync(configPath, "utf-8");
        const config = JSON.parse(rawData);

        const accountSid = config.accountSid || "N/A";
        const envName = file.replace(".json", "");

        console.log(
          `- Environment Name: ${envName} | Account SID: ${accountSid}`
        );
      } catch (error) {
        console.log(`⚠️  Erro ao ler ${file}: ${error}`);
      }
    });
  } catch (error) {
    console.error(`❌ Erro ao listar ambientes:`, error);
    process.exit(1);
  }
}

export default listEnvironments;
