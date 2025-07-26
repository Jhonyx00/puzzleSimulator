/**
 * Manages the 3D visual representation and camera controls of the puzzle.
 * This clase handles rotation, scaling and the overall perspective in the UI.
 */

class PuzzleViewer {
    /**
     * @property {HTMLElement} element -The main HTML div element that serves as the virtual container for the puzzle.
     * @property {number} angleX - The current rotation angle around the X-axis in degrees.
     * @property {number} angleY - The current rotation angle around the Y-axis in degrees.
     * @property {number} angleZ - The current rotation angle around the Z-axis in degrees.
     * @property {number} rotationSpeed - A multiplier determining how fast the puzzle rotates in response to mouse movement.
     * @property {number} scale - The current visual scale for the puzzle viewer.
     * @property {boolean} isPuzzleFliped - A flag indicating if the puzzle is logically in a "flipped" state.
     */
    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("puzzle-viewer");
        this.angleX = ANGLES.NONE;
        this.angleY = ANGLES.NONE;
        this.angleZ = ANGLES.NONE;
        this.rotationSpeed = 0.3;
        this.scale = INVERSE_PUZZLE_SIZES["Normal"];
        this.isPuzzleFliped = false;
    }

    /**
     * Gets the current Y-axis angle, normalized to be within a 0 to 360-degree range.
     * 
     * @returns {number} The Y-axis angle modulo 360 degrees
     */
    get positiveAngleY() {
        return this.angleY % ANGLES.FULL;
    }

    /**
     * Gets the current 3D rotation angles of the puzzle viewer.
     * 
     * @returns {object} An object containing the X, Y and Z rtation angles.
     * @returns {number} x - Angle around the X-axis.
     * @returns {number} y - Angle around the Y-axis. 
     * @returns {number} z - Angle around the Z-axis. 
     */
    get angle() {
        return { x: this.angleX, y: this.angleY, z: this.angleZ };
    }

    /**
     * Sets the 3D rotation angles of the puzzle viewer.
     * Does not apply visual rotations.
     * 
     * @param {object} angle - An object containing the new X, Y and Z rotation angles.
     * @param {object} angle.x - New angle around the X-axis.
     * @param {object} angle.y - New angle around the Y-axis. 
     * @param {object} angle.z - New angle around the Z-axis. 
     */
    set angle(angle) {
        this.angleX = angle.x;
        this.angleY = angle.y;
        this.angleZ = angle.z;
    }

    /**
     * Performs a rotation of the puzzle viewer based on muse movement differences.
     * It updates "angleX" and "angleY" and adjusts "angleZ" based on the puzzle's flipped state.
     * @param {object} mouseDiff - An object containing the difference in mouse coordinates.
     * @param {number} mouseDiff.x - The change in X-coordinate from the last mouse event.
     * @param {number} mouseDiff.y - The change in Y-coordinate from the last mouse event. 
     * @param {boolean} isPuzzleFliped - Indicates if the puzzle is currently logically flipped.  
     */
    performRotation(mouseDiff, isPuzzleFliped) {
        const deltaX = (mouseDiff.x * this.rotationSpeed);
        const deltaY = (mouseDiff.y * this.rotationSpeed);

        this.angleY += deltaX;
        this.angleX -= deltaY;

        if (!isPuzzleFliped) {
            this.angleZ = ANGLES.NONE;
        }
        else {
            this.angleZ = ANGLES.HALF;
        }

        this.angleX = Math.max(-ANGLES.QUARTER, Math.min(ANGLES.QUARTER, this.angleX));
        this.rotateXYZ(this.angleZ);
    }

    /**
     * Sets the visual scale of the puzzle viewer and inmediately applies the transformation.
     * 
     * @param {number} scale - The new scale factor. 
     */
    setScale(scale) {
        this.scale = scale;
        this.element.style.transform = `
                        scale(${scale})
                        rotateX(${this.angleX}deg) 
                        rotateY(${this.angleY}deg) 
                        rotateZ(${this.angleZ}deg)`;
    }

    /**
     * Handles the puzzle's Z-axis rotation based on its logical flipped state.
     * If flipped, it rotates 180 degrees around Z; otherwise, it rotates 0 degrees.
     * 
     * @param {boolean} isPuzzleFliped - Indicates if the puzzle is currently logically flipped.
     */
    handleRotation(isPuzzleFliped) {
        isPuzzleFliped
            ? this.rotateXYZ(180)
            : this.rotateXYZ(0);
    }

    /**
     * Applies the current XYZ rotation to the puzzle viewer's element.
     * This is the core method for rendering the 3D orientation.
     * 
     * @param {number} [angleZ=ANGLES.NONE] - The Z-axis angle to apply. Defaults to 0 if not provided. 
     */
    rotateXYZ(angleZ = ANGLES.NONE) {
        this.angleZ = angleZ;
        this.element.style.transform = `
                        scale(${this.scale})
                        rotateX(${this.angleX}deg) 
                        rotateY(${this.angleY}deg) 
                        rotateZ(${angleZ}deg)`;
    }

    /**
     * Sets the Y-axis rotation angle, Note: This method updates the internal angle but does not apply the visual rotation.
     * 
     * @param {number} angleY - The new Y-axis angle in degrees.
     */
    rotateY(angleY) {
        this.angleY = angleY;
    }

    /**
     * Appends the Puzzle's Viewer main HTML element to a specified parent DOM element.
     * This makes the puzzle viewer visible within the document.
     * 
     * @param {HTMLElement} parent - The DOM element to which the puzzle viewer's element will be appended.
     */
    insertTo(parent) {
        parent.appendChild(this.element);
    }
}