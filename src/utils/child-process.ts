import { execSync, ExecSyncOptionsWithBufferEncoding } from "child_process";
import { getLogger } from "./logger";

/**
 * @summary Executes a shell command synchronously.
 *
 * @description
 * This function runs a shell command with optional execution options and environment variables.
 * It overrides the current process environment variables with those provided in `_env` and logs
 * the execution details. If the command fails, it logs the error and throws an exception.
 *
 * @param {string} command - The shell command to execute. Ensure the command is properly formatted for the target system.
 * @param {ExecSyncOptionsWithBufferEncoding} [opts={}] - Optional execution options to customize the behavior
 * of the `execSync` function. Defaults to an empty object. Common options include:
 *   - `cwd`: Current working directory of the command.
 *   - `env`: Environment key-value pairs for the execution.
 *   - `stdio`: Standard I/O behavior (e.g., `inherit`, `pipe`, etc.).
 * @param {Record<string, any>} [_env={}] - A key-value object representing environment variables to override
 * in the current process environment. These variables will temporarily replace existing ones.
 *
 * @memberOf module:fabric-integration.Utils
 *
 * @returns {Buffer} - A buffer containing the standard output from the executed command.
 * If the `stdio` option is set to `"inherit"`, the output will be printed directly to the console.
 *
 * @throws {Error} - Throws an error if the command execution fails. Logs the error details and the current
 * environment variables at the time of failure.
 *
 * @example
 * // Run a simple shell command
 * const result = runCommand('ls -al', { stdio: 'pipe' }, { CUSTOM_ENV: 'value' });
 * console.log(result.toString());
 *
 * @example
 * // Run a command with custom working directory
 * runCommand('npm install', { cwd: '/path/to/project' });
 */
export function runCommand(
  command: string,
  opts: ExecSyncOptionsWithBufferEncoding = {},
  _env: Record<string, any> = {}
): Buffer {
  Object.assign(process.env, { ..._env });
  getLogger().debug.call(
    runCommand,
    `Overriding the following Environment Variables: \n>`,
    _env ? _env : "No Variables Changed!"
  );

  try {
    getLogger().info.call(
      runCommand,
      `Running command: \n>`,
      command.replace(/\s+/g, " ")
    );

    const options: ExecSyncOptionsWithBufferEncoding = Object.assign(
      {},
      { stdio: "inherit" },
      opts
    );

    return execSync(command, options);
  } catch (e: any) {
    getLogger().error.call(
      runCommand,
      `Error running command: \n>`,
      command.replace(/\s+/g, " ")
    );
    getLogger().debug.call(runCommand, `Environment: \n`, process.env);
    throw e;
  }
}
