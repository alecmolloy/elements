const { createNoise2D } = require('simplex-noise')
const THREE = require('three')

function noise2D(width, height) {
  const size = width * height
  const data = new Uint8Array(size) // Single channel

  const _noise2D = createNoise2D()
  for (let i = 0; i < size; i++) {
    const x = i % width
    const y = Math.floor(i / width)
    const noiseValue = (_noise2D(x / 10, y / 10) + 1) * 0.5 // Normalize noise to [0, 1]
    data[i] = Math.round(noiseValue * 255) // Map to [0, 255]
  }

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.LuminanceFormat
  )
  texture.needsUpdate = true
  return texture
}

module.exports = {
  noise2D,
}
