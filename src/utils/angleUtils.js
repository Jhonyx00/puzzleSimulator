
/**
 * Normalizes an angle to be within the range of 0 to 360 degrees.
 * 
 * @param {number} angle - The input angle in degrees.
 * @returns {number} Te normalized angle in degrees.
 */
const normalizeAngle = (angle) => {
    return ((angle % ANGLES.FULL) + ANGLES.FULL) % ANGLES.FULL;
}