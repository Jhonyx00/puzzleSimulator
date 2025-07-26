/**
 * Generates the puzzle skins by creating an object containing the face index and the colors for each face.
 * 
 * @param {object} skinObject - An object containig the puzzle skin. 
 * @returns {object} The puzzle skin object containing the face index and colors for each face.
 */
const generatePuzzleSkins = (skinObject) => {
    const puzzleSkins = {};
    for (const themeName in skinObject) {
        const color = {};
        for (let i = 0; i < 6; i++) {
            color[i] = { id: i, url: `${PUZZLE_SKIN_BASE_URL}${themeName.toLowerCase()}/color_${i}.svg` };
        }
        puzzleSkins[themeName] = color;
    }
    return puzzleSkins;
}