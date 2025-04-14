/**
 * @summary The `IBuilder` interface defines a contract for building or constructing an object of type `T`.
 * It provides a method `build` that takes any number of arguments and returns either a value of type `T`
 * or a promise that resolves to type `T`.
 *
 * @interface IBuilder
 *
 * @memberOf module:fabric-integration.Core
 * @template T - The type of the object that the builder constructs.
 */
export interface IBuilder<T> {
  /**
   * Builds or constructs an object of type `T`.
   *
   * This method accepts any number of arguments (`...args`) and returns either a direct result of type `T`
   * or a promise that resolves to type `T`. The exact implementation of the method depends on the concrete
   * builder class that implements this interface.
   *
   * @param {...any[]} args - The arguments that will be used to construct the object of type `T`.
   *
   * @returns {T | Promise<T>} - Returns either the constructed object of type `T` or a promise that resolves
   *                              to the constructed object of type `T`.
   *
   * @example
   * // Example usage of IBuilder:
   * class ConcreteBuilder implements IBuilder<MyClass> {
   *   build(name: string, age: number): MyClass {
   *     return new MyClass(name, age); // Constructs an instance of MyClass
   *   }
   * }
   *
   * const builder = new ConcreteBuilder();
   * const myObject = builder.build("Alice", 30);
   * console.log(myObject); // MyClass { name: 'Alice', age: 30 }
   */
  build(...args: any[]): T | Promise<T>;
}
