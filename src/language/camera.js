var THREE = require("three"),
    model = require("../model");

/*
 * Set the camera's position
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @return void
 */

function camera(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;
    model.cameras.main.position.set(x, y, z);
}

function lookAt(x, y, z) {
    x = typeof x !== 'undefined' ? x : 0;
    y = typeof y !== 'undefined' ? y : 0;
    z = typeof z !== 'undefined' ? z : 0;
    model.cameraControls.target.set(x, y, z);
}

module.exports = {
    camera: camera,
    lookAt: lookAt
};
