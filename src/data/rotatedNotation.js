const ROTATED_NOTATION_MAP = {
    "45": {
        "F": "L",
        "L": "B",
        "R": "F",
        "B": "R",
        "S": "M",
        "M": "S'",
        "M'": "S",
    },
    "135": {
        "F": "B",
        "B": "F",
        "L": "R",
        "R": "L",
        "S": "S'",
        "S'": "S",
        "M": "M'",
        "M'": "M",
    },
    "225": {
        "F": "R",
        "L": "F",
        "R": "B",
        "B": "L",
        "M": "S",
        "S": "M'",
        "S'": "M",
    },
}

const ROTATED_NOTATION_180_MAP = {
    "45": {
        "F": "R",
        "B": "L",
        "R": "F",
        "L": "B",
        "U": "D",
        "D": "U",
        "S": "M'",
        "S'": "M",
        "E": "E'",
        "E'": "E",
        "M": "S'",
        "M'": "S",
    },
    "135": {
        "U": "D",
        "D": "U",
        "E": "E'",
        "E'": "E",
        "S": "S'",
        "S'": "S",
        "F": "B",
        "B": "F",
    },
    "225": {
        "F": "L",
        "B": "R",
        "U": "D",
        "D": "U",
        "R": "B",
        "L": "F",
        "S": "M",
        "M": "S",
        "E": "E'",
        "E'": "E",
    },
    "315": {
        "U": "D",
        "D": "U",
        "L": "R",
        "R": "L",
        "M": "M'",
        "M'": "M",
        "E'": "E",
        "E": "E'",
    },
}

const getCCWLayer = (notationObj) => {
    return Object.fromEntries(
        Object.entries(notationObj).map(([key, value]) => [`${key}'`, `${value}'`])
    )
}

for (const key of Object.keys(ROTATED_NOTATION_MAP)) {
    const CWNotation = getCCWLayer(ROTATED_NOTATION_MAP[key]);
    ROTATED_NOTATION_MAP[key] = { ...CWNotation, ...ROTATED_NOTATION_MAP[key] };
}

for (const key of Object.keys(ROTATED_NOTATION_180_MAP)) {
    const CCWNotation = getCCWLayer(ROTATED_NOTATION_180_MAP[key]);
    ROTATED_NOTATION_180_MAP[key] = { ...CCWNotation, ...ROTATED_NOTATION_180_MAP[key] };
}
