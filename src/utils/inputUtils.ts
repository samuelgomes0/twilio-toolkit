// @ts-ignore
import { terminal as term } from "terminal-kit";

/**
 * Utilitário para capturar inputs do usuário via terminal
 */
export class InputUtils {
  /**
   * Captura um input do usuário com uma mensagem específica
   */
  static async promptInput(message: string): Promise<string> {
    term.yellow(message + "\n");
    return new Promise<string>((resolve) => {
      term.inputField((err: any, input: any) => resolve(input || ""));
    });
  }

  /**
   * Captura um input obrigatório, repetindo até que seja fornecido
   */
  static async promptRequiredInput(
    message: string,
    errorMessage?: string
  ): Promise<string> {
    let input = "";
    while (!input.trim()) {
      input = await this.promptInput(message);
      if (!input.trim()) {
        term.red(errorMessage || "❌ Este campo é obrigatório.\n");
      }
    }
    return input.trim();
  }

  /**
   * Captura múltiplos inputs obrigatórios
   */
  static async promptMultipleInputs(
    prompts: { message: string; key: string }[]
  ): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    for (const prompt of prompts) {
      result[prompt.key] = await this.promptRequiredInput(prompt.message);
    }

    return result;
  }
}
