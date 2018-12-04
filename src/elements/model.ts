import * as THREE from 'three'
import { OrbitControls } from 'three';

interface lights {
  hemisphereLight: THREE.HemisphereLight | null
  lights?: Array<THREE.Light>
}

type elements = Array<THREE.Object3D>

interface materialSettings {
  color: THREE.Color
  flatShading: boolean,
  specular: THREE.Color
  shininess: number
  opacity: number
  transparent: boolean
  side: THREE.Side
}

interface settings {
  cameraPosition: THREE.Vector3
  material: typeof THREE.MeshPhongMaterial
  materialSettings: materialSettings,
  poly: number
  stroke: {
    color: THREE.Color
    width: number
  }
}

interface location {
  x: number
  y: number
  z: number
}

export default class {
  cursor: location
  elements: elements
  lights: lights
  material: THREE.MeshPhongMaterial
  settings: settings
  defaultSettings: settings = {
    cameraPosition: new THREE.Vector3(10, 10, 10),
    material: THREE.MeshPhongMaterial,
    materialSettings: {
      color: new THREE.Color(0x444444),
      flatShading: false,
      specular: new THREE.Color(0xffffff),
      shininess: 0,
      opacity: 1,
      transparent: false,
      side: THREE.FrontSide,
    },
    poly: 10,
    stroke: {
      color: new THREE.Color(0x444444),
      width: 1,
    },
  }
  defaultLights: lights = {
    hemisphereLight: new THREE.HemisphereLight(0xffffff, 0x404040, 1),
  }

  constructor() {
    this.cursor = { x: 0, y: 0, z: 0}
    this.elements = []
    this.lights = this.defaultLights
    this.settings = this.defaultSettings
    this.material = new this.settings.material(this.settings.materialSettings)
  }

  resetModel () {
    this.cursor = { x: 0, y: 0, z: 0}
    this.elements = []
    this.lights = this.defaultLights
    this.settings = this.defaultSettings
    this.updateMaterial()
  }
  
  updateMaterial() {
    this.material = new this.settings.material(this.settings.materialSettings)
  }
}
