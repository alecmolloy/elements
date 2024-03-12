/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var model = require('../model'),
    THREE = require('three');


function makeMesh(geometry) {
    material = model.elements.material;
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = model.cursor.x;
    mesh.position.y = model.cursor.y;
    mesh.position.z = model.cursor.z;
    model.scene.add(mesh);
    return mesh;
}

/*
 * Draw a box using current cursor position as origin
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Number} depth
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function box(width, height, depth, widthSegments, heightSegments, depthSegments) {
    width = typeof width !== 'undefined' ? width : 10;
    height = typeof height !== 'undefined' ? height : width;
    depth = typeof depth !== 'undefined' ? depth : width;
    widthSegments = typeof widthSegments !== 'undefined' ? widthSegments : 1;
    heightSegments = typeof widthSegments !== 'undefined' ? widthSegments : 1;
    depthSegments = typeof depthSegments !== 'undefined' ? depthSegments : 1;

    var mesh = makeMesh(new THREE.BoxGeometry(width, height, depth));
    return mesh;
}

/*
 * Draw a cylinder using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} height
 * @param {Boolean} openEnded
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function cylinder(radius, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength) {
    radius = typeof radius !== 'undefined' ? radius : 5;
    height = typeof height !== 'undefined' ? height : radius * 2;
    radiusSegments = typeof radiusSegments !== 'undefined' ? radiusSegments : model.settings.poly;
    heightSegments = typeof heightSegments !== 'undefined' ? heightSegments : 1;
    openEnded = typeof openEnded !== 'undefined' ? openEnded : false;
    thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
    thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI * 2;

    // Cylinders can have different radii for top and bottom parts. If initialised with a number, make it an object:
    radius = typeof radius === 'number' ? {
        top: radius,
        bottom: radius
    } : radius;

    var mesh = makeMesh(new THREE.CylinderGeometry(radius.top, radius.bottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength));
    return mesh;
}
/*
 * Draw a square using current cursor position as origin
 *
 * @param {Number} size
 * @return mesh
 */
function cube(size) {
    return box(size, size, size);
}

/*
 * Draw a icosahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function icosahedron(radius) {
    radius = typeof radius !== 'undefined' ? radius : 10;

    var mesh = makeMesh(new THREE.IcosahedronGeometry(radius));
    return mesh;
}

/*
 * Draw a dodecahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function dodecahedron(radius) {
    radius = typeof radius !== 'undefined' ? radius : 10;

    var geometry = new THREE.DodecahedronGeometry(radius);
    var mesh = makeMesh(geometry);
    return mesh;
}

/*
 * Draw an octahedron using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function octahedron(radius) {
    radius = typeof radius !== 'undefined' ? radius : 10;

    var mesh = makeMesh(new THREE.OctahedronGeometry(radius));
    return mesh;
}

/*
 * Draw a plane using current cursor position as origin
 *
 * @param {Number} width
 * @param {Number} height
 * @return mesh
 *
 */
function plane(width, height) {
    width = typeof width !== 'undefined' ? width : 10;
    height = typeof height !== 'undefined' ? height : width;

    var mesh = makeMesh(new THREE.PlaneGeometry(width, height));
    return mesh;
}

/*
 * Draw a ring using current cursor position as origin
 *
 * @param {Number} innerRadius
 * @param {Number} outerRadius
 * @param {Number} thetaSegments
 * @param {Number} phiSegments
 * @param {Number} thetaStart
 * @param {Number} thetaLength
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 * TODO: more efficient positioning
 */
function ring(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength) {
    innerRadius = typeof innerRadius !== 'undefined' ? innerRadius : 10;
    outerRadius = typeof outerRadius !== 'undefined' ? outerRadius : innerRadius + 5;
    thetaSegments = typeof thetaSegments !== 'undefined' ? thetaSegments : model.settings.poly;
    phiSegments = typeof phiSegments !== 'undefined' ? phiSegments : model.settings.poly;
    thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
    thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI * 2;

    var mesh = makeMesh(new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength));
    return mesh;
}

/*
 * Draw a sphere using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} widthSegments
 * @param {Number} heightSegments
 * @param {Number} phiStart
 * @param {Number} phiLength
 * @param {Number} thetaStart
 * @param {Number} thetaLength
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function sphere(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
    radius = typeof radius !== 'undefined' ? radius : 10;
    widthSegments = typeof widthSegments !== 'undefined' ? widthSegments : model.settings.poly;
    heightSegments = typeof heightSegments !== 'undefined' ? heightSegments : model.settings.poly;
    phiStart = typeof phiStart !== 'undefined' ? phiStart : 0;
    phiLength = typeof phiLength !== 'undefined' ? phiLength : Math.PI * 2;
    thetaStart = typeof thetaStart !== 'undefined' ? thetaStart : 0;
    thetaLength = typeof thetaLength !== 'undefined' ? thetaLength : Math.PI;

    var mesh = makeMesh(new THREE.SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength));
    return mesh;
}

/*
 * Draw a SHAPE using current cursor position as origin
 *
 * @param {Number} radius
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function tetrahedron(radius) {
    radius = typeof radius !== 'undefined' ? radius : 10;

    var mesh = makeMesh(new THREE.TetrahedronGeometry(radius));
    return mesh;
}

/*
 * Draw a torus using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} tube
 * @param {Number} radialSegments
 * @param {Number} tubularSegments
 * @param {Number} arc
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function torus(radius, tube, radialSegments, tubularSegments, arc) {
    radius = typeof radius !== 'undefined' ? radius : 5;
    tube = typeof tube !== 'undefined' ? tube : 1;
    radialSegments = typeof radialSegments !== 'undefined' ? radialSegments : model.settings.poly;
    tubularSegments = typeof tubularSegments !== 'undefined' ? tubularSegments : model.settings.poly;
    arc = typeof arc !== 'undefined' ? arc : Math.PI * 2;

    var mesh = makeMesh(new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc));
    return mesh;
}

/*
 * Draw a torus knot using current cursor position as origin
 *
 * @param {Number} radius
 * @param {Number} tube
 * @param {Number} radialSegments
 * @param {Number} tubularSegments
 * @param {Number} p
 * @param {Number} q
 * @param {Number} heightScale
 * @return mesh
 *
 * TODO: better geometry, material, and mesh instancing
 * TODO: more efficient positioning
 */
function torusKnot(radius, tubeRadius, p, q, radialSegments, tubularSegments, heightScale) {
    radius = typeof radius !== 'undefined' ? radius : 5;
    tubeRadius = typeof tubeRadius !== 'undefined' ? tubeRadius : 1;
    p = typeof p !== 'undefined' ? p : 2;
    q = typeof q !== 'undefined' ? q : 3;
    radialSegments = typeof radialSegments !== 'undefined' ? radialSegments : model.settings.poly * 8;
    tubularSegments = typeof tubularSegments !== 'undefined' ? tubularSegments : model.settings.poly * 1.5;
    heightScale = typeof heightScale !== 'undefined' ? heightScale : 1;

    var mesh = makeMesh(new THREE.TorusKnotGeometry(radius, tubeRadius, radialSegments, tubularSegments, p, q, heightScale));
    return mesh;
}

module.exports = {
    box: box,
    cube: cube,
    cylinder: cylinder,
    dodecahedron: dodecahedron,
    donut: torus,
    ico: icosahedron,
    icosahedron: icosahedron,
    octahedron: octahedron,
    plane: plane,
    ring: ring,
    sphere: sphere,
    tetrahedron: tetrahedron,
    torus: torus,
    torusKnot: torusKnot
};
