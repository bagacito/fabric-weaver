/**
 * @interface Executable
 * @summary Represents a contract for objects that can perform a specific action with optional arguments.
 *
 * @description
 * The `IExecutable` interface enforces the implementation of an `execute` method.
 * This method is intended to perform a defined action when called, accepting arguments
 * as needed and returning no value (`void`). Classes or objects implementing this interface
 * must define the logic for the action within their `execute` method.
 *
 */
export interface IExecutable {
  /**
   * Executes the defined action.
   *
   * @remarks
   * The `execute` method is the primary function of the `IExecutable` interface.
   * It can accept any number of arguments (`...args: any[]`) to allow flexibility
   * for different implementations and does not return any value. Implementing classes
   * or objects should define the specific behavior of the action.
   *
   * @param {...any[]} args - The arguments required for the action.
   *
   * @example
   * // Example implementation of IExecutable:
   * class PrintMessage implements IExecutable {
   *   execute(message: string): void {
   *     console.log(message);
   *   }
   * }
   *
   * const printer = new PrintMessage();
   * printer.execute("Action executed!"); // Logs: "Action executed!"
   */
  execute: (...args: any[]) => void;
}
