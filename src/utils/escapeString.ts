/**
 * escaping string before putting into `new RegExp()`
 * so that input characters such as \.*? etc are not treated as special characters
 * @param text input string
 * @returns escaped string
 */
export const escapeStringForRegex = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\^/g, '\\^')
    .replace(/\$/g, '\\$')
    .replace(/\*/g, '\\*')
    .replace(/\+/g, '\\+')
    .replace(/\?/g, '\\?')
    .replace(/\./g, '\\.')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\|/g, '\\|')
    .replace(/ /g, '\\s');
};
