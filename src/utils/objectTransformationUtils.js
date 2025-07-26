/**
 * Converts an object into an array of its [key, value] pairs.
 * This is a wrapper around "Object.entries()".
 *  
 * @param {object} object - The Object to convert. 
 * @returns {Array<Array<any>>} An array of arrays.
 */
const objectToArray = (object) => {
    return Object.entries(object);
}

/**
 * Converts an array of [key, value] pairs back into an object.
 * This is a wrapper aroun "Object.fromEntries()".
 * 
 * @param {Array<Array<any>>} array - The input array of [key, value] pairs. 
 * @returns {object} A new object constructed from th array entries.
 */
const arrayToObject = (array) => {
    return Object.fromEntries(array);
}

/**
 * Invers the keys and values of an object.
 * 
 * @param {object} object - The object to invert. 
 * @returns {object} A new object with inverted keys and values.
 */
const invertObject = (object) => {
    return arrayToObject(objectToArray(object).map(([key, value]) => [value, key]));
}