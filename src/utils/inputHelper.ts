// @ts-ignore
import { terminal as term } from "terminal-kit";

export class InputHelper {
  static async promptInput(message: string): Promise<string> {
    term.yellow(message + "\n");
    return new Promise<string>((resolve) => {
      term.inputField((err: any, input: any) => resolve(input || ""));
    });
  }

  static async promptRequiredInput(
    message: string,
    errorMessage?: string
  ): Promise<string> {
    let input = await this.promptInput(message);

    while (!input.trim()) {
      term.red((errorMessage || "Campo obrigatório. Tente novamente:") + "\n");
      input = await this.promptInput(message);
    }

    return input.trim();
  }

  static async promptChoice<T>(
    message: string,
    choices: T[]
  ): Promise<{ selectedIndex: number; selectedText: T }> {
    term.cyan(message + "\n");
    return new Promise<any>((resolve) => {
      term.singleColumnMenu(choices as any[], (err: any, res: any) =>
        resolve(res)
      );
    });
  }

  static showError(message: string): void {
    term.red("❌ " + message + "\n");
  }

  static showSuccess(message: string): void {
    term.green("✅ " + message + "\n");
  }

  static showInfo(message: string): void {
    term.cyan(message + "\n");
  }

  static showWarning(message: string): void {
    term.yellow("⚠️ " + message + "\n");
  }
}
