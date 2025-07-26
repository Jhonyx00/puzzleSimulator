const PUZZLE_SKIN_BASE_URL = `url(./images/appearance/`;
const TRANSITION_DELAY_BUFFER = 50;
const SCRAMBLE_LENGTH = 25;

const PIEZE_SIZE = 84;

const AXES = {
    X: "X",
    Y: "Y",
    Z: "Z",
}

const ANGLES = {
    NONE: 0,
    QUARTER: 90,
    HALF: 180,
    FULL: 360
}

const N_SIZE = 3;

const SPECIAL_KEYS = {
    "SHIFT": "SHIFT"
}

const PUZZLE_CW_MOVES = {
    "U": "U",
    "R": "R",
    "F": "F",
    "L": "L",
    "D": "D",
    "B": "B",
    "M": "M",
    "E": "E",
    "S": "S",
}

const PUZZLE_CCW_MOVES = Object.fromEntries(Object.keys(PUZZLE_CW_MOVES).map((key) => [`${key}'`, `${key}'`]))
const PUZZLE_MOVES = { ...PUZZLE_CW_MOVES, ...PUZZLE_CCW_MOVES };
const PUZZLE_MOVE_KEYS = Object.keys(PUZZLE_MOVES);

const SPECIAL_SKIN = {
    HOLLOW: "url(./images/appearance/hollow/hole.svg)",
    CRISTAL: "url(./images/appearance/glass/cristal.svg"
}

const SPECIAL_BASE_COLORS = {
    BARELY_TRANSLUCENT: { r: 0, g: 0, b: 0, a: 0.1 },
    TRANSPARENT: { r: 0, g: 0, b: 0, a: 0 },
}

const PUZZLE_SKIN_NAMES = {
    CLASSIC: "CLASSIC",
    PASTEL: "PASTEL",
    HOLLOW: "HOLLOW",
    INVERTED: "INVERTED",
    STICKERLESS: "STICKERLESS",
    GLASS: "GLASS",
    STROKE: "STROKE"
};

const BASE_COLORS = {
    BLACK: { r: 0, g: 0, b: 0, a: 1 },
    GRAY: { r: 210, g: 210, b: 210, a: 1 },
    WHITE: { r: 255, g: 255, b: 255, a: 1 },
    CYAN: { r: 0, g: 255, b: 255, a: 1 },
    CREAM: { r: 236, g: 219, b: 191, a: 1 },
    SKY_BLUE: { r: 133, g: 156, b: 202, a: 1 },
    PURPLE: { r: 164, g: 122, b: 206, a: 1 },
    OLIVE: { r: 164, g: 190, b: 0, a: 1 },
    RED: { r: 130, g: 21, b: 21, a: 1 },
    GREEN: { r: 0, g: 158, b: 0, a: 1 },
    CHOCOLATE: { r: 101, g: 64, b: 37, a: 1 },
    ORANGE: { r: 255, g: 165, b: 0, a: 1 },
    BLUE: { r: 0, g: 0, b: 255, a: 1 },
    YELLOW: { r: 255, g: 230, b: 0, a: 1 },
    PINK: { r: 255, g: 93, b: 166, a: 1 },
};


const PUZZLE_SIZES = {
    "0.4": "Micro",
    "0.6": "Mini",
    "0.8": "Small",
    "1": "Normal",
    "1.2": "Medium",
    "1.4": "Big",
    "1.6": "Huge",
    "1.8": "Colossal"
}

const INVERSE_PUZZLE_SIZES = invertObject(PUZZLE_SIZES);

const TRANSITION_SPEEDS = {
    "Instant": 0,
    "Fast": 200,
    "Medium": 400,
    "Slow": 600,
    "Very Slow": 800,
}

const INVERSE_TRANSITION_SPEEDS = invertObject(TRANSITION_SPEEDS);

const EASING_FUNCTION = {
    NORMAL: "ease",
    LINEAR: "linear",
    MECANIC: "ease-out",
    MAGNETIC: "ease-in",
    BOUNCE: "cubic-bezier(0.68, -0.2, 0.32,1.6)",
}