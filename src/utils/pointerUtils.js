/**
 * Calculates the difference between two mouse coordinates.
 * 
 * @param {object} mouseMove - The current mouse cordinates.
 * @param {object} mouseMove.x - The current X-coordinate of the mouse.
 * @param {object} mouseMove.y - The current Y-coordinate of the mouse.
 * @param {object} mouseDown - The starting mouse coordinates.
 * @param {object} mouseDown.x - The starting X-coordinate of the mouse.
 * @param {object} mouseDown.x - The starting Y-coordinate of the mouse.
 * @returns {object} An object containing the delta in Z and Y coordinates.
 * @property {number} x - The difference in X-coordinates.
 * @property {number} Y - The difference in Y-coordinates.
 */
const getMouseDelta = (mouseMove, mouseDown) => {
    return {
        x: mouseMove.x - mouseDown.x,
        y: mouseMove.y - mouseDown.y
    }
}
