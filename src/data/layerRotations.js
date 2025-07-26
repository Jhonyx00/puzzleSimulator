/**
 * @typedef {object} LayerRotationConfig
 * @property {string} notation - The standard cube notation for this move.
 * @property {Array<Array<number>>} layer - A 2D array representing the specific layer of pieces affected for the specified rotation.
 * @property {number} angle - The angle of rotation in degrees for the specified rotation.
 * @property {string} axis - The axis around which the layer rotates. 
 * 
 * Defines a comprehensive set of cube layer rotations.
 * Each key represents a specific move notation, and its value is a configuration object detailing the layer affected, rotation angle and axis of rotation. 
 * 
 * @constant {Object<string, LayerRotationConfig>} LAYER_ROTATIONS
 */
const LAYER_ROTATIONS = {
    "U": {
        notation: "U",
        layer: LAYERS.U,
        angle: -ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "U'": {
        notation: "U'",
        layer: LAYERS.U,
        angle: ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "R": {
        notation: "R",
        layer: LAYERS.R,
        angle: ANGLES.QUARTER,
        axis: AXES.X,
    },
    "R'": {
        notation: "R'",
        layer: LAYERS.R,
        angle: -ANGLES.QUARTER,
        axis: AXES.X,
    },
    "F": {
        notation: "F",
        layer: LAYERS.F,
        angle: ANGLES.QUARTER,
        axis: AXES.Z,
    },
    "F'": {
        notation: "F'",
        layer: LAYERS.F,
        angle: -ANGLES.QUARTER,
        axis: AXES.Z,
    },
    "L": {
        notation: "L",
        layer: LAYERS.L,
        angle: -ANGLES.QUARTER,
        axis: AXES.X,
    },
    "L'": {
        notation: "L'",
        layer: LAYERS.L,
        angle: ANGLES.QUARTER,
        axis: AXES.X,
    },
    "D": {
        notation: "D",
        layer: LAYERS.D,
        angle: ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "D'": {
        notation: "D'",
        layer: LAYERS.D,
        angle: -ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "B": {
        notation: "B",
        layer: LAYERS.B,
        angle: -ANGLES.QUARTER,
        axis: AXES.Z,
    },
    "B'": {
        notation: "B'",
        layer: LAYERS.B,
        angle: ANGLES.QUARTER,
        axis: AXES.Z,
    },
    "M'": {
        notation: "M",
        layer: LAYERS.M,
        angle: ANGLES.QUARTER,
        axis: AXES.X,
    },
    "M": {
        notation: "M'",
        layer: LAYERS.M,
        angle: -ANGLES.QUARTER,
        axis: AXES.X,
    },
    "E'": {
        notation: "E",
        layer: LAYERS.E,
        angle: -ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "E": {
        notation: "E'",
        layer: LAYERS.E,
        angle: ANGLES.QUARTER,
        axis: AXES.Y,
    },
    "S": {
        notation: "S",
        layer: LAYERS.S,
        angle: ANGLES.QUARTER,
        axis: AXES.Z,
    },
    "S'": {
        notation: "S'",
        layer: LAYERS.S,
        angle: -ANGLES.QUARTER,
        axis: AXES.Z,
    }
}