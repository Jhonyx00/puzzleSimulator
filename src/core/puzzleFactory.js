/**
 * Creates a 3x3x3 cube data structure containing all 27 cube pieces.
 * Each cubelet is represented as an object with its own transform (position), dimension (size),
 * and the colors for each face.
 * The full structure is returned as a single object for later use in rendering and layer creation.
 * 
 * @param {number} n - Level.
 * @param {number} size - The size of the puzzle (3x3x3).
 * @param {object} skin - An object containing the puzzle's initial skin.
 * @returns {object} An object containing the 27 cube pieces.
 */
const createPuzzleData = (n, size, skin) => {
    const puzzleData = {};
    let pieceCount = (n * n * n) - 1;
    const indexToAxis = { 1: -1, 2: 0, 3: 1 };
    const dimension = { width: size, height: size, depth: size };
    for (let y = n; y > 0; y--) {
        for (let z = n; z > 0; z--) {
            for (let x = n; x > 0; x--) {
                const colors = {};
                if (indexToAxis[x] < 0) { colors[4] = skin[4]; } // red
                if (indexToAxis[y] < 0) { colors[1] = skin[1]; } // white
                if (indexToAxis[z] < 0) { colors[3] = skin[3]; } // green
                if (indexToAxis[z] > 0) { colors[0] = skin[0]; } // blue
                if (indexToAxis[x] > 0) { colors[2] = skin[2]; } // orange
                if (indexToAxis[y] > 0) { colors[5] = skin[5]; } // yellow

                const posX = indexToAxis[x] * size;
                const posY = indexToAxis[y] * size;
                const posZ = indexToAxis[z] * size;

                puzzleData[pieceCount] = {
                    colors: colors,
                    dimension: dimension,
                    transform: { x: posX, y: posY, z: posZ },
                };
                pieceCount--;
            }
        }
    }
    return puzzleData;
}