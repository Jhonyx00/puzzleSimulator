/**
 * Manages the internal logic of a 3×3 Cube.
 * Handles sticker||tiles updates, matrix transformations for layer rotations 
 * and maintains or reset the puzzle's current state.
 * @class
 */
class Puzzle {
    /**
     * @private
     * The current state of the puzzle
     * 
     * @type {object}
     */
    #state = {};

    /**
     * @private
     * Indicates if the puzzle is in a flipped state.
     * 
     * @type {boolean}
     */
    #isFlipped = false;

    /**
     * @private
     * The base color of the puzzle in rgba.
     * 
     * @type {object}
     */
    #baseColor = {};

    /**
     * @private
     * The number of moves made.
     * 
     * @type {number}
     */
    #moveCount = 0;

    /**
     * @private
     * Indicates if the puzzle is currently rotating.
     * 
     * @type {boolean}
    */
    #isRotating = false;

    /**
     * @private
     * Indicates if the puzzle is being scrambled.
     * 
     * @type {boolean}
     */
    #isScrambling = false;

    /**
     * @private
     * A map storing the puzzle's individual pieces.
     * 
     * @type {Map<string, object>}
     */
    #pieces = new Map();

    /**
     * @private
     * A map for auxiliarity layers used during rotations.
     * 
     * @type {Map<string, object>}
     */
    #auxLayerMap = new Map();

    /**
     * @private
     * The auxiliarity 3D layer for visual transformations.
     * 
     * @type {BoxGroup}
     */
    #auxLayer = new BoxGroup();

    /**
     * @private
     * The duration of visual transitions (e.g., rotations).
     * 
     * @type {string}
     */
    #transitionDuration = TRANSITION_SPEEDS["Fast"];

    /**
     * @private
     * The current skin of the puzzle.
     * 
     * @type {string}
     */
    #skin = PUZZLE_SKIN_NAMES.CLASSIC;

    /**
     * @private
     * Defines rotation functions for each axis (X, Y, Z).
     * 
     * @type {Object}
    */
    #TRANSFORMATION_BY_AXIS = {
        "X": (angle) => this.#auxLayer.rotateX(angle),
        "Y": (angle) => this.#auxLayer.rotateY(angle),
        "Z": (angle) => this.#auxLayer.rotateZ(angle),
    }

    /* Empty constructor. */
    constructor() { }

    /**
     * Checks if the puzzle is currently rotating.
     * @returns {boolean} True if the a puzzle layer is currently rotating, false otherwise.
     */
    get isRotating() {
        return this.#isRotating;
    }

    /**
     * Sets the rotating puzzle state.
     * @param {boolean} isRotating - True if a puzzle layer is currently rotating, false otherwise.
     */
    set isRotating(isRotating) {
        return this.#isRotating = isRotating;
    }

    /**
     * Checks if the puzzle is being scrambled.
     * @returns {boolean} True if the puzzle is currently in the process of scrambling, false otherwise.
     */
    get isScrambling() {
        return this.#isScrambling;
    }

    /**
     * Gets the current puzzle state.
     * @returns {object} The object representing the puzzle's current state.
     */
    get state() {
        return this.#state;
    }

    /**
     * Sets the current puzzle state.
     * @param {object} state - The object representating the new logical state for the puzzle.
     */
    set state(state) {
        return this.#state = state;
    }

    /**
     * Sets the puzzle base color.
     * @returns {string} The string name of the puzzle's base color.
     */
    get baseColor() {
        return this.#baseColor;
    }

    /**
     * Gets the current base color.
     * @param {string} baseColor - The new rgba string to set as the new base color .
     */
    set baseColor(baseColor) {
        return this.#baseColor = baseColor;
    }

    /**
     * Gets the current move count.
     * @returns {number} The total move count.
     */
    get moveCount() {
        return this.#moveCount;
    }

    /**
     * Sets the current move count.
     * @param {number} moveCount - The new total of moves.
     */
    set moveCount(moveCount) {
        this.#moveCount = moveCount;
    }

    /**
     * Gets the flipped state.
     * @returns {boolean} True if the puzzle is currently in flipped (inverted) orientation, false otherwise.
     */
    get isFliped() {
        return this.#isFlipped;
    }
    /**
     * Sets the flipped state.
     * @param {boolean} isFlipped - True to set the puzzle to a flipped orientation, false otherwise.
     */
    set isFlipped(isFlipped) {
        this.#isFlipped = isFlipped;
    }

    /**
     * Toggles the flipped state.
     * If the puzzle is currently flipped, it become unflipped, and vice-versa. 
     */
    toggleFlipped() {
        this.#isFlipped = !this.#isFlipped;
    }

    /**
     * Init the specified puzzle piece.
     * 
     * @param {string} index - The id of the current piece. 
     * @param {Box3D} cubePiece - The Box3D object.
     */
    initPiece(index, cubePiece) {
        this.#pieces.set(Number(index), cubePiece);
    }

    /**
     * Returns a map of all puzzle pieces.
     * @returns {Map<string, Box3D>} A map where keys are identifiers and values are the corresponding Box3D piece objects.
     */
    getPuzzlePieces() {
        return this.#pieces;
    }

    /**
     * Sets the transition duration.
     * 
     * @param {string} duration - Indicates the time of the layer transition duration.  
     */
    setTransitionDuration(duration) {
        this.#transitionDuration = duration;
        this.#auxLayer.setTransitionDuration(duration);
    }

    /**
     * Updates the color puzzle state and it is stored internally (this object is stored in localStorage).
     * 
     * @param {string} pieceId - The id of the piece to update. 
     * @param {Object} newColor - An object that represents the new color of each visible face of the piece.
     */
    updateState = (pieceId, newColor) => {
        this.state[pieceId] = newColor;
    }

    /**
     * Update the base color of the puzzle, iterate through each piece and assign the color object
     * 
     * @param {object} baseColor - New base color of the puzzle.
     */
    applyBaseColorToAllPieces(baseColor) {
        this.baseColor = baseColor;
        for (const element of this.#pieces.values()) {
            element.setBaseColor(baseColor);
        }
    }
    /**
     * Sets the transition timing function value for the aux layer responsible for visual rotation.
     * 
     * @param {string} timingFunction - Transition timing function for the aux layer. 
     */
    setTransitionTimingFunction(timingFunction) {
        this.#auxLayer.setTransitionTimingFunction(timingFunction);
    }

    /**
     * Applies the visual rotation to the affected layer.
     * 
     * @param {Object} param0.angle - Rotation angle.
     * @param {Object} param0.axis - Rotation axis.
     * @param {Object} param0.layer - Affected layer.
     */
    rotateLayer({ angle, axis, layer }) {
        requestAnimationFrame(() => this.#TRANSFORMATION_BY_AXIS[axis](angle));
        this.#auxLayer.show();
        requestAnimationFrame(() => {
            setTimeout(() => {
                this.isRotating = false;
                this.#auxLayer.hide();
                this.#auxLayer.resetRotation();
                for (const key of layer) {
                    const piece = this.#pieces.get(key);
                    piece?.show();
                }
            }, this.#transitionDuration);
            this.isRotating = true;
        });
    }

    /**
     * Init the aux layer's 3D piece and adds it to the puzzle container.
     * @param {number} arrayIndex - Piece ID.
     * 
     */
    initAuxLayerCubePiece(arrayIndex) {
        if (arrayIndex === 13) return;
        const element = this.#pieces.get(arrayIndex);
        const { position, dimension } = element;
        const puzzlePiece = new Box3D(dimension);

        puzzlePiece.setPosition(position);
        puzzlePiece.insertTo(this.#auxLayer.element);

        this.#auxLayerMap.set(arrayIndex, puzzlePiece);
        this.#auxLayer.addObjectArray(this.#auxLayerMap);
        this.#auxLayer.insertTo(puzzleViewer.element);
    }

    /**
     * Gets the current colors of the affected layer's pieces using the array IDs.
     * 
     * @param {string} layerIndexes - The array od IDs representing the pieces of a puzzle layer.
     * @returns {object} The current colors object of each piece of the layer.
     */
    getLayerColors(layerIndexes) {
        const currentColors = {};
        for (const pieceId of layerIndexes) {
            currentColors[pieceId] = this.#pieces.get(pieceId)?.colors;
            this.initAuxLayerCubePiece(pieceId);
        }
        return currentColors;
    }
    /**
     * Gets a new notation according to the puzzle's current Y-axis angle.
     * 
     * @param {number} angleY - The puzzle's current Y-axis angle. 
     * @param {string} notation - Layer notation.
     * @returns {string} - New notation.
     */
    getRotatedNotation(angleY, notation) {
        const angle = normalizeAngle(angleY);
        if (angle >= 45 && angle < 135) {
            return ROTATED_NOTATION_MAP["45"][notation] ?? notation;
        }
        else if (angle >= 135 && angle < 225) {
            return ROTATED_NOTATION_MAP["135"][notation] ?? notation;
        }
        else if (angle >= 225 && angle < 315) {
            return ROTATED_NOTATION_MAP["225"][notation] ?? notation;
        }
        return notation;
    }

    /**
     * Gets a new notation relative to the puzzle's Y-angle, only if the puzzle's current Z-axis angle is equal to 180 degrees.
     * 
     * @param {number} angleY - The puzzle's current Y-axis angle.
     * @param {string} notation - Layer notation.
     * @returns {string} The new color object for each puzzle piece after applying a rotation.
     */
    getRotatedNotation180(angleY, notation) {
        const angle = normalizeAngle(angleY);
        if (angle >= 45 && angle < 135) {
            return ROTATED_NOTATION_180_MAP["45"][notation] ?? notation;
        }
        else if (angle >= 135 && angle < 225) {
            return ROTATED_NOTATION_180_MAP["135"][notation] ?? notation;
        }
        else if (angle >= 225 && angle < 315) {
            return ROTATED_NOTATION_180_MAP["225"][notation] ?? notation;
        }
        else {
            return ROTATED_NOTATION_180_MAP["315"][notation] ?? notation;
        }
    }

    /**
     * Gets the new color object for each puzzle piece after applpying a rotation.
     * 
     * @param {Object} currentColors - The puzzle's current piece color object.
     * @param {Object} targetColors - The color object that the layer should have after a rotation.
     * @param {string} notation - Layer notation.
     * @returns {Object} The puzzle layer's piece color object.
     */
    getRotatedColors(currentColors, targetColors, notation) {
        const rotatedColors = {};
        const faceColorMap = PIECE_FACE_COLOR_MAP[notation];
        Object.keys(currentColors).forEach(key => {
            const currentFace = parseInt(key);
            const targetFace = faceColorMap[currentFace];
            rotatedColors[currentFace] = targetColors[targetFace];
        });
        return rotatedColors;
    }

    /**
     * Rotates the stickers of each piece in the layer specified by the notation, by iterating through the array of ids
     * representing each piece in the layer.
     * 
     * @param {number[]} layer - The array of piece IDs for the layer specified by the notation.
     * @param {*} notation - Layer notation.
     */
    rotatePieceColors(layer, notation) {
        const rotatedMatrix = ROTATED_LAYERS[notation].flat();
        const currentLayerColors = this.getLayerColors(layer);
        const layerVector = layer;

        layerVector.forEach((key, index) => {
            const currentColors = currentLayerColors[key];
            const targetColors = currentLayerColors[rotatedMatrix[index]];

            const auxLayerPiece = this.#auxLayerMap.get(key);
            const puzzlePiece = this.#pieces.get(key);

            if (key !== 13) { // "13" invisible pieces (core).
                const faceColor = {};
                const rotatedColors = this.getRotatedColors(currentColors, targetColors, notation);
                puzzlePiece.setBackground(rotatedColors);

                if (this.#skin === PUZZLE_SKIN_NAMES.HOLLOW) {
                    auxLayerPiece.setImgOnAllFaces(SPECIAL_SKIN.HOLLOW);
                }
                else if (this.#skin === PUZZLE_SKIN_NAMES.GLASS) {
                    auxLayerPiece.setImgOnAllFaces(SPECIAL_SKIN.CRISTAL);
                }
                else {
                    auxLayerPiece.setBaseColor(this.baseColor);
                }
                auxLayerPiece.setBackground(currentLayerColors[key]); // sets the colors of each piece in the layer that is being rotated.
                puzzlePiece.hide();
                Object.entries(rotatedColors).forEach(([key, value]) => faceColor[key] = value.id);
                this.updateState(key, faceColor);
            }
        });
    }

    /**
     * Executes the puzzle's rotation, encompassing both logical and visual rotation. 
     * 
     * @param {Object} layerObj - The object representing the layer's data, such as angle, axis and id of the pieces that compose the layer. 
     */
    performLayerRotation(layerObj) {
        this.#auxLayerMap.clear();
        const flatArray = layerObj.layer.flat();
        this.rotatePieceColors(flatArray, layerObj.notation);
        this.rotateLayer({
            angle: layerObj.angle,
            axis: layerObj.axis,
            layer: flatArray,
        });
    }

    /**
     * Gets the notation relative to the puzzle's visual position, then executes the logical and visual rotation.
     * 
     * @param {number} angleY - The puzzle's current Y-axis angle.
     * @param {string} notation - Layer notation.
     */
    performMove(angleY, notation) {
        const rotatedNotation = this.isFliped
            ? this.getRotatedNotation180(angleY, notation)
            : this.getRotatedNotation(angleY, notation);
        this.performLayerRotation(LAYER_ROTATIONS[rotatedNotation]);
        this.moveCount++;
    }

    /**
     * Creates a random puzzle state from random moves.
     * 
     */
    async scramble() {
        this.#isScrambling = true;
        for (let i = 0; i < SCRAMBLE_LENGTH; i++) {
            requestAnimationFrame(() => {
                const randomNumber = Math.floor(Math.random() * PUZZLE_MOVE_KEYS.length);
                const randomKey = PUZZLE_MOVE_KEYS[randomNumber];
                this.performLayerRotation(LAYER_ROTATIONS[randomKey]);
            });
            await new Promise(resolve => setTimeout(resolve, this.#transitionDuration + TRANSITION_DELAY_BUFFER));
        }
        this.#isScrambling = false;
    }

    /**
     * Resets the puzzle to its original state (solved).
     * 
     * @param {Object} puzzleData - Original puzzle data (solved).
     */
    reset(puzzleData) {
        this.moveCount = 0;
        this.#setSkin(this.#skin, puzzleData);
    }

    /**
     * Changes the puzzle's skin based on the skin name. 
     * 
     * @param {string} skin - Puzzle skin.
     * @param {boolean} originalSource - If the skin comes from the default state (solved state).
     */
    #setSkin(skin, originalSource = false) {
        this.#pieces.forEach((piece, id) => {
            const colorSource = originalSource ? originalSource[id].colors : piece.colors;
            const newFaceColors = {};
            // get colors from color source to preserve puzzle state.
            for (const [face, colorData] of Object.entries(colorSource)) {
                newFaceColors[face] = PUZZLE_SKINS[skin][colorData.id];
            }
            piece.setBackground(newFaceColors);
        });
    }

    /**
     * Applies the special skin, wich is considered "special" because it modifies all HTML elements on the piece.
     * 
     */
    #setSpecialSkin() {
        for (const element of this.#pieces.values()) {
            element.setBgOnAllFaces(SPECIAL_SKIN.HOLLOW, SPECIAL_BASE_COLORS.TRANSPARENT);
        }
        this.baseColor = SPECIAL_BASE_COLORS.TRANSPARENT;
    }

    /**
     * Removes the special skin to avoid affecting other skins that do not requiere visual modification of each HTML element of the piece.
     */
    #removeSpecialSkin() {
        for (const cubePiece of puzzle.#pieces.values()) {
            cubePiece.removeImageFromAllFaces();
        }
    }

    /**
     * Manages the skin change according to the user's selected skin.
     * 
     * @param {string} skinName - Skin name. 
     */
    performSkinChange(skinName, baseColor = BASE_COLORS.BLACK) {
        this.#skin = skinName;
        if (skinName === PUZZLE_SKIN_NAMES.HOLLOW) {
            this.#setSpecialSkin();
        }
        else if (skinName === PUZZLE_SKIN_NAMES.GLASS) {
            this.#removeSpecialSkin();
            for (const element of this.#pieces.values()) {
                element.setBgOnAllFaces(SPECIAL_SKIN.CRISTAL, SPECIAL_BASE_COLORS.TRANSPARENT);
            }
            this.baseColor = SPECIAL_BASE_COLORS.TRANSPARENT;
        }
        else {
            this.#removeSpecialSkin();
            this.applyBaseColorToAllPieces(baseColor);
        }
        this.#setSkin(skinName, false);
    }

    /**
     * Gets the face colors of all puzzle pieces.
     * 
     * @param {string} pieceId - Piece ID.
     * @param {Object} puzzleState - Puzzle state object.
     * @param {string} skin - Skin name. 
     * @returns {Object} The puzzle piece color object.
     */
    getFaceColors = (pieceId, puzzleState, skin) => {
        const faceColors = {};
        for (const [face, id] of Object.entries(puzzleState[pieceId])) {
            faceColors[face] = PUZZLE_SKINS[skin][id];
        }
        return faceColors;
    }

    /**
     * Init the puzzle using data stored in localStorage.
     * 
     * @param {Object} puzzleState - The current puzzle state data from localStorage.
     * @param {Object} puzzleConfig - The object defining the puzzle skin, rotation, moves, and other properties.  
     * @param {Object} puzzleData - Puzzle piece data (ID, position, size, etc.)
     */
    initFromLocalStorage(puzzleState, puzzleConfig, puzzleData) {
        this.state = puzzleState;
        this.baseColor = puzzleConfig.baseColor;

        for (const [pieceId, element] of Object.entries(puzzleData)) {
            if (pieceId != 13) {
                const dimension = element.dimension;
                const transform = element.transform;
                const cubePiece = new Box3D(dimension);
                cubePiece.setPosition(transform);
                cubePiece.setPieceId(pieceId);

                if (puzzleConfig.skin === PUZZLE_SKIN_NAMES.HOLLOW) {
                    cubePiece.setBgOnAllFaces(SPECIAL_SKIN.HOLLOW, puzzleConfig.baseColor);
                }

                const faceColors = this.getFaceColors(pieceId, puzzleState, puzzleConfig.skin);
                cubePiece.setBackground(faceColors);
                cubePiece.insertTo(puzzleContainer.element);
                this.initPiece(pieceId, cubePiece);
            }
        }
        this.applyBaseColorToAllPieces(puzzleConfig.baseColor);
    }

    /**
     * Sets up the puzzle from the locally created puzzle state object.
     * 
     * @param {Object} puzzleConfig - Puzzle configuration object.
     * @param {Object} puzzleData - Default puzzle state (solved state).
     */
    initFromData(puzzleConfig, puzzleData) {
        for (const [pieceId, element] of Object.entries(puzzleData)) {
            const { dimension, colors, transform } = element;
            const cubePiece = new Box3D(dimension);
            cubePiece.setPosition(transform);
            cubePiece.setPieceId(pieceId);

            const faceColors = {};
            Object.entries(colors).forEach(([key, color]) => faceColors[key] = color.id);

            cubePiece.setBackground(colors);
            cubePiece.insertTo(puzzleContainer.element);

            this.initPiece(pieceId, cubePiece);
            this.updateState(pieceId, faceColors);

            if (puzzleConfig.skin === PUZZLE_SKIN_NAMES.HOLLOW) {
                cubePiece.setBgOnAllFaces(SPECIAL_SKIN.HOLLOW);
            }
        }
        this.applyBaseColorToAllPieces(BASE_COLORS.BLACK);
    }
}