// /*
//  * Compound shapes language module
//  *
//  * Collection of compound shape commands
//  */

// import model from '../model'
// import * as THREE from 'three'

// /**
//  *
//  */
// interface CapsuleProps {
//   dx: number
//   dy: number
//   dz: number
//   openTop: boolean
//   openBottom: boolean
// }
// export function capsule({
//   dx = 0,
//   dy = 0,
//   dz = 0,
//   openTop = false,
//   openBottom = false,
// }: CapsuleProps) {
//   const radius = {
//     top: model.settings.stroke.width,
//     bottom: model.settings.stroke.width,
//   }
//   openTop = false
//   openBottom = false

//   var bottom = new THREE.Vector3(model.cursor.x, model.cursor.y, model.cursor.z)
//   var top = new THREE.Vector3(
//     model.cursor.x + dx,
//     model.cursor.y + dy,
//     model.cursor.z + dz
//   )

//   const material = new THREE.MeshPhongMaterial({
//     color: model.settings.stroke.color,
//     flatShading: model.settings.flatShading,
//     specular: model.settings.specular,
//     shininess: model.settings.shininess,
//     side: THREE.FrontSide,
//   })

//   var capsule = new THREE.Object3D()
//   // get cylinder height
//   var cylAxis = new THREE.Vector3()
//   cylAxis.subVectors(top, bottom)
//   var length = cylAxis.length()

//   // get cylinder center for translation
//   var center = new THREE.Vector3()
//   center.addVectors(top, bottom)
//   center.divideScalar(2.0)

//   // always open-ended
//   var cylinderGeo = new THREE.CylinderGeometry(
//     radius.top,
//     radius.bottom,
//     length,
//     model.settings.poly,
//     1,
//     !openTop || !openBottom,
//     0
//   )
//   var cylinder = new THREE.Mesh(cylinderGeo, material)

//   capsule.add(cylinder)

//   // pass in the cylinder itself, its desired axis, and the place to move the center

//   // Sphere geometry to cap the cylinder if openTop and/or openBottom is false
//   var sphereTopGeo = new THREE.SphereGeometry(
//     radius.top,
//     model.settings.poly,
//     model.settings.poly
//   )
//   var sphereBottomGeo = new THREE.SphereGeometry(
//     radius.bottom,
//     model.settings.poly,
//     model.settings.poly
//   )
//   if (!openBottom) {
//     var sphereBottom = new THREE.Mesh(sphereBottomGeo, material)
//     capsule.add(sphereBottom)
//     sphereBottom.translateY(-length / 2)
//   }
//   if (!openTop) {
//     var sphereTop = new THREE.Mesh(sphereTopGeo, material)
//     capsule.add(sphereTop)
//     sphereTop.translateY(length / 2)
//   }
//   makeLengthAngleAxisTransform(capsule, cylAxis, center)
//   model.scene.add(capsule)
//   return capsule
// }

// // Transform cylinder to align with given axis and then move to center
// function makeLengthAngleAxisTransform(cyl, cylAxis, center) {
//   cyl.matrixAutoUpdate = false

//   // From left to right using frames: translate, then rotate; TR.
//   // So translate is first.
//   cyl.matrix.makeTranslation(center.x, center.y, center.z)

//   // take cross product of cylAxis and up vector to get axis of rotation
//   var yAxis = new THREE.Vector3(0, 1, 0)
//   // Needed later for dot product, just do it now;
//   // a little lazy, should really copy it to a local Vector3.
//   cylAxis.normalize()
//   var rotationAxis = new THREE.Vector3()
//   rotationAxis.crossVectors(cylAxis, yAxis)
//   if (rotationAxis.length() < 0.000001) {
//     // Special case: if rotationAxis is just about zero, set to X axis,
//     // so that the angle can be given as 0 or PI. This works ONLY
//     // because we know one of the two axes is +Y.
//     rotationAxis.set(1, 0, 0)
//   }
//   rotationAxis.normalize()

//   // take dot product of cylAxis and up vector to get cosine of angle of rotation
//   var theta = -Math.acos(cylAxis.dot(yAxis))
//   //cyl.matrix.makeRotationAxis( rotationAxis, theta );
//   var rotMatrix = new THREE.Matrix4()
//   rotMatrix.makeRotationAxis(rotationAxis, theta)
//   cyl.matrix.multiply(rotMatrix)
// }

// export function lineTo(x, y, z, openTop, openBottom) {
//   capsule(
//     x - model.cursor.x,
//     y - model.cursor.y,
//     z - model.cursor.z,
//     false,
//     false
//   )
// }