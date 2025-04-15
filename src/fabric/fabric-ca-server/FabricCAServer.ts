import { IExecutable } from "../../core/interfaces/IExecutable";
import { runCommand } from "../../utils/child-process";
import { getLogger } from "../../utils/logger";

/**
 * @summary Fabric CA Server
 * @description Wraps all the functionality from the Fabric CA server CLi
 *
 * @property{string} command
 *
 * @class FabricCAServer
 *
 * @category Fabric
 */
export class FabricCAServer implements IExecutable {
  private command: string;

  constructor(command: string) {
    this.command = command;
  }

  execute() {
    try {
      getLogger().info("Running command: " + this.command);
      runCommand(this.command);
    } catch (e: any) {
      getLogger().error(e);
      process.exit(1);
    }
  }
}
