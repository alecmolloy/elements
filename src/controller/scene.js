var material = require('../language/material'),
  model = require('../model'),
  THREE = require('three'),
  OrbitControls = require('three-orbit-controls')(THREE)
/*
 * Reset current drawing model
 *
 * @param {Object} settings
 * @return void
 */
function resetModel() {
  'use strict'

  model.scene = new THREE.Scene()

  model.elements = {
    ambientLight: new THREE.AmbientLight(0x404040, 0),
    hemisphereLight: new THREE.HemisphereLight(0xffffff, 0x404040, 1),
  }

  model.scene.add(model.elements.ambientLight, model.elements.hemisphereLight)

  model.settings = {
    cameraPosition: new THREE.Vector3(100, 100, 100),
    color: 0xf05c94,
    material: THREE.MeshPhongMaterial,
    opacity: 1,
    poly: 12,
    flatShading: THREE.FlatShading,
    shininess: 0,
    sidedness: THREE.DoubleSide,
    specular: 0x101010,
    stroke: {
      color: 0xf05c94,
      width: 1,
    },
  }

  model.cursor = {
    x: 0,
    y: 0,
    z: 0,
  }

  material.updateMaterial()

  model.clock = new THREE.Clock()

  model.cameras = {}
  model.cameras.main = new THREE.PerspectiveCamera(30, 1, 1, 1000000)
  model.cameras.main.position.copy(model.settings.cameraPosition)

  model.cameraControls = new OrbitControls(
    model.cameras.main,
    model.renderer.domElement
  )
  model.cameraControls.target.set(0, 0, 0)
  model.renderer.setClearColor(0xffffff, 1)
}

/*
 * Render loop
 */
function render() {
  var delta = model.clock.getDelta()
  model.cameraControls.update(delta)

  model.renderer.render(model.scene, model.cameras.main)
  if (model.animationID) {
    window.cancelAnimationFrame(model.animationID)
  }
  model.animationID = window.requestAnimationFrame(render)
}

var resizeCamera = function (width, height) {
  model.renderer.setSize(width, height)
  model.cameras.main.aspect = width / height
  model.cameras.main.updateProjectionMatrix()
}

module.exports = {
  resetModel: resetModel,
  resizeCamera: resizeCamera,
  render: render,
}
