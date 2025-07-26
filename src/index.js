// Main 3D scene container where the puzzle is rendered.
const scene = document.getElementById("scene");

// Container for for several action buttons related to puzzle transformations.
const actionBtns = document.getElementById("action-buttons");
const moveCountSpan = document.getElementById("move-count"); // Span for move count.

// Buttons for specific puzzle actions.
const scrambleBtn = document.getElementById("scramble-btn"); // Button to scramble the puzzle.
const resetBtn = document.getElementById("reset-btn"); // Button to reset the puzzle.

// Menu UI elements.
const openSidebarBtn = document.getElementById("open-sidebar-btn"); //Button to trigger the opening of the sidebar menu.
const sidebar = document.getElementById("menu"); // The main sidebar menu container element.
const closeSidebarBtn = document.getElementById("close-menu-btn"); // Button to trigger the closing of the sidebar menu. 

// Containers for orginizing UI elements.
const settingsContainer = document.getElementById("puzzle-settings"); // Container for several puzzle settings.
const visualCustomizationContainer = document.getElementById("puzzle-visual-customization"); // Container for visual customization settings.

// Elements related to the informational dialog box.
const dialog = document.getElementById("info-dialog"); // The modal dialog element itself
const dialogOpenBtn = document.getElementById("open-dialog-btn"); // Button to open the info dialog.
const dialogCloseBtn = document.getElementById("close-dialog-btn"); // Button to close info dialog.
// Constants initialization

// --- Core Puzzle Data Generation ---.

// Creates an object containing several skins for the puzzle, based oon predefined names.
const PUZZLE_SKINS = generatePuzzleSkins(PUZZLE_SKIN_NAMES);
// Creates the foundational data structure for the puzzle, including piece dimensions, position and default skin.
const PUZZLE_DATA = createPuzzleData(N_SIZE, PIEZE_SIZE, PUZZLE_SKINS.CLASSIC);
// Create the puzzle's IDs array for each layer based on the puzzle's initial data.
const LAYERS = createPuzzleLayers(N_SIZE, PUZZLE_DATA);

// --- Rotated Layer Definitions ---

// Object to store rotated IDs array or each rotated clockwise layer.
const ROTATED_CW_LAYERS = {};

// Object to store rotated IDs array of each counter-clockwise layer.
const ROTATED_CCW_LAYERS = {};

// Populates ROTATED_CW_LAYERS by applying a clockwise rotation to each initial layer.
Object.entries(LAYERS).forEach(([key, array]) => {
    ROTATED_CW_LAYERS[key] = getRotatedMatrix(array, true)
});

// Populates ROTATED_CCW_LAYERS by applying a counter-clockwise rotation to each initial layer.
Object.entries(LAYERS).forEach(([key, array]) => {
    ROTATED_CCW_LAYERS[`${key}'`] = getRotatedMatrix(array, false);
});

// Combines both clockwise and counter-clockwise rotated IDs array into a single object.
const ROTATED_LAYERS = { ...ROTATED_CW_LAYERS, ...ROTATED_CCW_LAYERS }

/**
 * @property {object} defaultPuzzleConfig - Default configuration settings for the puzzle.
 * @property {number} defaultPuzzleConfig.moves - The initial move count for the puzzle.
 * @property {string} defaultPuzzleConfig.skin - The default visual skin applied to the puzzle.
 * @property {string} defaultPuzzleConfig.size - The default visual size setting of the puzzle.
 * @property {object} defaultPuzzleConfig.angle - The initial 3D viewing angle of the puzzle.
 * @property {number} defaultPuzzleConfig.angle.x - The X-axis angle in degrees.
 * @property {number} defaultPuzzleConfig.angle.y - The Y-axis angle in degrees.
 * @property {number} defaultPuzzleConfig.angle.z - The Z-axis angle in degrees.
 * @property {string} defaultPuzzleConfig.baseColor - The default base color of the puzzle pieces.
 * @property {string} defaultPuzzleConfig.easingFunction - The default easing function name for animations.
 * @property {string} defaultPuzzleConfig.transitionDuration - The default visual transition duration for moves.
 */

let defaultPuzzleConfig = {
    moves: 0, // Initial number of moves.
    skin: PUZZLE_SKIN_NAMES.CLASSIC, // Default puzzle skin.
    size: "Normal", // Default visual size of the puzzle.
    angle: { x: -20, y: -30, z: 0 }, // Initial camera/viewer angle.
    baseColor: BASE_COLORS.BLACK, // Default base color for customizable skins.
    easingFunction: "NORMAL", // Default animation easing function.
    transitionDuration: INVERSE_TRANSITION_SPEEDS[200],  // Default transition speed (e.g., "Normal", "Fast").
}

/**
 * @property {object} globalState - Manages the global application state, including user interaction flags and data.
 * @property {boolean} globalState.canRotate - Indicates if the puzzle viewer is allowed to rotate (e.g., false during menu interactions).
 * @property {boolean} globalState.isDragging - Indicates if the puzzle is currently being dragged by the mouse or touch.
 * @property {object} globalState.puzzleData - Contains data related to the puzzle structure or properties.
 * @property {object} globalState.dragStart - Stores the X and Y coordinates of the pointer (mouse or touch) when a drag interaction begins.
 * @property {object} globalState.dragMove - Stores the current X and Y coordinates of the pointer (mouse or touch) during movement.
 * @property {number} globalState.dragStart.x - X-coordinate of the pointer (mouse or touch) when a drag interaction begins.
 * @property {number} globalState.dragStart.y - Y-coordinate of the mouse or (mouse or touch) when a drag interaction begins.
 * @property {number} globalState.dragMove.x - Current X-coordinate of the mouse or touch.
 * @property {number} globalState.dragMove.y - Current Y-coordinate of the mouse or touch.
 * @property {boolean} globalState.isKeyPressed - Indicates if any key is currently pressed down.
 * @property {boolean} globalState.isShiftPressed - Indicates if the Shift key is currently pressed.
 * @property {boolean} globalState.isOpacityEnabled - Flag indicating if Opacity settings are enabled.
 * @property {boolean} globalState.isBaseColorEnabled - Flag indicating if the base color option is currently enabled for the selected skin.
 */

let globalState = {
    canRotate: false, // Determines if the puzzle can be rotated via mouse or touch interaction.
    isDragging: false,  // Indicates if the user is currently dragging the puzzle for rotation.
    puzzleData: PUZZLE_DATA, // Data structure defining the puzzle (e.g., dimensions, piece layout).
    dragStart: { x: 0, y: 0 }, // Stores the coordinates where the pointer (mouse or touch) began.
    dragMove: { x: 0, y: 0 }, // Stores the current mouse or touch coordinates during movement.
    isKeyPressed: false, // Tracks if a keyboard key is pressed to prevent rapid input.
    isShiftPressed: false, // Tracks the state of the Shift key for modified inputs (e.g., inverse moves).
    isOpacityEnabled: true, // Controls the availability of Opacity settings.
    isBaseColorEnabled: false, // Controls the availability of the base color customization.
}

// Initialize core puzzle components.
const puzzle = new Puzzle(); // Represents the logical state and operations of the puzzle.
const puzzleContainer = new BoxGroup(); // The 3D container for all puzzle pieces.
const puzzleViewer = new PuzzleViewer(); // Manages the visual representation and camera of the puzzle.

// Initialize UI Dropdown components.
const skinDropdown = new Dropdown(PUZZLE_SKIN_NAMES, "skin"); // Dropdown for selecting the puzzle's visual skin.
const animationDropdown = new Dropdown(EASING_FUNCTION, "animation"); // Dropdown for selecting the animation easing function.
const baseColorDropdown = new Dropdown(BASE_COLORS, "base-color", "buttons"); // Dropdown for slecting the base color of the puzzle.

// Initialize UI Range Input components (sliders) for several settings.
const speedSelector = new RangeInput("Speed", { min: 0, max: 800, step: 200, value: 600 }); // Slider for adjusting the puzzle's rotation speed.
const sizeSelector = new RangeInput("Size", { min: 0.4, max: 1.8, step: 0.2, value: 1 }); // Slider for adjusting the pussle's visual size.
const baseOpacitySelector = new RangeInput("Base Opacity", { min: 0, max: 1, step: 0.05, value: 1 }); // Slider for adjusting the Opacity of the puzzle's base.

/**
 * Handles the mousedown event specifically on the 3D scene.
 * It initiates the dragging state and records the starting mouse coordinates for rotation.
 * 
 * @param {Event} e - The mouse event object. 
 */
const handleSceneDragStart = (e) => {
    const { x, y } = getEventPosition(e);
    updateGlobalState({ isDragging: true, dragStart: { x: x, y: y } });
}

/**
 * Handles the document mouse or touch event, which initiates interactions such as menu operations and preparing for puzzle dragging|rotation.
 * It identifies the selected element and performs asociated menu actions.
 * 
 * @param {Event} e - The mouse or touch event object. 
 */
const handleDocumentDragStart = (e) => {
    const element = e.target;
    performMenuOps(element);

    if (element !== scene) {
        updateGlobalState({ canRotate: false });
    }
}

/**
 * Handles the document pointer (mouse or touch) event, to stop puzzle rotation.
 * If the puzzle was being dragged, it updates the puzzle's config with the final angle and resets the dragging state.
 * It re-enables the ability to rotate the puzzle.
 * 
 */
const handleDocumentDragEnd = () => {
    if (globalState.isDragging) {
        updatePuzzleConfig({ angle: puzzleViewer.angle });
        updateGlobalState({ isDragging: false });
    }
    updateGlobalState({ canRotate: true });
}

/**
 * Handles global mouse wheel events.
 * Prevents the default browser behavior for mouse wheel scrolls.
 * 
 * @param {Event} e - The mouse wheel event object. 
 */
const handleGlobalWheel = (e) => {
    e.preventDefault();
}

/**
 * Handles puzzle viewer horizontal flips based on arrow key inputs.
 * 
 * @param {string} moveCode - The uppercase string representation of the pressed arrow key. 
 */
const handleHorizontalDirection = (moveCode) => {
    const direction = moveCode === "ARROWRIGHT" ? 90 : -90;
    puzzleViewer.rotateY(puzzleViewer.angleY + direction);
    puzzleViewer.handleRotation(puzzle.isFliped);
    updatePuzzleConfig({ angle: puzzleViewer.angle });
    updateGlobalState({ isKeyPressed: true });
}

/**
 * Handles puzzle viewer vertical flips.
*/
const handleVerticalDirection = () => {
    puzzle.toggleFlipped();
    puzzleViewer.handleRotation(puzzle.isFliped);
    updatePuzzleConfig({ angle: puzzleViewer.angle });
    updateGlobalState({ isKeyPressed: true });
}

/**
 * Process puzzle moves based on specific notation keys pressed by the user.
 * It checks for the Shift key to apply inverse moves and then performs the corresponding action.
 * 
 * @param {string} moveCode - The upercase string representation of pressed key (e.g., "U", "B"). 
 */
const handleNotationKey = (moveCode) => {
    if (globalState.isShiftPressed === true) {
        const move = PUZZLE_MOVES[`${moveCode}'`];
        if (!move) return;
        performMoveByKey(move);
    }
    else {
        if (!PUZZLE_MOVES[moveCode]) return;
        performMoveByKey(moveCode);
    }
}

/**
 * Handles the keydown event for puzzle controls.
 * Prevents default browser behavior for key press, manage the Shift key state.
 * Process arrow key, notation inputs.
 * 
 * @param {Event} e - The keyboard event object. 
 */
const handleKeydown = (e) => {
    const moveCode = e.key.toUpperCase();
    if (globalState.isKeyPressed) return;
    if (moveCode === SPECIAL_KEYS.SHIFT) {
        updateGlobalState({ isShiftPressed: true });
    }

    if (moveCode === "ARROWRIGHT" || moveCode === "ARROWLEFT") {
        handleHorizontalDirection(moveCode);
        e.preventDefault();
    }
    else if (moveCode === "ARROWUP" || moveCode === "ARROWDOWN") {
        handleVerticalDirection();
        e.preventDefault();
    }

    handleNotationKey(moveCode);
}

/**
 * Handles the keyup event to manage key press states.
 * It detects when Shift key is released and resets the general key pressed flag.
 * 
 * @param {Event} e - The keyboard event  object. 
 */
const handleKeyUp = (e) => {
    const moveCode = e.key.toUpperCase();
    if (moveCode === SPECIAL_KEYS.SHIFT) {
        updateGlobalState({ isShiftPressed: false });
    }
    updateGlobalState({ isKeyPressed: false });
}

/**
 * Handles document mouse or touch move event, primarily for rotating the puzzle viewer.
 * It updates the global state with the current pointer position and if dragging, calculates the pointer delta to perform a visual rotation. 
 * 
 * @param {Event} e - The mouse or touch event object. 
 */
const handleDocumentDragMove = (e) => {
    const { x, y } = getEventPosition(e);
    if (!globalState.isDragging) return;
    // if (!globalState.canRotate) return;
    const currentMouse = { x: x, y: y };
    const mouseDelta = getDragDelta(currentMouse, globalState.dragStart);
    puzzleViewer.performRotation(mouseDelta, puzzle.isFliped);
    updateGlobalState({ dragStart: currentMouse });
}

/**
 * Handles various user interactions triggered by clicking on interactive elements such as puzzle flips.
 * 
 * @param {Event} e - The event object from the click action.  
 */
const handleAction = (e) => {
    e.target.blur();
    const element = e.target;
    const notation = element.dataset.notation;
    if (!notation) return;
    if (notation === "FLIP_V") { puzzle.toggleFlipped() }
    else if (notation === "FLIP_H_R") { puzzleViewer.rotateY(puzzleViewer.angleY + 90) }
    else if (notation === "FLIP_H_L") { puzzleViewer.rotateY(puzzleViewer.angleY - 90) }
    puzzleViewer.handleRotation(puzzle.isFliped);
    updatePuzzleConfig({ angle: puzzleViewer.angle });
}

/**
 * Handles changes to the puzzle's base Opacity based on user interaction with the base Opacity selector.
 * Updates the global config object with the new Opacity value.
 * Updates the selector's display and sets the puzzle's baseColor property.
 */
const handleBaseOpacityChange = () => {
    if (globalState.isOpacityEnabled) {
        const baseOpacityValue = baseOpacitySelector.getValue();
        baseOpacitySelector.setText(toPercentage(baseOpacityValue));
        const baseColor = puzzle.baseColor;
        const newColor = {
            r: baseColor.r,
            g: baseColor.g,
            b: baseColor.b,
            a: Number(baseOpacityValue)
        }
        puzzle.applyBaseColorToAllPieces(newColor);
        updatePuzzleConfig({ baseColor: newColor });
    }
}

/**
 * Handles changes to the puzzle's transition speed based on user interaction with the speed selector.
 * Updates the global config object.
 * Updates the selector's display and sets the puzzle's transition duration property.
 */
const handleSpeedChange = () => {
    const invertedValue = speedSelector.getInvertedValue();
    const speedValue = INVERSE_TRANSITION_SPEEDS[invertedValue];
    speedSelector.setText(INVERSE_TRANSITION_SPEEDS[invertedValue]);
    puzzle.setTransitionDuration(invertedValue);
    updatePuzzleConfig({ transitionDuration: speedValue });
}

/**
 * Handles the puzzle's scale value.
 * Updates the global config object.
 */
const handleSizeChange = () => {
    const value = sizeSelector.getValue();
    const puzzleSize = PUZZLE_SIZES[value];
    sizeSelector.setText(puzzleSize);
    puzzleViewer.setScale(value, puzzle.isFliped);
    updatePuzzleConfig({ size: puzzleSize });
}

/**
 * Resets the puzzle to its original state (solved).
 */
const handleReset = () => {
    if (!puzzle.isScrambling) {
        puzzle.reset(globalState.puzzleData);
        moveCountSpan.textContent = puzzle.moveCount;
        updatePuzzleConfig({ moves: 0 });
        localStorage.removeItem(STORAGE_KEYS.PUZZLE_STATE);
    }
}

/**
 * Scrambles the puzzle to a random state and saves the new state.
 */
const handleScramble = async () => {
    if (!puzzle.isScrambling) {
        await puzzle.scramble();
        updatePuzzleState();
    }
}

/**
 * Updates the global app state.
 * New values are merged into the existing global state object.
 * 
 * @param {object} newValues - An object containing the state properties to update. 
 */
const updateGlobalState = (newValues) => {
    globalState = { ...globalState, ...newValues }
}

/**
 * Saves the current config of the puzzle to localStorage.
 * New values are merged into the existing global object configuration.
 */
const updatePuzzleConfig = (newValues) => {
    defaultPuzzleConfig = { ...defaultPuzzleConfig, ...newValues }
    localStorage.setItem(STORAGE_KEYS.PUZZLE_CONFIG, JSON.stringify(defaultPuzzleConfig));
}

/**
 * Saves the current state of the puzzle to localStorage.
 * The puzzle's state object is stringified before being stored.
 */
const updatePuzzleState = () => {
    const stateString = JSON.stringify(puzzle.state);
    localStorage.setItem(STORAGE_KEYS.PUZZLE_STATE, stateString);
}

/**
 * Updates the availability of the Opacity dropdown based  on the selected puzzle skin,
 * It enables the dropdown for "Clasic" and "Stroke" skins, and disables it for the rest of skins.
 * 
 * @param {string} skinName - The skin name.
 */
const updateOpacityAvailability = (skinName) => {
    if (skinName === PUZZLE_SKIN_NAMES.CLASSIC || skinName === PUZZLE_SKIN_NAMES.STROKE) {
        baseOpacitySelector.enable();
        updateGlobalState({ isOpacityEnabled: true });
    } else {
        baseOpacitySelector.disable();
        updateGlobalState({ isOpacityEnabled: false });
    }
}

/**
 * Updates the availability of the base color dropdown based on the selected puzzle skin.
 * It enables the dropdown for "Clasic" and "Stroke" skins, and disables it for the rest of skins.
 * 
 * @param {string} skinName - The skin name.
 */
const updateBaseColorAvailability = (skinName) => {
    if (skinName === PUZZLE_SKIN_NAMES.CLASSIC || skinName === PUZZLE_SKIN_NAMES.STROKE) {
        baseColorDropdown.enable();
        updateGlobalState({ isBaseColorEnabled: true });
    } else {
        baseColorDropdown.disable();
        updateGlobalState({ isBaseColorEnabled: false });
    }
}

/**
 * Performs a puzzle's base color change.
 *  
 * @param {HTMLElement} element - The HTMLElement that triggered the change.
 * @param {string} baseColor - The Base color string
 */
const performBaseColorChange = (element, baseColor) => {
    if (globalState.isBaseColorEnabled) {

        if (baseColorDropdown.contains(element)) {
            baseColorDropdown.close();
        }
        if (baseColor) {
            const summaryElementColor = BASE_COLORS[baseColor];
            const puzzleBaseColor = { ...summaryElementColor, a: defaultPuzzleConfig.baseColor.a }
            puzzle.applyBaseColorToAllPieces(puzzleBaseColor);
            baseColorDropdown.setSummaryBg(summaryElementColor);
            updatePuzzleConfig({ baseColor: puzzleBaseColor });
        }
    }
}

/**
 * Change the puzzle's skin. and uodates the puzzle config object.
 * 
 * @param {HTMLElement} element - The HTMLElement that triggered the change.
 * @param {string} skinName - The skin name. 
 */
const performSkinChange = (element, skinName) => {
    if (skinDropdown.contains(element)) {
        skinDropdown.close();
    }

    if (!skinName) return;

    updateBaseColorAvailability(skinName);
    updateOpacityAvailability(skinName);

    skinDropdown.handleItemSelected(skinName.toLowerCase());

    if (skinName === PUZZLE_SKIN_NAMES.CLASSIC || skinName === PUZZLE_SKIN_NAMES.STROKE) {
        const newBaseColor = { ...puzzle.baseColor, a: defaultPuzzleConfig.baseColor.a }
        puzzle.performSkinChange(skinName, newBaseColor);
    }
    else {
        puzzle.performSkinChange(skinName);
    }

    const alpha = puzzle.baseColor.a;
    baseOpacitySelector.setValue(alpha);
    baseOpacitySelector.setText(toPercentage(alpha));

    baseColorDropdown.setSummaryBg(puzzle.baseColor);
    updatePuzzleConfig({ skin: skinName, baseColor: puzzle.baseColor });
}

/**
 * Changes the puzzle's transition animation based on user selection.
 * Closes the animation dropdown and updates the puzzle's transition timing function label.
 * 
 * @param {HTMLElement} element - The HTMLElement that triggered the change.
 * @param {string} transitionName - The name of the selected transition.
 */
const performTransitionChange = (element, transitionName) => {
    if (animationDropdown.contains(element)) {
        animationDropdown.close();
    }
    if (transitionName) {
        animationDropdown.handleItemSelected(transitionName.toLowerCase());
        puzzle.setTransitionTimingFunction(EASING_FUNCTION[transitionName]);
        updatePuzzleConfig({ easingFunction: transitionName });
    }
}

/**
 * Performs several menu operations based on the provided HTML element's data attributes.
 * This includes changing transitions, base color, and the puzzle's skin.
 * 
 * @param {HTMLElement} element - The HTML element containing data attributes for menu operations.
 */
const performMenuOps = (element) => {
    performTransitionChange(element, element.dataset.animation);
    performBaseColorChange(element, element.dataset.baseColor);
    performSkinChange(element, element.dataset.skin);
}

/**
 * Performs a puzzle move triggered by a key press.
 * Prevents multiple moves if a key is already pressed or a puzzle's layer is rotating.
 * 
 * @param {string} moveCode - The code representing the specific move to perform a layer move. 
 */
const performMoveByKey = (moveCode) => {
    if ((globalState.isKeyPressed || puzzle.isRotating)) return;
    puzzle.performMove(puzzleViewer.positiveAngleY, moveCode);
    moveCountSpan.textContent = puzzle.moveCount;
    updatePuzzleConfig({ moves: puzzle.moveCount });
    updateGlobalState({ isKeyPressed: true });
    updatePuzzleState();
}

/**
 * Inserts the puzzle viewer into the scene.
 */
const initPuzzleViewer = () => {
    puzzleViewer.insertTo(scene);
}

/**
 * Inserts all menu dropdowns and selectors into their respective containers.
 */
const initMenu = () => {
    skinDropdown.insertTo(visualCustomizationContainer);
    baseColorDropdown.insertTo(visualCustomizationContainer);
    baseOpacitySelector.insertTo(visualCustomizationContainer);

    speedSelector.insertTo(settingsContainer);
    sizeSelector.insertTo(settingsContainer);
    animationDropdown.insertTo(settingsContainer);
}

/**
 * Loads saved puzzle state from localStorage or local object.
 * if data exists, it updates the puzzle's stickers on each piece.
 * otherwise, it uses the default state (solved state) defined in the local state object.
 */
const initPuzzleState = () => {
    const puzzleState = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUZZLE_STATE));
    const puzzleConfig = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUZZLE_CONFIG));

    if (puzzleState) {
        puzzle.initFromLocalStorage(puzzleState, puzzleConfig, globalState.puzzleData);
    }
    else {
        puzzle.initFromData(defaultPuzzleConfig, globalState.puzzleData);
    }

    puzzleContainer.addObjectArray(puzzle.getPuzzlePieces());
    puzzleContainer.insertTo(puzzleViewer.element);
}

/**
 * Loads saved puzzle configuration from localStorage or local object.
 * if data is found, it populates the UI inputs and applies the settings (such as rotation, base color, skin, etc) to the puzzle
 * if n osaved data is present, it falls back to a default configuration.
 */
const initPuzzleConfigFrom = (puzzleConfig) => {
    const { angle, transitionDuration, easingFunction, moves, skin, baseColor, size } = puzzleConfig;

    puzzle.performSkinChange(skin);
    puzzle.setTransitionTimingFunction(EASING_FUNCTION[easingFunction]);
    puzzle.setTransitionDuration(TRANSITION_SPEEDS[transitionDuration]);
    puzzle.applyBaseColorToAllPieces(baseColor);

    puzzleViewer.angle = angle;
    puzzleViewer.setScale(INVERSE_PUZZLE_SIZES[size]);
    puzzleViewer.rotateXYZ(angle.z);

    puzzle.isFlipped = (angle.z !== 0); // this is necessary for mousemove event

    puzzle.moveCount = moves;
    moveCountSpan.textContent = moves;

    speedSelector.setText(transitionDuration);
    speedSelector.setValue(speedSelector.max - TRANSITION_SPEEDS[transitionDuration]);

    baseOpacitySelector.setText(toPercentage(baseColor.a));
    baseOpacitySelector.setValue(baseColor.a);

    sizeSelector.setText(`${size}`);
    sizeSelector.setValue(INVERSE_PUZZLE_SIZES[size]);

    skinDropdown.handleItemSelected(skin);
    animationDropdown.handleItemSelected(easingFunction);

    baseColorDropdown.setSummaryBg(baseColor);

    updateBaseColorAvailability(skin);
    updateOpacityAvailability(skin);
}

/**
 * Initialize puzzle whether local storage or default config object.
 */
const initPuzzleConfig = () => {
    const localStorageConfig = JSON.parse(localStorage.getItem(STORAGE_KEYS.PUZZLE_CONFIG));
    if (localStorageConfig) {
        initPuzzleConfigFrom(localStorageConfig);
        defaultPuzzleConfig = localStorageConfig;
    } else {
        initPuzzleConfigFrom(defaultPuzzleConfig);
        localStorage.setItem(STORAGE_KEYS.PUZZLE_CONFIG, JSON.stringify(defaultPuzzleConfig));
    }
}

/**
 * Initialize menu, puzzleViewer, puzzle state and puzzle config.
 */
const initApp = () => {
    initMenu();
    initPuzzleViewer();
    initPuzzleState();
    initPuzzleConfig();
}
/**
 * Attaches a click event listener to "dialogOpenBtn".
 * When clicked, it opens the "dialog" as a modal window. 
 */
dialogOpenBtn.addEventListener("click", () => {
    dialog.showModal();
});

/**
 * Attaches a click event listener to "openSidebarBtn".
 * When clicked, it opens the "sidebar" element.
 */
openSidebarBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
});

/**
 * Attaches a click event listener to "closeSidebarBtn".
 * When clicked, it closes the "sidebar" element.  
 */
closeSidebarBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
});

/**
 * Attaches a click event listener to "dialogOpenBtn".
 * When clicked, it closes the "dialog" modal window. 
 */
dialogCloseBtn.addEventListener("click", () => {
    dialog.close();
});

/**
 * Resets the puzzle to its initial state.
 */
resetBtn.addEventListener("click", handleReset);

/**
 * Manages the flip horizontal and flip vertical buttons.
 */
actionBtns.addEventListener("click", handleAction);

/**
 * Applies a random sequence of moves to scramble the puzzle.
 */
scrambleBtn.addEventListener("click", handleScramble);

/**
 * Adjust the puzzle's scale.
 */
sizeSelector.element.addEventListener("input", handleSizeChange);

/**
 * Changes the layer's rotation speed.
 */
speedSelector.element.addEventListener("change", handleSpeedChange);

/**
 * Changes the puzzle's base Opacity.
 */
baseOpacitySelector.element.addEventListener("input", handleBaseOpacityChange);

/**
 * Attaches event listeners to the "Scene" element for both mouse and touch input.
 * 
 * When a mouse button is pressed down or a touch interaction beggins on the "scene", 
 * the "handleSceneDragStart" function will be triggered.
 * 
 */
scene.addEventListener("mousedown", handleSceneDragStart);
scene.addEventListener("touchstart", handleSceneDragStart, { passive: true });

// ----
// Global Drag Interaction Handlers.
// These listeners track user mouse gestures across the document.
// ----

/**
 * Attaches event listeners for both mouse movement and touch movement.
 * 
 */
document.addEventListener("mousedown", handleDocumentDragStart);
document.addEventListener("touchstart", handleDocumentDragStart);

/**
 * Attaches event listeners for both mouse movement and touch movement.
 * 
 */
document.addEventListener("mousemove", handleDocumentDragMove);
document.addEventListener("touchmove", handleDocumentDragMove);

/**
 * Attaches event listeners to the entire document for handling the conclusion of mouse or touch interactions.
 * 
 */
document.addEventListener("mouseup", handleDocumentDragEnd);
document.addEventListener("touchend", handleDocumentDragEnd);

/**
 * Handles global scroll (wheel) and uses "e.preventDefault()" to override default page behavior.
 * 
 */
document.addEventListener("wheel", handleGlobalWheel, { passive: false });

// ----
// Global Event Listeners
// ----
// These listeners handle keyboard input and initialize the app on page load.

/**
 * Handles key release events
 * Used to trigger puzzle's key state when certain keys are released.
 */
window.addEventListener("keyup", handleKeyUp);

/**
 * Handles key press events.
 * Used to detect which key is pressed to perform puzzle moves.
 */
window.addEventListener("keydown", handleKeydown);

/**
 * Initializes the applocation onde the DOM has fully loaded.
 * Sets up puzzle state, UI and event bindings.
 */
window.addEventListener("DOMContentLoaded", initApp);