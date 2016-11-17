/*
 * Lights language module
 *
 * Collection of lighting commands
 */

var model = require("../model"),
    utils = require("./utils"),
    THREE = require("three");

/*
 * Adds an ambient light to the scene
 *
 */
function ambient(color) {
    color = utils.sanitizeColor(color);

    color = color || model.settings.ambientLight;
    model.settings.ambientLight = color;
    model.elements.ambientLight = new THREE.AmbientLight(color);
    model.scene.add(model.elements.ambientLight);
    return model.elements.ambientLight;
}

/*
 * Set a background color
 *
 * @param {String} color
 * @return void
 */
function background(color) {
    color = utils.parseColor(color);

    model.settings.bg = color;
    model.renderer.setClearColor(color);
}

/*
 * Adds a directional light to the scene
 *
 */
function directional(color, position, intensity) {
    color = utils.sanitizeColor(color);

    position = position || [1, 1, 1];
    color = color || '#FFF';
    intensity = intensity || 1.0;

    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(position[0], position[1], position[2]);
    model.scene.add(light);
    model.elements.lights.push(light);
    return light;
}

/*
 * Adds a hemisphere light to the scene
 *
 */
function hemisphere(skyColor, groundColor, intensity) {
    skyColor = utils.sanitizeColor(skyColor) || '#FFF';
    groundColor = utils.sanitizeColor(groundColor) || '#FFF';
    intensity = intensity || 1.0;

    var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    model.scene.add(light);
    model.elements.lights.push(light);
    return light;
}

/*
 * Adds a point light to the scene
 *
 */
function pointLight(color, position, intensity, distance, decay) {
    color = utils.sanitizeColor(color);

    position = position || [100, 100, 100];
    intensity = intensity || 1;
    distance = distance || 0;
    decay = decay || 1;

    var light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(position[0], position[1], position[2]);
    model.scene.add(light);
    model.elements.lights.push(light);
    return light;
}

/*
 * Adds a spot light to the scene
 *
 */
function spot(color, position, intensity, angle, distance, exponent, decay) {
    color = utils.sanitizeColor(color);

    position = position || [100, 100, 100];
    color = color || '#fff';
    intensity = intensity || 1.0;
    angle = angle * Math.PI / 180 || 10 * Math.PI / 180;
    distance = distance || Infinity;
    exponent = exponent || 250;
    decay = decay || 1;

    var light = new THREE.SpotLight(color, intensity, distance, angle, exponent, decay);
    light.position.set(position[0], position[1], position[2]);
    model.scene.add(light);
    model.elements.lights.push(light);
    return light;
}

module.exports = {
    ambient: ambient,
    background: background,
    directional: directional,
    hemisphere: hemisphere,
    pointLight: pointLight,
    light: pointLight,
    spot: spot
};
