var model = require("../model"),
    THREE = require("three"),
    scene = require("./scene");

var init = function() {
    // load input from cache
    model.width = 500;
    model.height = 500;
    model.fullscreen = false;
    model.ratio = devicePixelRatio || 1;
    model.display = document.getElementById("display");
    model.canvas = document.getElementById("canvas");
    model.canvas.addEventListener("dblclick", toggleFullscreenDisplay);
    model.renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: model.canvas,
        alpha: true
    });
    model.renderer.gammaInput = true;
    model.renderer.gammaOutput = true;
    model.renderer.setPixelRatio(model.ratio);
    model.renderer.setSize(model.width, model.height);
};

var resize = function() {
    if (model.fullscreen) {
        model.width = window.innerWidth;
        model.height = window.innerHeight;
    } else {
        model.width = 500;
        model.height = 500;
    }
    model.canvas.width = model.width * model.ratio;
    model.canvas.height = model.height * model.ratio;
    model.canvas.style.width = model.width;
    model.canvas.style.height = model.height;
    scene.resizeCamera(model.width, model.height);
};

var escToggle = function(e) {
    if (e.keyCode === 27)
        toggleFullscreenDisplay();
};

var toggleFullscreenDisplay = function() {
    // Toggle class 
    model.fullscreen = !model.fullscreen;
    if (model.fullscreen) {
        model.display.classList.add("fullscreen");
        // window.addEventListener("keyup", escToggle); // for some reason this fucks up the ace editor :(
    } else {
        model.display.classList.remove("fullscreen");
        // window.removeEventListener("keyup", escToggle);
    }
    resize();
};

module.exports = {
    escToggle: escToggle,
    init: init,
    resize: resize,
    toggleFullscreenDisplay: toggleFullscreenDisplay
};
