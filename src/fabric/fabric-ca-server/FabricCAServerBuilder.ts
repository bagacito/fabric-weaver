import { FabricCaServerConfig } from "../../core/interfaces/configs/FabricCAServerConfig";
import { FabricCAServerCommand } from "../../core/constants/FabricCAServerCommand";
import { FabricCAServerFlags } from "../../core/constants/FabricCAServerFlags";
import { InvalidCommandError } from "../../core/errors/InvalidCommandError";
import { IBuilder } from "../../core/interfaces/IBuilder";
import { FabricCAServer } from "./FabricCAServer";
import * as path from "path";
import { readFileYaml } from "../../utils/yaml";
import { FabricBinaries } from "../../core/constants/FabricBinaries";

/**
 * @description
 * A fluent builder for constructing `fabric-ca-server` CLI commands.
 *
 * @summary
 * This class enables developers to construct valid `fabric-ca-server` command-line invocations
 * using a strongly-typed, fluent API. Options are managed internally and automatically translated
 * into CLI-compatible format on `build()`. Commonly used options like address, port, TLS, and bootstrap
 * credentials are supported.
 *
 * @param command {FabricCAServerCommand} The CLI command to initialize the builder with.
 *
 * @class
 */
export class FabricCAServerBuilder implements IBuilder<FabricCAServer> {
  /**
   * @description
   * The CLI command (e.g., `start`, `init`) to be executed by `fabric-ca-server`.
   *
   * @summary
   * Determines which command this builder is targeting. It is set at initialization but can be changed.
   */
  private command: FabricCAServerCommand = FabricCAServerCommand.HELP;

  /**
   * @description
   * A map storing CLI flags and their corresponding values.
   *
   * @summary
   * Each flag (as a string, from the `FabricCAServerOption` enum) is mapped to its value,
   * allowing `build()` to serialize them into a valid CLI format.
   */
  private options: Map<string, any> = new Map<string, any>();

  /**
   * @summary Builder class for the FabricCAServer
   *
   * @private
   * @class FabricCAServerBuilder
   * @implements IBuilder
   *
   * @category Fabric
   */
  private config: FabricCaServerConfig = readFileYaml<FabricCaServerConfig>(
    path.join(__dirname, "../../configs/fabric-ca-server-config.yaml")
  );

  /**
   * @description
   * Sets the base command for the builder. This is the main action (e.g., "enroll", "register", etc.)
   * that the CLI will perform.
   *
   * @summary sets the builder with a primary fabric-ca-client command.
   *
   * @param command {FabricCAServerCommand} The name of the command to initialize (e.g., "enroll").
   * @return {this} Returns the current builder instance.
   */
  setCommand(command: FabricCAServerCommand): this {
    this.command = command;
    return this;
  }

  /**
   * @description
   * Sets the listening address for the CA server.
   *
   * @summary
   * Adds the `--address` flag to the CLI arguments with the provided IP address or hostname.
   *
   * @param address {string} The address the server should bind to.
   * @return {this} Returns the current builder instance.
   */
  setAddress(address?: string): this {
    if (!address) return this;

    this.options.set(FabricCAServerFlags.ADDRESS, address);
    //TODO: ADD TO CONFIG
    // this.config.
    return this;
  }

  /**
   * @description
   * Sets the bootstrap admin credentials in `user:pass` format.
   *
   * @summary
   * Adds the `--boot` flag to initialize the admin account when bootstrapping the CA server.
   *
   * @param bootstrapAdmin {string} Admin credentials in "username:password" format.
   * @return {this} Returns the current builder instance.
   */
  setBootstrapAdmin(bootstrapAdmin?: string): this {
    if (!bootstrapAdmin) return this;

    this.options.set(FabricCAServerFlags.BOOT, bootstrapAdmin);

    const [user, password] = bootstrapAdmin.split(":");

    this.config.registry!.identities = [
      {
        name: user,
        pass: password,
        type: "client",
        affiliation: "",
        attrs: {
          "hf.Registrar.Roles": "*",
          "hf.Registrar.DelegateRoles": "*",
          "hf.Revoker": true,
          "hf.IntermediateCA": true,
          "hf.GenCRL": true,
          "hf.Registrar.Attributes": "*",
          "hf.AffiliationMgr": true,
        },
      },
    ];

    return this;
  }

  /**
   * @description
   * Sets the certificate authority's name.
   *
   * @summary
   * Adds the `--ca.name` flag to identify this CA instance.
   *
   * @param caName {string} The name assigned to the certificate authority.
   * @return {this} Returns the current builder instance.
   */
  setCAName(caName?: string): this {
    if (!caName) return this;

    this.options.set(FabricCAServerFlags.CA_NAME, caName);

    this.config.ca!.name = caName;

    return this;
  }

  /**
   * @description
   * Enables debug logging mode.
   *
   * @summary
   * Adds the `--debug` flag which increases log verbosity to assist in debugging.
   *
   * @param debug {boolean} Whether to enable debug logs.
   * @return {this} Returns the current builder instance.
   */
  setDebug(debug?: boolean): this {
    if (!debug) return this;

    this.options.set(FabricCAServerFlags.DEBUG, debug);

    this.config.debug = debug;

    return this;
  }

  /**
   * @description
   * Sets the server's home directory path.
   *
   * @summary
   * Adds the `--home` flag specifying where to store configuration and state files.
   *
   * @param home {string} Absolute or relative path to the CA server’s home directory.
   * @return {this} Returns the current builder instance.
   */
  setHome(home?: string): this {
    if (!home) return this;

    this.options.set(FabricCAServerFlags.HOME, home);

    //TODO: DEFINE ENV VARIABLE

    return this;
  }

  /**
   * @description
   * Sets the server port.
   *
   * @summary
   * Adds the `--port` flag to determine which port the CA server listens on.
   *
   * @param port {number} Port number (e.g., 7054).
   * @return {this} Returns the current builder instance.
   */
  setPort(port?: number): this {
    if (!port) return this;

    this.options.set(FabricCAServerFlags.PORT, port);

    this.config.port = port;

    return this;
  }

  /**
   * @description
   * Enables TLS mode with specified cert and key files.
   *
   * @summary
   * Adds the `--tls.enabled`, `--tls.certfile`, and `--tls.keyfile` flags to secure the server
   * using TLS. Enables encrypted communications and secure authentication.
   *
   * @param certFile {string} Path to the PEM-encoded TLS certificate.
   * @param keyFile {string} Path to the PEM-encoded TLS private key.
   * @return {this} Returns the current builder instance.
   *
   * @mermaid
   * sequenceDiagram
   *   participant Builder
   *   participant CLIOptions
   *   Builder->>CLIOptions: Set --tls.enabled = true
   *   Builder->>CLIOptions: Set --tls.certfile = certFile
   *   Builder->>CLIOptions: Set --tls.keyfile = keyFile
   *   CLIOptions-->>Builder: Return updated options map
   *   Builder-->>Builder: Return this
   */
  enableTLS(certFile?: string, keyFile?: string): this {
    if (!certFile || !keyFile) return this;

    this.options.set(FabricCAServerFlags.TLS_ENABLED, true);
    this.options.set(FabricCAServerFlags.TLS_CERTFILE, certFile);
    this.options.set(FabricCAServerFlags.TLS_KEYFILE, keyFile);

    this.config.tls!.enabled = true;
    this.config.tls!.certfile = certFile;
    this.config.tls!.keyfile = keyFile;

    return this;
  }

  /**
   * @description
   * Builds the full `fabric-ca-server` CLI command string.
   *
   * @summary
   * Combines the command and all previously set options into a string ready for CLI execution.
   * Flags with boolean `true` are rendered without a value, while others are serialized with their assigned values.
   *
   * @return {string} The complete CLI command string.
   *
   * @mermaid
   * sequenceDiagram
   *   participant Builder
   *   participant OptionMap
   *   Builder->>OptionMap: Iterate over all key-value pairs
   *   loop each option
   *     OptionMap-->>Builder: Append "--flag value" to command string
   *   end
   *   Builder-->>Builder: Return command string
   */
  build(): FabricCAServer {
    if (!this.command)
      throw new InvalidCommandError("No command was provided!");

    let commandStr = `${FabricBinaries.SERVER} ${this.command}`;
    this.options.forEach((value, key) => {
      commandStr += ` ${key} ${value}`;
    });

    return new FabricCAServer(commandStr);
  }
}
