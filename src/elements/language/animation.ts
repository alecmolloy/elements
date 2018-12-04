/*
 * Animation language module
 *
 * Collection of animation commands
 */

import model from '../model'

/*
 * Adds the passed function the animation queue
 *
 * @return void
 */
export function animate (callback: Function) {
  window.requestAnimationFrame((time: number) => {
    callback(time)
    animate(callback)
  })
}

export function sin (num: number) {
  return Math.sin(num)
}