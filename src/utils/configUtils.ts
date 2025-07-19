import fs from "fs";
import os from "os";
import path from "path";

/**
 * Utilitário para gerenciar configurações de ambiente
 */
export class ConfigUtils {
  private static readonly CONFIG_DIR = ".twilio-toolkit";

  /**
   * Obtém o diretório de configuração no home do usuário
   */
  static getConfigDir(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, this.CONFIG_DIR);
  }

  /**
   * Obtém o caminho completo para um arquivo de configuração de ambiente
   */
  static getConfigPath(environment: string): string {
    return path.join(this.getConfigDir(), `${environment}.json`);
  }

  /**
   * Verifica se o diretório de configuração existe
   */
  static configDirExists(): boolean {
    return fs.existsSync(this.getConfigDir());
  }

  /**
   * Cria o diretório de configuração se não existir
   */
  static ensureConfigDir(): void {
    const configDir = this.getConfigDir();
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
  }

  /**
   * Verifica se um arquivo de configuração existe
   */
  static configExists(environment: string): boolean {
    return fs.existsSync(this.getConfigPath(environment));
  }

  /**
   * Lista todos os arquivos de configuração disponíveis
   */
  static listConfigFiles(): string[] {
    if (!this.configDirExists()) {
      return [];
    }

    return fs
      .readdirSync(this.getConfigDir())
      .filter((file) => file.endsWith(".json"));
  }

  /**
   * Lê um arquivo de configuração
   */
  static readConfig(environment: string): {
    accountSid: string;
    authToken: string;
  } {
    const configPath = this.getConfigPath(environment);

    if (!this.configExists(environment)) {
      throw new Error(
        `Nenhum arquivo de configuração encontrado para o ambiente '${environment}'.\n` +
          `💡 Use o comando: twilio-toolkit configure-env --env ${environment} --accountSid ... --authToken ...`
      );
    }

    try {
      const config = require(configPath);
      if (!config.accountSid || !config.authToken) {
        throw new Error(
          `Configuração inválida em '${configPath}'.\n` +
            `💡 Verifique se 'accountSid' e 'authToken' estão definidos corretamente.`
        );
      }
      return config;
    } catch (error) {
      throw new Error(
        `Erro ao ler o arquivo de configuração '${configPath}'.\n` +
          `💡 Verifique se o arquivo é um JSON válido.`
      );
    }
  }

  /**
   * Escreve um arquivo de configuração
   */
  static writeConfig(
    environment: string,
    accountSid: string,
    authToken: string
  ): void {
    this.ensureConfigDir();
    const configPath = this.getConfigPath(environment);
    const data = { accountSid, authToken };

    fs.writeFileSync(configPath, JSON.stringify(data, null, 2), "utf-8");
  }
}
