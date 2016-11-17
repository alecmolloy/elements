var display = require("./display"),
    interpreter = require("./interpreter");

var aceEditor = ace.edit("editor");
aceEditor.setTheme("ace/theme/tomorrow_night_eighties");
aceEditor.setShowPrintMargin(false);
aceEditor.getSession().setMode("ace/mode/coffee");
aceEditor.setBehavioursEnabled(false);
aceEditor.focus();

aceEditor.on("change", function(e) {
    console.log(interpreter.run(aceEditor.getValue()));
});

var setCode = function(value) {
    aceEditor.setValue(value);
};

var resetCode = function() {
    aceEditor.setValue("");
};

var loadCode = function() {
    // to implement
};
display.init();
interpreter.run(aceEditor.getValue());

module.exports = {
    loadCode: loadCode,
    resetCode: resetCode,
    setCode: setCode
};
