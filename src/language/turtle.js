const space = require('./space'),
  lines = require('./lines'),
  THREE = require('three')

class Turtle {
  h = new THREE.Vector3(1, 0, 0)
  l = new THREE.Vector3(0, 0, 1)
  u = new THREE.Vector3(0, 1, 0)
  stack = []

  constructor({
    x = 0,
    y = 0,
    z = 0,
    delta = 10,
    theta = 90,
    productions = {},
    F = this.F,
  } = {}) {
    this.F = F
    this.x = x
    this.y = y
    this.z = z
    this.delta = delta
    this.theta = theta
    this.productions = productions

    this.instructions = {
      F: F,
      f: this.f,
      '+': this.right,
      '-': this.left,
      '−': this.left,
      '^': this.up,
      '∧': this.up,
      '&': this.down,
      '/': this.rollRight,
      '\\': this.rollLeft,
      '|': this.turnAround,
      '[': this.push,
      ']': this.pop,
    }
  }

  generate(axiom, generations) {
    if (generations > 0) {
      successor = ''
      for (const i = 0; i < axiom.length; i++) {
        const token = axiom[i] // Select a single character out of the axiom for matching against the production list
        if (this.productions[token]) {
          // check if the token is in the production list
          if (typeof this.productions[token] === 'object') {
            // check if this production is stochastic
            // check to see the probabilities total
            const probabilityTotal = 0
            const probabilities = []
            for (
              const j = 1;
              j <= Object.keys(this.productions[token]).length;
              j++
            ) {
              // iterate through possible productions
              probabilityTotal += parseFloat(
                this.productions[token][j].probability
              ) // add their probabilities up
              probabilities.push(probabilityTotal) // and store each step in a value for comparison later
            }
            const randomNum = Math.random() * probabilityTotal
            for (const k = 0; k < probabilities.length; k++) {
              // Iterate over probabilities.
              if (randomNum < probabilities[k]) {
                // If `randomNum` is greater than the given probability, it is a match!
                successor += this.productions[token][k + 1].word // add the randomly selected production word
              }
            }
          } else {
            // If the production is deterministic, add the match to the successor
            successor += this.productions[token]
          }
        } else {
          // if the token is not in the production list, just put it back in with no modification
          successor += token
        }
      }
      return this.generate(successor, --generations)
    }
    return axiom
  }

  F(delta = this.delta) {
    const prime = this.h.clone().multiplyScalar(delta)
    space.moveTo(this.x, this.y, this.z)
    lines.line(prime.x, prime.y, prime.z)
    space.move(prime.x, prime.y, prime.z)
    this.x += prime.x
    this.y += prime.y
    this.z += prime.z
  }

  f(delta = this.delta) {
    const prime = this.h.clone().multiplyScalar(delta)
    this.x += prime.x
    this.y += prime.y
    this.z += prime.z
    space.moveTo(this.x, this.y, this.z)
  }

  yaw(angle) {
    const radiansAngle = (angle / 180) * Math.PI
    this.h.applyAxisAngle(this.u, radiansAngle)
    this.l.applyAxisAngle(this.u, radiansAngle)
    this.u.applyAxisAngle(this.u, radiansAngle)
  }

  pitch(angle) {
    const radiansAngle = (angle / 180) * Math.PI
    this.h.applyAxisAngle(this.l, radiansAngle)
    this.l.applyAxisAngle(this.l, radiansAngle)
    this.u.applyAxisAngle(this.l, radiansAngle)
  }

  roll(angle) {
    const radiansAngle = (angle / 180) * Math.PI
    this.h.applyAxisAngle(this.h, radiansAngle)
    this.l.applyAxisAngle(this.h, radiansAngle)
    this.u.applyAxisAngle(this.h, radiansAngle)
  }

  right(angle = this.theta) {
    this.yaw(-angle)
  }

  left(angle = this.theta) {
    this.yaw(angle)
  }

  up(angle = this.theta) {
    this.pitch(angle)
  }

  down(angle = this.theta) {
    this.pitch(-angle)
  }

  rollRight(angle = this.theta) {
    this.roll(angle)
  }

  rollLeft(angle = this.theta) {
    this.roll(-angle)
  }

  turnAround() {
    this.yaw(180)
  }

  goTo(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  incrementColorIndex() {
    ++this.colorIndex
  }

  decrementDiameter() {
    --this.diameter
  }

  push() {
    const state = {
      x: this.x,
      y: this.y,
      z: this.z,
      h: this.h.clone(),
      l: this.l.clone(),
      u: this.u.clone(),
      diameter: this.diameter,
      colorIndex: this.colorIndex,
    }
    this.stack.push(state)
  }

  pop() {
    const state = this.stack.pop()
    this.x = state.x
    this.y = state.y
    this.z = state.z
    this.h = state.h
    this.l = state.l
    this.u = state.u
    this.diameter = state.diameter
    this.colorIndex = state.colorIndex
  }

  translate(axiom) {
    for (let i = 0; i < axiom.length; i++) {
      if (axiom[i] in this.instructions) {
        this.instructions[axiom[i]].bind(this)()
      }
    }
  }
}

module.exports = {
  Turtle,
}
