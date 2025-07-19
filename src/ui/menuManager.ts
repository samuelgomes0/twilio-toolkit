// @ts-ignore
import { terminal as term } from "terminal-kit";
import listEnvironments from "../config/listEnvironments";
import setupEnvironment from "../config/setupEnvironment";
import { ErrorHandler } from "../utils/errorHandler";
import { InputUtils } from "../utils/inputUtils";
import { TwilioResourceManager } from "../utils/twilioResourceManager";

export class MenuManager {
  private static readonly MAIN_MENU_OPTIONS = [
    "🔧 Recursos da Twilio",
    "⚙️  Configuração",
    "❌ Sair",
  ];

  static async showMainMenu(): Promise<void> {
    term.green.bold("\nBem-vindo ao Twilio Toolkit CLI!\n\n");
    term.cyan("Selecione uma categoria:\n");

    const { selectedIndex } = await new Promise<any>((resolve) => {
      term.singleColumnMenu(this.MAIN_MENU_OPTIONS, (err: any, res: any) =>
        resolve(res)
      );
    });

    await this.handleMainMenuSelection(selectedIndex);
  }

  private static async handleMainMenuSelection(
    selectedIndex: number
  ): Promise<void> {
    try {
      switch (selectedIndex) {
        case 0:
          await this.showTwilioResourcesMenu();
          break;
        case 1:
          await this.showConfigurationMenu();
          break;
        default:
          term.yellow("Saindo...\n");
          process.exit(0);
      }

      // Após executar, volta ao menu principal
      this.showMainMenu();
    } catch (error) {
      ErrorHandler.handleError(error, "processar seleção do menu principal");
    }
  }

  private static async showTwilioResourcesMenu(): Promise<void> {
    const resources = TwilioResourceManager.getResources();
    const resourceOptions = [
      ...resources.map((resource) => resource.name),
      "⬅️  Voltar ao menu principal",
    ];

    term.cyan("\n=== 🔧 RECURSOS DA TWILIO ===\n");
    const { selectedIndex } = await new Promise<any>((resolve) => {
      term.singleColumnMenu(resourceOptions, (err: any, res: any) =>
        resolve(res)
      );
    });

    if (selectedIndex === resourceOptions.length - 1) {
      return; // Volta ao menu principal
    }

    const selectedResource = resources[selectedIndex];
    await this.showResourceActionsMenu(selectedResource);
  }

  private static async showResourceActionsMenu(resource: any): Promise<void> {
    const actionOptions = [
      ...resource.actions.map((action: any) => action.name),
      "⬅️  Voltar aos recursos",
    ];

    term.cyan(`\n=== ${resource.name.toUpperCase()} ===\n`);
    term.yellow(`${resource.description}\n\n`);

    const { selectedIndex } = await new Promise<any>((resolve) => {
      term.singleColumnMenu(actionOptions, (err: any, res: any) =>
        resolve(res)
      );
    });

    if (selectedIndex === actionOptions.length - 1) {
      await this.showTwilioResourcesMenu(); // Volta aos recursos
      return;
    }

    try {
      const selectedAction = resource.actions[selectedIndex];
      await selectedAction.action();
    } catch (error) {
      ErrorHandler.handleError(
        error,
        `executar ação '${resource.actions[selectedIndex].name}'`
      );
    }
  }

  private static async showConfigurationMenu(): Promise<void> {
    const configOptions = [
      "Configurar ambiente",
      "Listar ambientes",
      "⬅️  Voltar ao menu principal",
    ];

    term.cyan("\n=== ⚙️  CONFIGURAÇÃO ===\n");
    const { selectedIndex } = await new Promise<any>((resolve) => {
      term.singleColumnMenu(configOptions, (err: any, res: any) =>
        resolve(res)
      );
    });

    switch (selectedIndex) {
      case 0:
        await this.handleConfigureEnv();
        break;
      case 1:
        await this.handleListEnvs();
        break;
      default:
        return; // Volta ao menu principal
    }
  }

  private static async handleConfigureEnv(): Promise<void> {
    const inputs = await InputUtils.promptMultipleInputs([
      { message: "Nome do ambiente (ex: prd, hml):", key: "env" },
      { message: "SID da conta Twilio:", key: "accountSid" },
      { message: "Auth Token Twilio:", key: "authToken" },
    ]);

    setupEnvironment(inputs.env, inputs.accountSid, inputs.authToken);
    term.green("✅ Ambiente configurado com sucesso!\n");
  }

  private static async handleListEnvs(): Promise<void> {
    listEnvironments();
  }
}
