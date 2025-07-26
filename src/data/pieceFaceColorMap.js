/**
 * @typedef {object} FaceMapping
 * @property {number} originalFaceIndex - The index of the original face.
 * @property {number} newFaceIndex - The index of the face it moves to after the ortation.
 */

/**
 * Maps the transformation of piece face colors after specific layer rotations.
 * 
 * The face indices correspond to:
 * 0 - Front
 * 1 - Top
 * 2 - Right
 * 3 - Back
 * 4 - Left
 * 5 - Bottom
 * 
 * @constant {Object<string, Object<number, number>>} PIECE_FACE_COLOR_MAP
 */
const PIECE_FACE_COLOR_MAP = {
    //CW
    "M": { 0: 5, 1: 0, 3: 1, 5: 3, },
    "E": { 0: 2, 2: 3, 3: 4, 4: 0, },
    "S": { 1: 4, 2: 1, 4: 5, 5: 2, },
    "U": { 0: 2, 1: 1, 3: 4, 4: 0, 2: 3, },
    "F": { 0: 0, 1: 4, 2: 1, 4: 5, 5: 2, },
    "L": { 0: 1, 1: 3, 3: 5, 4: 4, 5: 0, },
    "B": { 1: 2, 3: 3, 2: 5, 4: 1, 5: 4, },
    "R": { 0: 5, 1: 0, 2: 2, 3: 1, 5: 3, },
    "D": { 0: 4, 2: 0, 3: 2, 4: 3, 5: 5, },

    // CCW
    "M'": { 0: 1, 1: 3, 3: 5, 5: 0, },
    "E'": { 0: 4, 2: 0, 3: 2, 4: 3, },
    "S'": { 1: 2, 2: 5, 4: 1, 5: 4, },
    "U'": { 0: 4, 1: 1, 3: 2, 4: 3, 2: 0, },
    "F'": { 0: 0, 1: 2, 2: 5, 4: 1, 5: 4, },
    "L'": { 0: 5, 1: 0, 3: 1, 4: 4, 5: 3, },
    "B'": { 1: 4, 3: 3, 2: 1, 4: 5, 5: 2, },
    "R'": { 0: 1, 1: 3, 2: 2, 3: 5, 5: 0, },
    "D'": { 0: 2, 2: 3, 3: 4, 4: 0, 5: 5, },
}