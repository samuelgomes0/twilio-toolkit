import { Command } from "commander";
import fetchAllActiveConversations from "../resources/Participant Conversation Resource/fetchAllActiveConversations";
import { ErrorHandler } from "../utils/errorHandler";
import { InputUtils } from "../utils/inputUtils";

export default function fetchAllActiveConversationsCommand(program: Command) {
  program
    .command("fetch-all-active-conversations")
    .description("Busca todas as conversas ativas de um participante")
    .argument("[env]", "Ambiente de configuração (ex: prd, hml)")
    .argument("[address]", "Endereço do participante (ex: WhatsApp number)")
    .option("--env <env>", "Ambiente de configuração (ex: prd, hml)")
    .option(
      "--address <address>",
      "Endereço do participante (ex: WhatsApp number)"
    )
    .action(async (envArg, addressArg, options) => {
      try {
        let env = options.env || envArg;
        let address = options.address || addressArg;

        if (!env) {
          env = await InputUtils.promptRequiredInput(
            "Ambiente não informado. Informe o ambiente (ex: prd, hml):"
          );
        }

        if (!address) {
          address = await InputUtils.promptRequiredInput(
            "Endereço do participante não informado. Informe o número (ex: WhatsApp):"
          );
        }

        await fetchAllActiveConversations(env, address);
      } catch (error) {
        ErrorHandler.handleError(
          error,
          "executar comando fetch-all-active-conversations"
        );
      }
    });
}
