/**
 * Utilitário para tratamento padronizado de erros
 */
export class ErrorHandler {
  /**
   * Trata erros de forma padronizada e sai do processo
   */
  static handleError(error: any, context: string): never {
    console.error(`❌ Erro em ${context}:`, error);
    process.exit(1);
  }

  /**
   * Trata erros de configuração
   */
  static handleConfigError(error: Error): never {
    console.error("❌ Erro de configuração:", error.message);
    process.exit(1);
  }

  /**
   * Trata erros de operação da API
   */
  static handleApiError(error: any, operation: string): never {
    console.error(`❌ Erro ao ${operation}:`, error);
    process.exit(1);
  }

  /**
   * Trata erros de validação
   */
  static handleValidationError(message: string): never {
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}
