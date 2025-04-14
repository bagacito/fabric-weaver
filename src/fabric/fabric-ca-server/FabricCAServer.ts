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
export class FabricCAServer {
  private command: string;

  constructor(command: string) {
    this.command = command;
  }
}
