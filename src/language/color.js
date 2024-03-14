/*
 * Color language module
 *
 * Collection of color commands
 */

var Color = require('color'),
  model = require('../model'),
  utils = require('./utils'),
  material = require('./material')

/*
 * Set current model color
 *
 * @param {String} color
 * @return void
 */
function color(val) {
  val = utils.parseColor(val)
  model.settings.color = val || 'transparent'
  material.updateMaterial()
}

/*
 * Get color brightness or set it to value if it's passed
 *
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function brightness(color, amount) {
  if (amount == null) {
    return Color(color).lightness()
  } else {
    return Color(color).lightness(amount).hex()
  }
}

/*
 * Set relative brightness of color
 *
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function brighten(color, amount) {
  return Color(color).lighten(amount).hex()
}

/*
 * Set relative brightness of color
 *
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function darken(color, amount) {
  return Color(color).darken(amount).hex()
}

/*
 * Get color satuation or set it to value if it's passed
 *
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function saturation(color, amount) {
  if (amount == null) {
    return Color(color).saturationl()
  } else {
    return Color(color).saturationl(amount).hex()
  }
}

/*
 * Get color hue or set it to value if it's passed
 *
 * @param {String} color
 * @param {Number}* amount
 * @return {String|Number}
 */
function hue(color, amount) {
  if (amount == null) {
    return Color(color).hue()
  } else {
    return Color(color).hue(amount).hex()
  }
}

/*
 * Rotate color hue by given amount
 *
 * @param {String} color
 * @param {Number} amount
 * @return {String}
 */
function rotate(color, amount) {
  return Color(color).rotate(amount).hex()
}

/*
 * Rotate color hue by given amount
 *
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @return {String}
 */
function rgb(red, green, blue) {
  return 'rgb(' + red + ', ' + green + ', ' + blue + ')'
}

/*
 * Rotate alpha color hue by given amount
 *
 * @param {Number} red
 * @param {Number} green
 * @param {Number} blue
 * @param {Number} alpha
 * @return {String}
 */
function rgba(red, green, blue, alpha) {
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')'
}

/*
 * Mix given colors balancing on given percentage
 *
 * @param {String} a
 * @param {String} b
 * @param {Number} amount
 * @return {String}
 */
function mix(a, b, amount) {
  amount = amount || 50
  return Color(a)
    .mix(Color(b), amount / 100)
    .hex()
}

function lightness(color, amount) {
  if (amount == null) {
    return Color(color).lightness()
  } else {
    return Color(color).lightness(amount).hex()
  }
}

module.exports = {
  color,
  brightness,
  brighten,
  darken,
  mix,
  saturation,
  hue,
  rotate,
  rgb,
  rgba,
  lightness,
}
