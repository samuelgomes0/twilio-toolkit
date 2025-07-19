// @ts-ignore
import listEnvironments from "../config/listEnvironments";
import setupEnvironment from "../config/setupEnvironment";
import closeConversationState from "../resources/Conversation Resource/closeConversationState";
import fetchAllActiveConversations from "../resources/Participant Conversation Resource/fetchAllActiveConversations";
import { InputHelper } from "../utils/inputHelper";

export class InteractiveMenu {
  private static readonly MENU_OPTIONS = [
    "Configurar ambiente",
    "Listar ambientes",
    "Buscar conversas ativas de um participante",
    "Fechar estado de uma conversa",
    "Sair",
  ];

  static async showMainMenu(): Promise<void> {
    InputHelper.showInfo("Bem-vindo ao Twilio Toolkit CLI!");
    const { selectedIndex } = await InputHelper.promptChoice(
      "Selecione uma opção:",
      this.MENU_OPTIONS
    );
    await this.handleMenuSelection(selectedIndex);
  }

  private static async handleMenuSelection(
    selectedIndex: number
  ): Promise<void> {
    switch (selectedIndex) {
      case 0:
        await this.handleConfigureEnv();
        break;
      case 1:
        await this.handleListEnvs();
        break;
      case 2:
        await this.handleFetchAllActiveConversations();
        break;
      case 3:
        await this.handleCloseConversationState();
        break;
      default:
        InputHelper.showInfo("Saindo...");
        process.exit(0);
    }

    // Após executar, volta ao menu
    this.showMainMenu();
  }

  private static async handleConfigureEnv(): Promise<void> {
    const env = await InputHelper.promptRequiredInput(
      "Nome do ambiente (ex: prd, hml):"
    );
    const accountSid = await InputHelper.promptRequiredInput(
      "SID da conta Twilio:"
    );
    const authToken = await InputHelper.promptRequiredInput(
      "Auth Token Twilio:"
    );

    setupEnvironment(env, accountSid, authToken);
    InputHelper.showSuccess("Ambiente configurado com sucesso!");
  }

  private static async handleListEnvs(): Promise<void> {
    listEnvironments();
  }

  private static async handleFetchAllActiveConversations(): Promise<void> {
    const env = await InputHelper.promptRequiredInput(
      "Ambiente de configuração (ex: prd, hml):"
    );
    const address = await InputHelper.promptRequiredInput(
      "Endereço do participante (ex: WhatsApp number):"
    );

    await fetchAllActiveConversations(env, address);
  }

  private static async handleCloseConversationState(): Promise<void> {
    const env = await InputHelper.promptRequiredInput(
      "Ambiente de configuração (ex: prd, hml):"
    );
    const sid = await InputHelper.promptRequiredInput("SID da conversa:");

    await closeConversationState(env, sid);
  }
}
