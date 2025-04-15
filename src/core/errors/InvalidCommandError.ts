import { BaseError } from "./BaseError";

/**
 * @class InvalidCommandError
 * @summary Represents an error thrown when an invalid command is encountered.
 *
 * @description
 * The `InvalidCommandError` class is a specialized error that extends the `BaseError` class.
 * It is intended to be used when a command provided to the system is invalid or cannot be processed.
 * The error message is prefixed with the error type (`InvalidCommandError`) for easier identification.
 *
 * @extends BaseError
 *
 * @param {string} [message] - A detailed error message describing the invalid command (optional).
 * @param {ErrorOptions} [options] - Additional error options, such as a cause or other metadata (optional).
 *
 * @memberOf module:fabric-integration.Core
 *
 * @example
 * // Example usage of InvalidCommandError:
 * throw new InvalidCommandError("The command 'invalid-command' is not recognized.");
 * // Throws: InvalidCommandError: The command 'invalid-command' is not recognized.
 *
 * @example
 * // Example with error options:
 * const cause = new Error("Command parsing failed");
 * throw new InvalidCommandError("Failed to execute command", { cause });
 * // Throws: InvalidCommandError: Failed to execute command
 * // The `cause` can be accessed as error.cause.
 */
export class InvalidCommandError extends BaseError {
  constructor(message?: string, options?: ErrorOptions) {
    super(InvalidCommandError.name, `${message}`, options);
  }
}
