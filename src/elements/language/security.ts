/*
 * Security module
 *
 * Override core objects in the language scope to evaluate in a secured scope
 */

const OVERRIDES = [
  'window',
  'top',
  'Window',
  'Document',
  'document',
  // 'console',
  'alert',
  'localStorage',
  'open',
  'location',
  'parent',
  'postMessage',
  'print',
  'prompt',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'scroll',
  'scrollBy',
  'scrollTo',
  'scrollX',
  'scrollY',
  'sessionStorage',
  'setTimeout',
  'setInterval',
]

let overrideMap: { [k: string]: null; } = {}

OVERRIDES.forEach(function (key) {
  overrideMap[key] = null
})

export default overrideMap