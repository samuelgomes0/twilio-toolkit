import { Command } from "commander";
import closeConversationStateCommand from "../commands/closeConversationStateCommand";
import configureEnvCommand from "../commands/configureEnvCommand";
import fetchAllActiveConversationsCommand from "../commands/fetchAllActiveConversationsCommand";
import listEnvsCommand from "../commands/listEnvsCommand";

export class CommandManager {
  private program: Command;

  constructor() {
    this.program = new Command();
    this.setupProgram();
    this.registerCommands();
  }

  private setupProgram(): void {
    this.program
      .name("twilio-toolkit")
      .description("Utilitários CLI para gerenciar conversas na Twilio")
      .version("1.0.0");
  }

  private registerCommands(): void {
    configureEnvCommand(this.program);
    listEnvsCommand(this.program);
    fetchAllActiveConversationsCommand(this.program);
    closeConversationStateCommand(this.program);
  }

  public getProgram(): Command {
    return this.program;
  }

  public async parse(): Promise<void> {
    await this.program.parseAsync(process.argv);
  }
}
