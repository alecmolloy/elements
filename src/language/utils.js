/*
 * Utils language module
 *
 * Basic collection of utility commands
 */

var palette = require('./palette.json');
/*
 * Parse stroke attributes from string and return stroke settings object
 *
 * @param {Boolean} close
 * @return {Object}
 */
function parseLineStyle(attributes) {
    var out = {},
        i, attr;

    for (i = 0 ; i < attributes.length; i += 1) {
        attr = attributes[i];

        if (typeof attr === 'number') {
            out.width = attr;
        } else {
            out.color = attr;
        }
    }

    return out;
}

/*
 * Get a color from palette if it's an existing key or just return
 *
 * @param {String} val
 * @return void
 */
function parseColor(val) {
    return palette[val] || val;
}

/*
 * Convert true/false values to their proper colors, and provide a default white
 *
 * @param {*} val
 * @return {*}
 */
function sanitizeColor(val) {
	if (val === true || val === undefined) {
		val = '#FFF';
	} else if (val === false) {
		val = '#000';
    }
    return val;
}

/*
 * Given value is a valid color
 *
 * @param {*} val
 * @return {Boolean}
 */
function isColorValue(val) {
    if (typeof val !== 'string') { return false; }

    if (val.substr(0, 1) === '#' && val.length > 3 && val.length <= 7) {
        return true;
    } else if (palette[val]) {
        return true;
    }

    return false;
}

module.exports = {
    parseColor       : parseColor,
    parseLineStyle   : parseLineStyle,
    isColorValue     : isColorValue,
    sanitizeColor    : sanitizeColor
};
