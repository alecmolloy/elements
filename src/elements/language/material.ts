// /*
//  * Material language module
//  *
//  * Collection of generic core commands
//  */

// import model from '../model'
// import * as THREE from 'three'
// /*
//  * Set current model poly count
//  *
//  * @param {Number} count
//  * @return void
//  */
// export function poly(count) {
//   model.settings.poly = count
// }

// /*
//  * Set current model material
//  *
//  * @param {String} material
//  * @return void
//  */
// export function material(val) {
//   val = val || 'phong'
//   switch (val) {
//     case 'basic':
//       model.settings.material = THREE.MeshBasicMaterial
//       break
//     case 'depth':
//       model.settings.material = THREE.MeshDepthMaterial
//       break
//     case 'lambert':
//       model.settings.material = THREE.MeshLambertMaterial
//       break
//     case 'normal':
//       model.settings.material = THREE.MeshNormalMaterial
//       break
//     case 'phong':
//       model.settings.material = THREE.MeshPhongMaterial
//       break
//     default:
//       model.settings.material = THREE.MeshPhongMaterial
//       break
//   }
//   updateMaterial()
// }

// /*
//  * Set current model shading type
//  *
//  * @param {String} color
//  * @return void
//  */
// export function flatShading(onOff: boolean = true) {
//   model.settings.flatShading = onOff
//   updateMaterial()
// }

// /*
//  * Set current model shininess type
//  *
//  * @param {String} color
//  * @return void
//  */
// export function shininess(type = 0) {
//   model.settings.shininess = type
//   updateMaterial()
// }

// /*
//  * Set current model sidedness
//  *
//  * @param {String} sidedness
//  * @return void
//  */
// export function sides(val) {
//   model.settings.sidedness = typeof val !== 'undefined' ? val : THREE.DoubleSide
//   updateMaterial()
// }

// /*
//  * Set current model specular
//  *
//  * @param {String} specular
//  * @return void
//  */
// export function specular(val) {
//   model.settings.specular = typeof val !== 'undefined' ? val : 0x101010
//   updateMaterial()
// }

// /*
//  * Update material settings
//  *
//  * @return {Object}
//  */
