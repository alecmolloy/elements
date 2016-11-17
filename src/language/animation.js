/*
 * Animation language module
 *
 * Collection of animation commands
 */

var model = require('../model');

/*
 * Adds the passed function the animation queue
 *
 * @param {Number} x
 * @param {Number} y
 * @return void
 */

function animate(callback, fps) {
    setTimeout(function() {
        model.animationRequestID = window.requestAnimationFrame(function(timestamp) {
            callback(timestamp);
            animate(callback, fps);
        });
    }, 1000 / fps);
}

module.exports = {
    animate: animate
};
