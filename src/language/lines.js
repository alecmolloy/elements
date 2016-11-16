var compounds = require("./compounds"),
	utils = require("./utils"),
	model = require('../model');

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

function lineTo(x, y, z, openTop, openBottom) {
	compounds.capsule(x - model.cursor.x, y - model.cursor.y, z - model.cursor.z);
}

module.exports = {
	line: compounds.capsule,
	lineTo: lineTo,
	strokeColor: strokeColor,
	strokeWidth: strokeWidth,
	stroke: stroke
};