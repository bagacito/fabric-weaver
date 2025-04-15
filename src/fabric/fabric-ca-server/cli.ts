import { Command } from "commander";
import { addFabricToPath } from "../../utils/path";
import { VERSION } from "../../index";

//TODO: Create cli for fabric ca server

const program: Command = new Command();

program
  .name("fabric-ca-server")
  .description("CLI for Fabric CA Server")
  .version(VERSION)
  .hook("preAction", () => {
    addFabricToPath();
  });

program.parse(process.argv);
