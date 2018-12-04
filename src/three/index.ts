import SceneManager from '../elements/scene-manager'

export default class {
  canvas = document.createElement('canvas')
  canvasRoot: HTMLElement
  code: string
  sceneManager: SceneManager
  width: number
  height: number
  fullscreen = false
  
  constructor(canvasRoot: HTMLElement, code: string) {
    this.sceneManager = new SceneManager(this.canvas, code)
    this.canvasRoot = canvasRoot
    this.canvasRoot.appendChild(this.canvas)
    this.code = code
    this.width = canvasRoot.offsetWidth
    this.height = canvasRoot.offsetHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.sceneManager.onCanvasResize()
    this.bindEventListeners()
    this.sceneManager.render()
  }

  bindEventListeners() {
    this.canvas.addEventListener('dblclick', this.toggleFullscreenDisplay.bind(this))
  }

  escToggle (e: KeyboardEvent) {
    if (e.keyCode === 27) {
      this.toggleFullscreenDisplay()
    }
  }

  toggleFullscreenDisplay () {
    this.fullscreen = !this.fullscreen
    if (this.fullscreen) {
      this.canvasRoot.classList.add('fullscreen')
      window.addEventListener('keyup', this.escToggle.bind(this))
    } else {
      this.canvasRoot.classList.remove('fullscreen')
      this.canvas.removeEventListener('keyup', this.escToggle.bind(this));
    }
    this.resize()
  }

  newCode(code: string) {
    this.code = code
    this.sceneManager.interpreter.run(code)
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.offsetWidth
    this.canvas.height = this.canvas.offsetHeight
    this.sceneManager.onCanvasResize()
  }
  
  resize () {
    if (this.fullscreen) {
      this.width = window.innerWidth
      this.height = window.innerHeight
    } else {
      this.width = 500
      this.height = 500
    }
    this.canvas.width = this.width * window.devicePixelRatio
    this.canvas.height = this.height * window.devicePixelRatio
    this.canvas.style.width = `${this.width}$`
    this.canvas.style.height = `${this.height}$`
    this.sceneManager.onCanvasResize()
  }
}
