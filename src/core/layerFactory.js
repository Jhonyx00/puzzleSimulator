/**
 * Creates all 9 layers of the puzzle given the puzzle data object containing 27 puzzle pieces.
 * 
 * @param {number} n - Puzzle size
 * @param {object} puzzleData - Puzzle data object
 * @returns {object} An object containing R,U,F,B,L,R,M,E,S layers represented by a 3x3 matix.
 */
const createPuzzleLayers = (n, puzzleData) => {
    const createEmptyLayer = () => {
        const layers = {};
        for (const key of Object.keys(PUZZLE_CW_MOVES)) { layers[key] = [[], [], []] }
        return layers;
    }

    const layers = createEmptyLayer();

    const insertKeyToLayerArray = (layer, key) => {
        const rows = {};
        for (let i = 0; i < n; i++) { rows[i] = layers[layer][i] }

        if (layer === "R" || layer === "M" || layer === "B") {
            if (rows[0].length < n) { rows[0].unshift(key); }
            else if (rows[1].length < n) { rows[1].unshift(key); }
            else if (rows[2].length < n) { rows[2].unshift(key); }
        }
        else {
            if (layer === "D") { // reverse
                if (rows[2].length < n) { rows[2].push(key); }
                else if (rows[1].length < n) { rows[1].push(key); }
                else if (rows[0].length < n) { rows[0].push(key); }
            }
            else {
                if (rows[0].length < n) { rows[0].push(key); }
                else if (rows[1].length < n) { rows[1].push(key); }
                else if (rows[2].length < n) { rows[2].push(key); }
            }
        }
    }

    for (const [id, cubePiece] of Object.entries(puzzleData)) {
        const { x, y, z } = cubePiece.transform;
        const key = Number(id);

        if (x > 0) { insertKeyToLayerArray("R", key) }
        if (y < 0) { insertKeyToLayerArray("U", key) }
        if (z < 0) { insertKeyToLayerArray("B", key) }
        if (x < 0) { insertKeyToLayerArray("L", key) }
        if (y > 0) { insertKeyToLayerArray("D", key) }
        if (z > 0) { insertKeyToLayerArray("F", key) }
        if (x === 0) { insertKeyToLayerArray("M", key) }
        if (y === 0) { insertKeyToLayerArray("E", key) }
        if (z === 0) { insertKeyToLayerArray("S", key) }
    }

    return layers;
}