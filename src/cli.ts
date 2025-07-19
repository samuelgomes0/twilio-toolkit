#!/usr/bin/env node

import { CommandManager } from "./cli/commandManager";
import { MenuManager } from "./ui/menuManager";

async function main(): Promise<void> {
  if (process.argv.length > 2) {
    const commandManager = new CommandManager();
    await commandManager.parse();
  } else {
    await MenuManager.showMainMenu();
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
