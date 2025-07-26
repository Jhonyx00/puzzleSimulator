/**
 * Converts a decimal number into a percentage.
 * The result is rounded to the nearest whole percentage.
 * 
 * @param {number} number - The decimal number to convert.
 * @returns {number} The number represented as a percentage string.
 */
const toPercentage = (number) => {
    return `${Math.round(number * 100)}%`;
}