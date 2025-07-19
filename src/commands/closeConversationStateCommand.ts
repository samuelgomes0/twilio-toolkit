import { Command } from "commander";
import closeConversationState from "../resources/Conversation Resource/closeConversationState";
import { ErrorHandler } from "../utils/errorHandler";
import { InputUtils } from "../utils/inputUtils";

export default function closeConversationStateCommand(program: Command) {
  program
    .command("close-conversation-state")
    .description("Fecha o estado de uma conversa específica")
    .argument("[env]", "Ambiente de configuração (ex: prd, hml)")
    .argument("[sid]", "SID da conversa")
    .option("--env <env>", "Ambiente de configuração (ex: prd, hml)")
    .option("--sid <sid>", "SID da conversa")
    .action(async (envArg, sidArg, options) => {
      try {
        let env = options.env || envArg;
        let sid = options.sid || sidArg;

        if (!env) {
          env = await InputUtils.promptRequiredInput(
            "Ambiente não informado. Informe o ambiente (ex: prd, hml):"
          );
        }

        if (!sid) {
          sid = await InputUtils.promptRequiredInput(
            "SID da conversa não informado. Informe o SID:"
          );
        }

        await closeConversationState(env, sid);
      } catch (error) {
        ErrorHandler.handleError(
          error,
          "executar comando close-conversation-state"
        );
      }
    });
}
