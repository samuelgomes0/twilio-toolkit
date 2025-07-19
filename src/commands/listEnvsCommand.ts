import { Command } from "commander";
import listEnvironments from "../config/listEnvironments";

export default function listEnvsCommand(program: Command) {
  program
    .command("list-envs")
    .description("Lista todos os ambientes configurados")
    .action(() => {
      listEnvironments();
    });
}
