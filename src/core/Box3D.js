/**
 * Generates a 3D Box using HTML elements and css transforms.
 * Creates six faces (front, back, top, right, left, bottom).
 * Each face i sabsolutely positioned and transformed in 3D space to form a rectangular prism.
 * @class
 */

class Box3D {
    /**
    * The unique id for this 3D Element.
    * @private
    * @type {number}
    */
    #id = -1;

    /**
    * An object storing the colors for each face of the piece.
    * @private
    * @type {object}
    */
    #colors = {};

    /**
    * The parent HTML div element that contains six faces of the piece and represents this piece in the DOM.
    * @private
    * @type {HTMLElement}
    */
    #element = null;

    /**
    * A map storing the HTML elements for each face of the piece
    * Keys are face indices, values are their respective DOM elements.
    * @private
    * @type {Map<number, HTMLElement>}
    */
    #faces = new Map();

    /**
    * @private
    * @type {object} - The current rotation angles of the piece around its X, Y, Z axes.
    * @property {number} x - Angle around the X-axis in degrees.
    * @property {number} x - Angle around the Y-axis in degrees.
    * @property {number} z - Angle around the Z-axis in degrees.
    */
    #angle = { x: 0, y: 0, z: 0 }

    /**
    * @private
    * @type {object} - The current 3D position of the piece in the puzzle's coordinate system.
    * @property {number} x - Position along the X-axis.
    * @property {number} x - Position along the Y-axis.
    * @property {number} z - Position along the Z-axis.
    */
    #position = { x: 0, y: 0, z: 0 }

    /**
    * @private
    * @type {object} - The dimensions of the piece.
    * @property {number} width - The width of the piece.
    * @property {number} height - The height of the piece.
    * @property {number} depth - The depth of the piece.
    */
    #dimension = { width: 0, height: 0, depth: 0, }

    /**
     * Constructs a rectangular prism.
     * Initializes its dimensions, creates the main HTML element and sets up its faces
     * 
     * @param {object} dimension - An object specifying the dimensions of the piece.
     * @property {number} dimension.width - The width of the piece.
     * @property {number} dimension.height - The height of the piece.
     * @property {number} dimension.depth - The depth of the piece.
     */
    constructor(dimension) {
        this.#dimension = dimension;
        this.#element = document.createElement("div");
        this.#element.classList.add("box");

        this.#setElementStyle(this.#element, { width: `${this.#dimension.width}px`, height: `${this.#dimension.height}px` });


        /**
         * Defines the default properties for each of the six faces of the 3D box.
         * The keys correspond to specific faces:
         * 0 - front
         * 1 - top
         * 2 - right
         * 3 - back
         * 4 - left
         * 5 - bottom
         */
        const facesProps = {
            0: { width: this.#dimension.width, height: this.#dimension.height, angleX: 0, angleY: 0, translateZ: this.#dimension.depth * 0.5 },
            1: { width: this.#dimension.width, height: this.#dimension.depth, angleX: 90, angleY: 0, translateZ: this.#dimension.depth * 0.5 },
            2: { width: this.#dimension.depth, height: this.#dimension.height, angleX: 0, angleY: 90, translateZ: this.#dimension.width - this.#dimension.depth * 0.5 },
            3: { width: this.#dimension.width, height: this.#dimension.height, angleX: 0, angleY: 180, translateZ: this.#dimension.depth * 0.5 },
            4: { width: this.#dimension.depth, height: this.#dimension.height, angleX: 0, angleY: -90, translateZ: this.#dimension.depth * 0.5 },
            5: { width: this.#dimension.width, height: this.#dimension.depth, angleX: -90, angleY: 0, translateZ: this.#dimension.height - this.#dimension.depth * 0.5 },
        };

        this.#createFaces(facesProps);
    }

    /**
     * Gets the object containing the colors for each face of the piece.
     * @returns {object} The colors object.
     */
    get colors() {
        return this.#colors;
    }

    /**
     * Gets the unique identifier of the piece.
     * @returns {number} The piece's ID.
     */
    get id() {
        return this.#id;
    }

    /**
     * Gets the dimensions of the piece.
     * @returns {object} An object containing the piece's dimensions.
     * @property {number} width
     * @property {number} height
     * @property {number} depth
     */
    get dimension() {
        return this.#dimension;
    }

    /**
     * Sets the dimensions of the piece.
     * @param {object} dimension - The new dimensions for the piece.
     * @param {number} dimension.width
     * @param {number} dimension.height
     * @param {number} dimension.depth
     */
    set dimension(dimension) {
        this.#dimension = dimension;
    }

    /**
     * Sets the 3D position of the piece.
     * @param {object} position - The new position for the piece.
     * @param {number} position.x
     * @param {number} position.y
     * @param {number} position.z
     */
    set position(position) {
        this.#position = position;
    }

    /**
     * Gets the current 3D position of the piece.
     * @returns {object} An object containing the piece's position.
     * @property {number} x
     * @property {number} y
     * @property {number} z
     */
    get position() {
        return this.#position;
    }

    /**
     * Sets rotation angles of the piece around its X, Y, Z axes.
     * @param {object} angle - The new rotation angles for the piece.
     * @param {number} angle.x
     * @param {number} angle.y
     * @param {number} angle.z
     */
    set angle(angle) {
        this.#angle = angle;
    }

    /**
     * Gets the current current rotation angles of the piece around its Z, Y, Z axes.
     * @returns {object} An object containing the piece's rotation angles.
     * @property {number} x
     * @property {number} y
     * @property {number} z
     */
    get angle() {
        return this.#angle;
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
     * Creates an HTML div element for each face and places it into its parent container.
     * 
     * @param {object} facesProps - An object containing the properties for each face of the 3D box.
     */
    #createFaces(facesProps) {
        this.element.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const face = document.createElement("div");
            face.classList.add("box-face");
            const faceProp = facesProps[i];
            face.setAttribute("data-face", `${i}`);

            this.#setElementStyle(face, {
                width: `${faceProp.width}px`,
                height: `${faceProp.height}px`,
                transform: `
                        rotateX(${faceProp.angleX}deg) 
                        rotateY(${faceProp.angleY}deg)
                        translateZ(${faceProp.translateZ}px)`
            });
            this.#faces.set(i, face);
            this.element.appendChild(face);
        }
    }

    /**
     * @private
     * Sets CSS styles on a given HTML element.
     * It merges the provided "styles" object into the element's style property.
     * 
     * @param {HTMLElement} element - The HTML element to apply styles to.
     * @param {object} styles - An object where keys are CSS properties (camelCase) and values are their corresponding values.
     */
    #setElementStyle(element, styles) {
        Object.assign(element.style, styles);
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
    setPosition(position) {
        this.#position = position;
        this.#transform(position, this.#angle);
    }

    /**
     * Rotates the piece around its X-axis to a specified angle and applies the transformation visually. 
     * 
     * @param {number} angleX - The new angle for rotation around the X-axis in degrees. 
     */
    rotateX(angleX) {
        this.#angle = { ...this.#angle, x: angleX };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Rotates the piece around its Y-axis to a specified angle and applies the transformation visually. 
     * 
     * @param {number} angleY - The new angle for rotation around the Y-axis in degrees. 
     */
    rotateY(angleY) {
        this.#angle = { ...this.#angle, y: angleY };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Rotates the piece around its Z-axis to a specified angle and applies the transformation visually. 
     * 
     * @param {number} angleZ - The new angle for rotation around the Z-axis in degrees. 
     */
    rotateZ(angleZ) {
        this.#angle = { ...this.#angle, z: angleZ };
        this.#transform(this.#position, this.#angle);
    }

    /**
     * Sets the unique identifier for the piece and updates its corresponding data attribute on the DOM element.
     * 
     * @param {number} id - The unique ID to assign to this piece. 
     */
    setPieceId(id) {
        this.#id = id;
        this.element.setAttribute("data-piece-id", `${id}`);
    }

    /**
     * Hides the piece visually by removing the "hidden-element" CSS class to its DOM element.
     */
    hide() {
        this.element.classList.add("hidden-element");
    }

    /**
     * Shows the piece visually by removing the "hidden-element" CSS class from its DOM element.
     */
    show() {
        this.element.classList.remove("hidden-element");
    }

    /**
     * Sets the background color for all faces of the piece.
     * 
     * @param {object} color - The color object: ({r, g, b, a}). to apply to all faces. 
     */
    setBaseColor(color) {
        this.#faces.forEach(face => {
            face.style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        })
    }

    /**
     * Sets both background image and background color for all faces of the piece.
     * This is useful for applying textures or complex skins while retaining a fallback color.
     * 
     * @param {string} bg - The CSS background-image value
     * @param {object} color - The color object: ({r, g, b, a}).
     */
    setBgOnAllFaces(bg, color) {
        this.#faces.forEach(face => {
            face.style.backgroundImage = bg;
            face.style.backgroundColor = `rgba(${color.r},${color.g},${color.b},${color.a})`;
        });
    }

    /**
     * Sets a background image for all faces of the piece.
     * 
     * @param {string} image - The CSS background-image value.
     */
    setImgOnAllFaces(image) {
        this.#faces.forEach(face => face.style.backgroundImage = image);
    }

    /**
     * Removes any background image from all faces of the piece setting the backgroundImage style to an empty string.
     */
    removeImageFromAllFaces() {
        this.#faces.forEach(face => face.style.backgroundImage = "");
    }

    /**
     * Sets the background color of the specified face by the color object.
     * 
     * @param {*} colorObject - The colors object 
     */
    setBackground(colorObject) {
        this.#colors = colorObject;
        if (!colorObject && typeof colorObject !== Object) return;
        Object.entries(colorObject).forEach(([index, object]) =>
            this.#faces.get(Number(index)).style.backgroundImage = object.url
        )
    }

    /**
     * Appends the 3D piece main HTML element to a specified parent DOM element.
     * 
     * @param {HTMLElement} parent - The DOM element to which the element will be appended. 
     */
    insertTo(parent) {
        parent.appendChild(this.element);
    }
}