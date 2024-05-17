/**
 * Converts a camelCase or PascalCase string to SCREAMING_SNAKE_CASE.
 * @param {string} str - The input string.
 * @returns {string} - The converted SCREAMING_SNAKE_CASE string.
 */
exports.toScreamingSnakeCase = function toScreamingSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") // Insert underscore between lowercase and uppercase letters
    .toUpperCase(); // Convert the entire string to uppercase
};
