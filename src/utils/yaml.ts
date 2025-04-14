import * as fs from "fs";
import * as yaml from "js-yaml";
import { getLogger } from "./logger";

/**
 * @summary Reads a YAML file, parses it, and optionally returns a specific property based on the provided path.
 *
 * @description This function reads a YAML file from the provided file path and returns either the entire parsed YAML object
 * or a specific property specified by a dot-notated path string.
 *
 * If the path is not provided, the function will return the entire parsed YAML file.
 * If the path is provided and the property exists, the value of that property will be returned.
 * If the property doesn't exist, an error will be logged.
 *
 * @param {string} yamlFilePath - The path to the YAML file to be read.
 * @param {string} [variable] - Optional. A dot-notated path string that specifies the property to retrieve from the parsed YAML.
 *
 * @memberOf module:fabric-integration.Utils
 *
 * @returns {Record<string, any> | T} - Returns the entire parsed YAML object if no `variable` is provided,
 *                                     or the value of the specified property if `variable` is provided.
 *
 * @example
 * // Example 1: Read the entire YAML file
 * const config = readFileYaml("config/settings.yaml");
 * console.log(config);
 *
 * @example
 * // Example 2: Retrieve a specific property from the YAML file
 * const dbHost = readFileYaml("config/settings.yaml", "database.host");
 * console.log(dbHost);
 *
 * @example
 * // Example 3: Handle an error if the property does not exist
 * const invalidProperty = readFileYaml("config/settings.yaml", "server.port");
 */
export function readFileYaml<T>(
  yamlFilePath: string,
  variable?: string
): Record<string, any> | T {
  const content = fs.readFileSync(yamlFilePath, "utf8");
  const parsedYAML = yaml.load(content) as Record<string, any>;

  if (!variable) return parsedYAML;

  const variablePath = variable.split(".");
  return variablePath.reduce((acc, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!acc.hasOwnProperty(key)) {
      // Log an error if the property does not exist in the YAML structure
      return getLogger().error.call(
        readFileYaml,
        `Unable to locate a property named '${key}' from path '${variable}' in file: \n> ${yamlFilePath}`
      );
    }
    return typeof acc[key] === "string" ? acc[key].trim() : acc[key];
  }, parsedYAML);
}
