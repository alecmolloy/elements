/*
 * Lights language module
 *
 * Collection of lighting commands
 */

var model = require("../model"),
    utils = require("./utils"),
    THREE = require("three");

model.elements.lights = []

/*
 * Adds an ambient light to the scene
 *
 */
function ambient(color) {
    color = utils.sanitizeColor(color);

    model.elements.ambientLight.color = new THREE.Color(color);

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

    model.renderer.setClearColor(color);

    return model.renderer.getClearColor();
}

/*
 * Adds a directional light to the scene
 *
 */
function directional(color, intensity) {
    color = utils.sanitizeColor(color);

    color = color;
    intensity = intensity || 1.0;

    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(model.cursor.x, model.cursor.y, model.cursor.z);
    model.scene.add(light);

    return light;
}

/*
 * Adds a hemisphere light to the scene
 *
 */
function hemisphere(skyColor, groundColor, intensity) {
    intensity = intensity || 1.0;

    skyColor = utils.sanitizeColor(skyColor);
    skyColor = new THREE.Color(skyColor);

    groundColor = utils.sanitizeColor(groundColor);
    groundColor = new THREE.Color(groundColor);

    model.elements.hemisphereLight.color = skyColor; // since `HemisphereLight` is based on `Light`, 'skyColor' is just called `color`
    model.elements.hemisphereLight.groundColor = groundColor;

    return model.elements.hemisphereLight;
}

/*
 * Adds a point light to the scene
 *
 */
function pointLight(color, position, intensity, distance, decay) {
    color = utils.sanitizeColor(color);

    position = position || [1, 1, 1];
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
