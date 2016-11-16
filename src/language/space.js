/*
 * Space language module
 *
 * Collection of spacial and movement commands
 */

var model = require('../model');

/*
 * Move cursor to absolute x and y positions
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return void
 */
function moveTo(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;

    model.cursor = { x: x, y: y, z: z };
}

/*
 * Move cursor by relative x and y amounts
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return void
 */
function move(x, y, z) {
    y = y || 0;
    z = z || 0;
    moveTo(model.cursor.x + x, model.cursor.y + y, model.cursor.z + z);
}

module.exports = {
    moveTo : moveTo,
    move   : move
};
