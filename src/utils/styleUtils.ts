import { MethodType } from "@wysiwyg";

/**
 * Generates object options based on a simple color style map and method type.
 *
 * @param {object} simpleColorStyleMap - The simple color style map.
 * @param {MethodType} method - The method type.
 * @return {Array} An array of object options.
 */
export function generateObjectOptions(
  simpleColorStyleMap: object,
  method: MethodType,
) {
  return Object.keys(simpleColorStyleMap).map((colorKey) => ({
    label: colorKey.charAt(0).toUpperCase() + colorKey.slice(1),
    style: colorKey,
    method: method,
  }));
}
