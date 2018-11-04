var space = require('./space'),
    lines = require('./lines'),
    THREE = require('three');

var Turtle = function Turtle(config) {
    config = typeof config !== 'undefined' ? config : {};
    this.x = typeof config.x !== 'undefined' ? config.x : 0;
    this.y = typeof config.y !== 'undefined' ? config.y : 0;
    this.z = typeof config.z !== 'undefined' ? config.z : 0;
    this.d = typeof config.delta !== 'undefined' ? config.delta : 10;
    this.theta = typeof config.theta !== 'undefined' ? config.theta : 90;
    this.productions = typeof config.productions !== 'undefined' ? config.productions : {};
    this.h = new THREE.Vector3(1, 0, 0);
    this.l = new THREE.Vector3(0, 0, 1);
    this.u = new THREE.Vector3(0, 1, 0);
    this.stack = [];
    this.instructions = {
        'F': this.F,
        'f': this.f,
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
        ']': this.pop
    };
};

Turtle.prototype.generate = function(axiom, generations) {
    if (generations > 0) {
        successor = '';
        for (var i = 0; i < axiom.length; i++) {
            var token = axiom[i]; // Select a single character out of the axiom for matching against the production list
            if (this.productions[token]) { // check if the token is in the production list
                if (typeof this.productions[token] === 'object') { // check if this production is stochastic
                    // check to see the probabilities total
                    var probabilityTotal = 0;
                    var probabilities = [];
                    for (var j = 1; j <= Object.keys(this.productions[token]).length; j++) { // iterate through possible productions
                        probabilityTotal += parseFloat(this.productions[token][j].probability); // add their probabilities up
                        probabilities.push(probabilityTotal); // and store each step in a value for comparison later
                    }
                    var randomNum = Math.random() * probabilityTotal;
                    for (var k = 0; k < probabilities.length; k++) { // Iterate over probabilities.
                        if (randomNum < probabilities[k]) { // If `randomNum` is greater than the given probability, it is a match!
                            successor += this.productions[token][k + 1].word; // add the randomly selected production word
                        }
                    }
                } else { // If the production is determanistic, add the match to the successor
                    successor += this.productions[token];
                }
            } else { // if the token is not in the production list, just put it back in with no modification
                successor += token;
            }
        }
        return this.generate(successor, --generations);
    }
    return axiom;
};

Turtle.prototype.F = function(d) {
    d = d || this.d;
    var prime = this.h.clone().multiplyScalar(d);
    space.moveTo(this.x, this.y, this.z);
    lines.line(prime.x, prime.y, prime.z);
    space.move(prime.x, prime.y, prime.z);
    this.x += prime.x;
    this.y += prime.y;
    this.z += prime.z;
};

Turtle.prototype.f = function(d) {
    d = d || this.d;
    var prime = this.h.clone().multiplyScalar(d);
    this.x += prime.x;
    this.y += prime.y;
    this.z += prime.z;
    space.moveTo(this.x, this.y, this.z);
};

Turtle.prototype.yaw = function(angle) {
    angle = angle / 180 * Math.PI;
    this.h.applyAxisAngle(this.u, angle);
    this.l.applyAxisAngle(this.u, angle);
    this.u.applyAxisAngle(this.u, angle);
};

Turtle.prototype.pitch = function(angle) {
    angle = angle / 180 * Math.PI;
    this.h.applyAxisAngle(this.l, angle);
    this.l.applyAxisAngle(this.l, angle);
    this.u.applyAxisAngle(this.l, angle);
};

Turtle.prototype.roll = function(angle) {
    angle = angle / 180 * Math.PI;
    this.h.applyAxisAngle(this.h, angle);
    this.l.applyAxisAngle(this.h, angle);
    this.u.applyAxisAngle(this.h, angle);
};

Turtle.prototype.right = function(angle) {
    angle = angle || this.theta;
    this.yaw(-angle);
};

Turtle.prototype.left = function(angle) {
    angle = angle || this.theta;
    this.yaw(angle);
};

Turtle.prototype.up = function(angle) {
    angle = angle || this.theta;
    this.pitch(angle);
};

Turtle.prototype.down = function(angle) {
    angle = angle || this.theta;
    this.pitch(-angle);
};

Turtle.prototype.rollRight = function(angle) {
    angle = angle || this.theta;
    this.roll(angle);
};

Turtle.prototype.rollLeft = function(angle) {
    angle = angle || this.theta;
    this.roll(-angle);
};

Turtle.prototype.turnAround = function() {
    this.yaw(180);
};

Turtle.prototype.goTo = function(x, y, z) {
    this.x = typeof x !== 'undefined' ? x : 0;
    this.y = typeof x !== 'undefined' ? y : 0;
    this.z = typeof x !== 'undefined' ? z : 0;
};

Turtle.prototype.incrementColorIndex = function() {
    ++this.colorIndex;
};

Turtle.prototype.decrementDiameter = function() {
    --this.diameter;
};

Turtle.prototype.push = function() {
    var state = {
        x: this.x,
        y: this.y,
        z: this.z,
        h: this.h.clone(),
        l: this.l.clone(),
        u: this.u.clone(),
        diameter: this.diameter,
        colorIndex: this.colorIndex
    };
    this.stack.push(state);
};

Turtle.prototype.pop = function() {
    var state = this.stack.pop();
    this.x = state.x;
    this.y = state.y;
    this.z = state.z;
    this.h = state.h;
    this.l = state.l;
    this.u = state.u;
    this.diameter = state.diameter;
    this.colorIndex = state.colorIndex;
};

Turtle.prototype.translate = function(axiom) {
    for (var i = 0; i < axiom.length; i++) {
        var token = axiom[i];
        if (typeof this.instructions[token] === "function")
            this.instructions[token].bind(this)();
    }
};

module.exports = {
    Turtle: Turtle
};
