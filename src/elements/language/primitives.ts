// /*
//  * Shapes language module
//  *
//  * Collection of shape commands
//  */

// import model from '../model'
// import * as THREE from 'three'

// function makeMesh(geometry: THREE.Geometry | THREE.BufferGeometry) {
//   const material = model.material
//   var mesh = new THREE.Mesh(geometry, material)
//   mesh.position.x = model.cursor.x
//   mesh.position.y = model.cursor.y
//   mesh.position.z = model.cursor.z
//   model.scene.add(mesh)
//   return mesh
// }

// /*
//  * Draw a box using current cursor position as origin
//  *
//  * @param {Number} width
//  * @param {Number} height
//  * @param {Number} depth
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */

// export interface BoxProps {
//   width?: number
//   height?: number
//   depth?: number
//   widthSegments?: number
//   heightSegments?: number
//   depthSegments?: number
// }
// export function box({
//   width = 10,
//   height = width,
//   depth = width,
//   widthSegments = 1,
//   heightSegments = 1,
//   depthSegments = 1,
// }: BoxProps) {
//   var mesh = makeMesh(new THREE.BoxBufferGeometry(width, height, depth, widthSegments, heightSegments, depthSegments))
//   return mesh
// }
// /*
//  * Draw a square using current cursor position as origin
//  *
//  * @param {Number} size
//  * @return mesh
//  */

// export interface CubeProps {
//   size?: number
//   segments?: number
// }
// export function cube({
//   size = 1,
//   segments = 1,
// }: CubeProps) {
//   return box({
//     width: size,
//     height: size,
//     depth: size,
//     widthSegments: segments,
//     heightSegments: segments,
//     depthSegments: segments
//   })
// }


// /*
//  * Draw a cylinder using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @param {Number} height
//  * @param {Boolean} openEnded
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface CylinderProps {
//   radius?: number
//   radiusTop?: number
//   radiusBottom?: number
//   height?: number
//   radialSegments?: number
//   heightSegments?: number
//   openEnded?: boolean
//   thetaStart?: number
//   thetaLength?: number
// }

// export function cylinder({
//   radius = 1,
//   radiusTop = radius,
//   radiusBottom = radius,
//   height = 1,
//   radialSegments = model.settings.poly,
//   heightSegments = 1,
//   openEnded = false,
//   thetaStart = 0,
//   thetaLength = 2 * Math.PI,
// }: CylinderProps) {
//   var mesh = makeMesh(
//     new THREE.CylinderBufferGeometry(
//       radiusTop,
//       radiusBottom,
//       height,
//       radialSegments,
//       heightSegments,
//       openEnded,
//       thetaStart,
//       thetaLength
//     )
//   )
//   return mesh
// }
// /*
//  * Draw a icosahedron using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface IcosahedronProps {
//   radius?: number
//   detail?: number
// }
// export function icosahedron({
//   radius = 1,
//   detail = 0,
// }: IcosahedronProps) {
//   var mesh = makeMesh(new THREE.IcosahedronBufferGeometry(radius, detail))
//   return mesh
// }

// /*
//  * Draw a dodecahedron using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface DodecahedronProps {
//   radius?: number
//   detail?: number
// }
// export function dodecahedron({
//   radius = 1,
//   detail = 0,
// }: DodecahedronProps) {
//   var mesh = makeMesh(new THREE.DodecahedronBufferGeometry(radius, detail))
//   return mesh
// }

// /*
//  * Draw an octahedron using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface OctahedronProps {
//   radius?: number
//   detail?: number
// }
// export function octahedron({
//   radius = 1,
//   detail = 0,
// }: OctahedronProps) {
//   var mesh = makeMesh(new THREE.OctahedronBufferGeometry(radius, detail))
//   return mesh
// }

// /*
//  * Draw a plane using current cursor position as origin
//  *
//  * @param {Number} width
//  * @param {Number} height
//  * @return mesh
//  *
//  */
// export interface PlaneProps {
//   width?: number
//   height?: number
//   widthSegments?: number
//   heightSegments?: number
// }
// export function plane({
//   width = 1,
//   height = 1,
//   widthSegments = 1,
//   heightSegments = 1,
// }: PlaneProps) {
//   var mesh = makeMesh(new THREE.PlaneBufferGeometry(width, height, widthSegments, heightSegments))
//   return mesh
// }

// /*
//  * Draw a ring using current cursor position as origin
//  *
//  * @param {Number} innerRadius
//  * @param {Number} outerRadius
//  * @param {Number} thetaSegments
//  * @param {Number} phiSegments
//  * @param {Number} thetaStart
//  * @param {Number} thetaLength
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  * TODO: more efficient positioning
//  */
// export interface RingProps {
//   innerRadius?: number
//   outerRadius?: number
//   thetaSegments?: number
//   phiSegments?: number
//   thetaStart?: number
//   thetaLength?: number
// }
// export function ring({
//   innerRadius = 0.5, 
//   outerRadius = 1, 
//   thetaSegments = model.settings.poly , 
//   phiSegments = 1, 
//   thetaStart = 0 , 
//   thetaLength = Math.PI * 2., 
// }) {
//   var mesh = makeMesh(
//     new THREE.RingBufferGeometry(
//       innerRadius,
//       outerRadius,
//       thetaSegments,
//       phiSegments,
//       thetaStart,
//       thetaLength
//     )
//   )
//   return mesh
// }

// /*
//  * Draw a sphere using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @param {Number} widthSegments
//  * @param {Number} heightSegments
//  * @param {Number} phiStart
//  * @param {Number} phiLength
//  * @param {Number} thetaStart
//  * @param {Number} thetaLength
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface SphereProps {
//   radius?: number
//   widthSegments?: number
//   heightSegments?: number
//   phiStart?: number
//   phiLength?: number
//   thetaStart?: number
//   thetaLength?: number
// }
// export function sphere({
//   radius = 1,
//   widthSegments = model.settings.poly,
//   heightSegments = model.settings.poly * 0.8,
//   phiStart = 0,
//   phiLength = Math.PI * 2,
//   thetaStart = 0,
//   thetaLength = Math.PI,
// }) {
//   var mesh = makeMesh(
//     new THREE.SphereBufferGeometry(
//       radius,
//       widthSegments,
//       heightSegments,
//       phiStart,
//       phiLength,
//       thetaStart,
//       thetaLength
//     )
//   )
//   return mesh
// }

// /*
//  * Draw a SHAPE using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface TetrahedronProps {
//   radius?: number
//   detail?: number
// }
// export function tetrahedron({
//   radius = 1,
//   detail = 0,
// }: TetrahedronProps) {
//   var mesh = makeMesh(new THREE.TetrahedronBufferGeometry(radius, detail))
//   return mesh
// }

// /*
//  * Draw a torus using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @param {Number} tube
//  * @param {Number} radialSegments
//  * @param {Number} tubularSegments
//  * @param {Number} arc
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface TorusProps {
//   radius?: number
//   tube?: number
//   radialSegments?: number
//   tubularSegments?: number
//   arc?: number
// }
// export function torus({
//   radius = 1,
//   tube = .4,
//   radialSegments = model.settings.poly,
//   tubularSegments = model.settings.poly * 0.8,
//   arc = Math.PI,
// }: TorusProps) {
//   var mesh = makeMesh(
//     new THREE.TorusBufferGeometry(radius, tube, radialSegments, tubularSegments, arc)
//   )
//   return mesh
// }

// /*
//  * Draw a torus knot using current cursor position as origin
//  *
//  * @param {Number} radius
//  * @param {Number} tube
//  * @param {Number} radialSegments
//  * @param {Number} tubularSegments
//  * @param {Number} p
//  * @param {Number} q
//  * @param {Number} heightScale
//  * @return mesh
//  *
//  * TODO: better geometry, material, and mesh instancing
//  * TODO: more efficient positioning
//  */
// export interface TorusKnotProps {
//   radius?: number
//   tube?: number
//   radialSegments?: number
//   tubularSegments?: number
//   arc?: number
// }
// export function torusKnot({
//   radius = 1,
//   tube = .4,
//   radialSegments = model.settings.poly,
//   tubularSegments = model.settings.poly * 0.8,
//   arc = Math.PI,
// }: TorusKnotProps) {
//   var mesh = makeMesh(
//     new THREE.TorusKnotBufferGeometry(radius, tube, radialSegments, tubularSegments, arc)
//   )
//   return mesh
// }
