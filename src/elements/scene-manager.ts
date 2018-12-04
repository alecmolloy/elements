import * as THREE from 'three'
import { Dimensions2d } from '../typings'
import * as model from './model'
import { OrbitControls } from 'three-orbitcontrols-ts';
import interpreter from './interpreter';

export default class {
  camera: THREE.PerspectiveCamera
  cameraControls: OrbitControls
  canvas: HTMLCanvasElement
  code: string
  clock: THREE.Clock
  width: number
  height: number
  fullscreen: boolean = false
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  // sceneSubjects: Array<SceneSubject>
  screenDimensions: Dimensions2d
  interpreter: interpreter
  
  constructor(canvas: HTMLCanvasElement, code: string) {
    this.canvas = canvas
    this.code = code
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    }
    this.renderer = this.buildRender(this.screenDimensions)
    this.camera = this.buildCamera(this.screenDimensions)
    this.cameraControls = new OrbitControls(this.camera, canvas)
    this.cameraControls.target.set(0, 0, 0)
    
    this.scene = this.buildScene()
    // this.sceneSubjects = this.createSceneSubjects(this.scene)

    this.clock = new THREE.Clock()
    this.width = canvas.width
    this.height = canvas.height
    this.renderer.gammaInput = true
    this.renderer.gammaOutput = true
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)

    this.interpreter = new interpreter
    this.interpreter.run(code)
  }

  render () {
    this.cameraControls.update()
  
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
  
  resizeCamera (width: number, height: number) {
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  buildScene() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('pink')

    return scene
  }

  buildRender({width, height}: Dimensions2d) {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    renderer.gammaInput = true
    renderer.gammaOutput = true

    return renderer
  }

  buildCamera({width, height}: Dimensions2d) {
    const aspectRatio = width / height
    const fieldOfView = 30
    const nearPlane = 1
    const farPlane = 100
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )

    return camera
  }

  // createSceneSubjects(scene: THREE.Scene) {
  //   const sceneSubjects: Array<THREE> = [
  //     new Lights(scene),
  //   ]

  //   return sceneSubjects
  // }

  update() {
    const elapsedTime = this.clock.getElapsedTime()

    // for (let i = 0; i < this.sceneSubjects.length; i++) {
    //   this.sceneSubjects[i].update(elapsedTime)
    // }

    this.renderer.render(this.scene, this.camera)
  }


  onCanvasResize() {
    const { width, height } = this.canvas

    this.screenDimensions.width = width
    this.screenDimensions.height = height

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }
}
