var display = require("./display"),
    interpreter = require("./interpreter");

var loadCode = function() {
    return localStorage.getItem("elements-3d-code");
};

var resetCode = function() {
    aceEditor.setValue("");
};

var saveLocally = function() {
    localStorage.setItem("elements-3d-code", aceEditor.getValue());
};

var setCode = function(value) {
    aceEditor.setValue(value);
};


var aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
aceEditor.setShowPrintMargin(false);
aceEditor.getSession().setMode("ace/mode/coffee");
aceEditor.setBehavioursEnabled(false);
aceEditor.focus();

aceEditor.on("change", function(e) {
    console.log(interpreter.run(aceEditor.getValue()));
    saveLocally();
});

display.init();
setCode(loadCode());
interpreter.run(aceEditor.getValue());
if (localStorage.getItem("elements-3d-code" == null)) {
    localStorage.setItem("elements-3d-code", "");
}

module.exports = {
    loadCode: loadCode,
    resetCode: resetCode,
    saveLocally: saveLocally,
    setCode: setCode
};
