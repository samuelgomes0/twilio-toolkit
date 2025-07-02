#!/usr/bin/env node

import { Command } from "commander";
import closeConversationState from "./Conversation Resource/closeConversationState";
import fetchAllActiveConversations from "./Participant Conversation Resource/fetchAllActiveConversations";
import listEnvironments from "./config/listEnvironments";
import setupEnvironment from "./config/setupEnvironment";

const program = new Command();

program
  .name("twilio-toolkit")
  .description("Utilitários CLI para gerenciar conversas na Twilio")
  .version("1.0.0");

// =============================================
// CONFIGURE ENV
// =============================================
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

// =============================================
// LIST ENVS
// =============================================
program
  .command("list-envs")
  .description("Lista todos os ambientes configurados")
  .action(() => {
    listEnvironments();
  });

// =============================================
// FETCH ALL ACTIVE CONVERSATIONS
// =============================================
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
    const env = options.env || envArg;
    const address = options.address || addressArg;

    if (!env || !address) {
      console.error("❌ É necessário fornecer 'env' e 'address'.");
      process.exit(1);
    }

    await fetchAllActiveConversations(env, address);
  });

// =============================================
// CLOSE CONVERSATION STATE
// =============================================
program
  .command("close-conversation-state")
  .description("Fecha o estado de uma conversa específica")
  .argument("[env]", "Ambiente de configuração (ex: prd, hml)")
  .argument("[sid]", "SID da conversa")
  .option("--env <env>", "Ambiente de configuração (ex: prd, hml)")
  .option("--sid <sid>", "SID da conversa")
  .action(async (envArg, sidArg, options) => {
    const env = options.env || envArg;
    const sid = options.sid || sidArg;

    if (!env || !sid) {
      console.error("❌ É necessário fornecer 'env' e 'sid'.");
      process.exit(1);
    }

    await closeConversationState(env, sid);
  });

// =============================================
// EXECUTA O PARSER
// =============================================
program.parseAsync(process.argv);
