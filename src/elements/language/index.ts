import * as animation from './animation'
// import * as camera from './camera'
// import * as compounds from './compounds'
// import * as light from './light'
// import * as material from './material'
// import * as primitives from './primitives'
import { default as security } from './security'
// import * as space from './space'
// import * as utils from './utils'

const modules: Array<any> = [
  animation,
  // camera,
  // compounds,
  // light,
  // material,
  // primitives,
  security,
  // space,
  // utils,
]

let language: any = {}
for (const module of modules) {
  for (const key in module) {
    let value = module[key]
    if (typeof value === 'function') {
      value = value.bind({});
    }
    language[key] = value
  }
}

export default language