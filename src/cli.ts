#!/usr/bin/env node

import { CommandManager } from "./cli/commandManager";
import { InteractiveMenu } from "./ui/interactiveMenu";

async function main(): Promise<void> {
  // Se argumentos foram passados, usa o modo CLI
  if (process.argv.length > 2) {
    const commandManager = new CommandManager();
    await commandManager.parse();
  } else {
    // Caso contrário, inicia o menu interativo
    await InteractiveMenu.showMainMenu();
  }
}

// Tratamento de erros global
process.on("unhandledRejection", (reason, promise) => {
  console.error("Erro não tratado:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Exceção não capturada:", error);
  process.exit(1);
});

main().catch((error) => {
  console.error("Erro na aplicação:", error);
  process.exit(1);
});
