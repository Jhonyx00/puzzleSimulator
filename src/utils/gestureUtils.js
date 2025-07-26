/**
 * Calculates the difference between two mouse|touch coordinates.
 * 
 * @param {object} dragMove - The current mouse or touch cordinates.
 * @param {object} dragMove.x - The current X-coordinate of the mouse|touch.
 * @param {object} dragMove.y - The current Y-coordinate of the mouse|touch.
 * @param {object} dragStart - The starting mouse coordinates.
 * @param {object} dragStart.x - The starting X-coordinate of the mouse|touch.
 * @param {object} dragStart.x - The starting Y-coordinate of the mouse|touch.
 * @returns {object} An object containing the delta in Z and Y coordinates.
 * @property {number} x - The difference in X-coordinates.
 * @property {number} Y - The difference in Y-coordinates.
 */
const getDragDelta = (dragMove, dragStart) => {
    return {
        x: dragMove.x - dragStart.x,
        y: dragMove.y - dragStart.y
    }
}

/**
 * Extracts the X and Y coordinates from a given mouse or touch event.
 * 
 * @param {MouseEvent | TouchEvent} e - The mouse or touch event object. 
 * @returns {object} An object containing the clientX and clientY coordinates of the event.
 * @property {number} x - The X-coordinate relative to the viewport.
 * @property {number} y - The Y-coordinate relative to the viewport.
 */
const getEventPosition = (e) => {
    if (e.touches) {
        return {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        }
    }
    else {
        return {
            x: e.clientX,
            y: e.clientY,
        }
    }
}