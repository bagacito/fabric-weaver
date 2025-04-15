/**
 * @class BaseError
 * @summary Custom base error class for defining specific error types.
 *
 * @description
 * The `BaseError` class extends the built-in `Error` class to provide a standardized
 * way to create and handle errors with a specific type and message. It formats the error
 * message by prefixing the provided `errorType` to the `message`, allowing for better
 * categorization and debugging of errors. Additional error options can also be passed.
 *
 * @extends Error
 *
 * @param {string} errorType - The type or category of the error (e.g., "ValidationError").
 * @param {string} [message] - A detailed error message (optional).
 * @param {ErrorOptions} [options] - Additional options for the error, such as a cause (optional).
 *
 * @memberOf module:fabric-integration.Core
 *
 * @example
 * // Example usage of BaseError:
 * const error = new BaseError("ValidationError", "Invalid input provided");
 * console.error(error);
 * // Outputs: ValidationError: Invalid input provided
 *
 * @example
 * // Example with error options:
 * const cause = new Error("Invalid JSON format");
 * const error = new BaseError("ParsingError", "Failed to parse response", { cause });
 * console.error(error.cause);
 * // Outputs: Error: Invalid JSON format
 */
export class BaseError extends Error {
  constructor(errorType: string, message?: string, options?: ErrorOptions) {
    super(`${errorType}: ${message}`, options);
  }
}
