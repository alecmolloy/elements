/*
 * Material language module
 *
 * Collection of generic core commands
 */

var model = require('../model'),
    THREE = require('three');
/*
 * Set current model poly count
 *
 * @param {Number} count
 * @return void
 */
function poly(count) {
    model.settings.poly = count;
}

/*
 * Set current model material
 *
 * @param {String} material
 * @return void
 */
function material(val) {
    val = val || 'phong';
    switch (val) {
        case 'basic':
            model.settings.material = THREE.MeshBasicMaterial;
            break;
        case 'depth':
            model.settings.material = THREE.MeshDepthMaterial;
            break;
        case 'lambert':
            model.settings.material = THREE.MeshLambertMaterial;
            break;
        case 'normal':
            model.settings.material = THREE.MeshNormalMaterial;
            break;
        case 'phong':
            model.settings.material = THREE.MeshPhongMaterial;
            break;
        default:
            model.settings.material = THREE.MeshPhongMaterial;
            break;
    }
    updateMaterial();
}

/*
 * Set current model shading type
 *
 * @param {String} color
 * @return void
 */
function shading(type) {
    model.settings.shading = type || THREE.FlatShading;
    updateMaterial();
}

/*
 * Set current model shininess type
 *
 * @param {String} color
 * @return void
 */
function shininess(type) {
    model.settings.shininess = type || 0;
    updateMaterial();
}

/*
 * Set current model sidedness
 *
 * @param {String} sidedness
 * @return void
 */
function sides(val) {
    model.settings.sidedness = typeof val !== 'undefined' ? val : THREE.DoubleSided;
    updateMaterial();
}

/*
 * Set current model specular
 *
 * @param {String} specular
 * @return void
 */
function specular(val) {
    model.settings.specular = typeof val !== 'undefined' ? val : 0x101010;
    updateMaterial();
}

/*
 * Update material settings
 *
 * @return {Object}
 */
function updateMaterial() {
    var config = {
        color: model.settings.color,
        shading: model.settings.shading,
        specular: model.settings.specular,
        shininess: model.settings.shininess,
        transparent: model.settings.opacity < 1,
        opacity: model.settings.opacity,
        side: model.settings.sidedness
    };
    model.elements.material = new model.settings.material(config);
}

module.exports = {
    material: material,
    poly: poly,
    shading: shading,
    shininess: shininess,
    sides: sides,
    specular: specular,
    updateMaterial: updateMaterial
};
