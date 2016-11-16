/*
 * Language intepreter module
 *
 * Stateful, functional module that interprets the draw language
 */

var coffee = require("coffee-script"),
    display = require("./display"),
    THREE = require("three"),
    scene = require("./scene"),
    model = require("../model"),
    modules = require("../language")
    ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/;

/*
 * Evaluate draw code with given settings object, returns a error object
 *
 * containing debug info in case of failure
 * @param {String} code
 * @param {Object} settings
 * @return {Object|void}
 */
function run(code) {
    display.init();
    scene.resetModel();

    var compiled;
    code = preCompile(code || '');

    // Attempt compiling coffeescript
    try {
        compiled = coffee.compile(code || '', {
            sourceMap: true
        });
    } catch (err) {
        return {
            message: err.message,
            type: 'compilation'
        };
    }
    // Evaluate compiled JavaScript in build context
    try {
        evalInContext.call({}, compiled.js);
    } catch (err) {
        // Trace back error location from compiled source map
        var jsLoc = getErrorLocation(err),
            coffeeLoc = jsLoc ? compiled.sourceMap.sourceLocation(jsLoc) : null;

        return {
            message: err.message,
            loc: coffeeLoc,
            type: 'execution'
        };
    }
}

/*
 * Precompile step - Cleans the code up
 *
 * @param {String} code
 * @return {String}
 */
function preCompile(code) {
    "use strict";
    code = code
        // Only use fat arrow (Block access to Window through `this`)
        .replace(/->/g, '=>')
        // Allow thin arrow on constructor functions
        .replace(/(constructor\s*\:[^\=]*)=>/g, function(match, start) {
            return start + '->';
        });

    return code;
}

/*
 * Dirty-parse error location though error stack
 *
 * @param {Error} err
 * @return [{Number}]
 */
function getErrorLocation(err) {
    "use strict";
    var trace,
        traceTop,
        x,
        y;

    trace = err.stack.split('\n').map(function(line) {
        return line.match(ERROR_LOC_REGEX);
    }).filter(function(match) {
        return match !== null;
    });

    if (trace.length > 0) {
        traceTop = trace[0];

        x = parseInt(traceTop[2], 10) - 1;
        y = parseInt(traceTop[3], 10) - 1;

        return [x, y];
    } else {
        return null;
    }
}

/*
 * Build a contained context containing the draw language API and eval code
 *
 * inside it
 * @param {String} code
 * @return void
 */
function evalInContext(code) {
    // Loop through language modules and declare every property in this block
    for (var m in modules) {
        if (modules.hasOwnProperty(m)) {
            for (var c in modules[m]) {
                if (modules[m].hasOwnProperty(c)) {
                    // Declare property using eval
                    var value = modules[m][c];

                    if (typeof value === 'function') {
                        value = value.bind({});
                    }
                    eval('var ' + c + ' = value;');
                }
            }
        }
    }
    eval(code);
    scene.render();
}

module.exports = {
    run: run,
    evalInContext: evalInContext
};
