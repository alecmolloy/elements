var utils = require("./utils"),
    model = require("../model"),
    THREE = require("three");

function line(dx, dy, dz) {
    dx = dx || 0;
    dy = dy || 0;
    dz = dz || 0;

    var x = model.cursor.x + dx;
    var y = model.cursor.y + dy;
    var z = model.cursor.z + dz;
    lineTo(x, y, z);
}

function lineTo(x, y, z) {
    x = x || 0;
    y = y || 0;
    z = z || 0;

    // Todo: add stroke to modify this
    var material = new THREE.LineBasicMaterial({
        color: model.settings.stroke.color,
        linewidth: model.settings.stroke.width,
        linecap: "round",
        linejoin: "round"
    });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(model.cursor.x, model.cursor.y, model.cursor.z),
        new THREE.Vector3(x, y, z)
    );

    var line = new THREE.Line(geometry, material);
    model.scene.add(line);
}

/*
 * Set current model stroke color
 *
 * @param {String} color
 * @return void
 */
function strokeColor(color) {
    color = utils.parseColor(color);
    model.settings.stroke.color = color;
}

/*
 * Set current model stroke width
 *
 * @param {Number} val
 * @return void
 */
function strokeWidth(val) {
    model.settings.stroke.width = val;
}

/*
 * Set current model mixed stroke attributes
 *
 * @param {*...} attributes
 * @return void
 */
function stroke() {
    var style = utils.parseLineStyle(arguments);
    if (style.color) {
        strokeColor(style.color);
    }
    if (typeof style.width !== 'undefined') {
        strokeWidth(style.width);
    }
}

module.exports = {
    line: line,
    lineTo: lineTo,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth,
    stroke: stroke
};
