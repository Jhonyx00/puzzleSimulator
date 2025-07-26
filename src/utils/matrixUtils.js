/**
 * Rotates a squared 2D array either clockwise or counter-clockwise.
 * 
 * @param {Array<Array<number>>} array - The input square 2D array to be rotated. 
 * @param {boolean} isClockWise - If "true" the matrix will be rotated 90 degrees clockwise., if "false" it will be rotated 90 degrees counter-clockwise.
 * @returns {Array<Array<number>>} An new 2D array representing the rortated matrix.
 */
const getRotatedMatrix = (array, isClockWise) => {
    const rotatedMatrix = [];
    if (isClockWise) {
        for (let i = 0; i < array.length; i++) {
            const auxRow = [];
            for (let j = array.length - 1; j >= 0; j--) {
                auxRow.push(array[j][i]);
            }
            rotatedMatrix.push(auxRow);
        }
    }
    else {
        for (let i = 0; i < array.length; i++) {
            const auxRow = [];
            for (let j = 0; j < array.length; j++) {
                auxRow.push(array[j][i]);
            }
            rotatedMatrix.unshift(auxRow);
        }
    }
    return rotatedMatrix;
}