import { Command } from "commander";
import setupEnvironment from "../config/setupEnvironment";

export default function configureEnvCommand(program: Command) {
  program
    .command("configure-env")
    .description("Cria ou atualiza um arquivo de configuração de ambiente")
    .requiredOption("--env <env>", "Nome do ambiente (ex: prd, hml)")
    .requiredOption("--accountSid <accountSid>", "SID da conta Twilio")
    .requiredOption("--authToken <authToken>", "Auth Token Twilio")
    .action((options) => {
      const { env, accountSid, authToken } = options;
      setupEnvironment(env, accountSid, authToken);
    });
}
