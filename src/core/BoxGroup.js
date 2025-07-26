/**
 * Manages a group of Box3D objects
 * @class 
 */
class BoxGroup {
    /**
     * @private 
     * @type {Array<HTMLElement>} - An array to hold the child HTML elements.
     */
    #children = [];

    /**
     * @private 
     * @type {HTMLElement} - The main HTML div element that acts as the container for all the child elements.
     */
    #element = null;

    /**
     * @private
     * @type {object} - The current 3D position of the box group in the puzzle's coordinate system.
     * @property {number} x - Position along the X-axis.
     * @property {number} x - Position along the Y-axis.
     * @property {number} z - Position along the Z-axis.
     */
    #position = { x: 0, y: 0, z: 0 }

    /**
     * @private 
     * @type {string} - The css "transition-timing-function" value used for animations.
     */
    #transitionTimingFunction = "NORMAL";

    /**
     * @private 
     * @type {string} - The css "transition-duration" value used for animations.
     */
    #transitionDuration = TRANSITION_SPEEDS["Fast"];

    /**
     * @private
     * @type {object} - The current rotation angles of the box group around its X, Y, Z axes.
     * @property {number} x - Angle around the X-axis in degrees.
     * @property {number} x - Angle around the Y-axis in degrees.
     * @property {number} z - Angle around the Z-axis in degrees.
    */
    #angle = { x: ANGLES.NONE, y: ANGLES.NONE, z: ANGLES.NONE }

    /**
     * Constructs a new box group.
     * Initialices the main HTML container element and assigns a base CSS class.
     */
    constructor() {
        this.#element = document.createElement("div");
        this.#element.classList.add("box-group");
    }

    /**
     * Gets the current current rotation angles of the piece around its Z, Y, Z axes.
     * @returns {object} The piece's DOM parent element.
     */
    get element() {
        return this.#element;
    }

    /**
     * @private
     * Applies 3D transformations (position and rotation) to the piece's HTML element.
     * Updates the piece's internal position and angle properties.
     * 
     * @param {object} position - The new 3D position for the piece in pixels.
     * @param {number} position.x - X-axis translation.
     * @param {number} position.y - Y-axis translation.
     * @param {number} position.z - Z-axis translation.
     * @param {object} angle - The new rotation angles for the piece in degrees.
     * @param {number} angle.x - Rotarion around the X-axis.
     * @param {number} angle.y - Rotarion around the Y-axis.
     * @param {number} angle.Z - Rotarion around the Z-axis.
     */
    #transform(position, angle) {
        this.#position = position;
        this.#angle = angle;
        this.element.style.transform = `translateX(${position.x}px) 
                                        translateY(${position.y}px) 
                                        translateZ(${position.z}px) 
                                        rotateX(${angle.x}deg) 
                                        rotateY(${angle.y}deg) 
                                        rotateZ(${angle.z}deg)`;
    }

    /**
     * Sets the 3D position of the piece and applies the transformation visually.
     * 
     * @param {object} position - The new 3D position for the piece in pixels.
     * @param {number} position.x - X-axis translation.
     * @param {number} position.y - Y-axis translation. 
     * @param {number} position.z - Z-axis translation. 
     */
    setPosition(position = this.#position) {
        this.#position = position;
        this.#transform(position, this.#angle);
    }
    /**
     * Rotates the piece around its X-axis to a specified angle and applies the transformation visually. 
     * @param {number} angleX - The new angle for rotation around the X-axis in degrees. 
     */
    rotateX(angleX) {
        this.#angle = { ...this.#angle, x: angleX };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Rotates the piece around its Y-axis to a specified angle and applies the transformation visually. 
     * @param {number} angleY - The new angle for rotation around the Y-axis in degrees. 
     */
    rotateY(angleY) {
        this.#angle = { ...this.#angle, y: angleY };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Rotates the piece around its Z-axis to a specified angle and applies the transformation visually. 
     * @param {number} angleZ - The new angle for rotation around the Z-axis in degrees. 
     */
    rotateZ(angleZ) {
        this.#angle = { ...this.#angle, z: angleZ };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Resets the rotation of the box group element to its default (unrotated) state.
     * It sets all rotation angles (X, Y, Z) to 0 degrees while maintaining the current position.
     */
    resetRotation() {
        this.#transform(this.#position, { x: 0, y: 0, z: 0 });
    }

    /**
     * Sets the duration for CSS transitions on the group's element and applies it.
     * This controls how long transformations take to complete.
     * 
     * @param {number} duration - The transition duration in milliseconds. 
     */
    setTransitionDuration(duration) {
        this.#transitionDuration = duration;
        this.element.style.transition = `${duration}ms transform ${this.#transitionTimingFunction}`;
    }

    /**
     * Sets the easing function for the CSS transitions on the group's element and applies it.
     * This controls the speed curve of the animation over its duration.
     * 
     * @param {string} timingFunction - The CSS "transition-timing-function" value. 
     */
    setTransitionTimingFunction(timingFunction) {
        this.#transitionTimingFunction = timingFunction;
        this.element.style.transition = `${this.#transitionDuration}ms transform ${timingFunction}`;
    }

    /**
     * Hides the entire BoxGroup visually by setting its CSS "visibility" property to hidden.
     * The element will still ocuppy space in the layout but will not be visible.
     */
    hide() {
        this.element.style.visibility = "hidden";
    }

    /**
     * Shows the entire BoxGroup visually by setting its CSS "visibility" property to visible.
     */
    show() {
        this.element.style.visibility = "visible";
    }

    /**
     * Adds an array of Box3D objects to the group, clearing any existing children.
     * It efficiently appends all the elements using a DocumentFragment to minimize Dom reflows.
     * 
     * @param {Array<Box3D>} boxes - An array od Box3D instances to add to this group. 
     */
    addObjectArray(boxes) {
        const fragment = document.createDocumentFragment();
        boxes.forEach(item => fragment.appendChild(item.element));
        this.element.innerHTML = "";
        this.element.appendChild(fragment);
    }

    /**
     * Appends the box group main HTML element to a specified parent DOM element.
     * 
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.element);
    }
}