import language from './language'

const ERROR_LOC_REGEX = /\s+at Object\.eval \((.+):(\d+):(\d+)\)/
/*
 * Language intepreter module
 *
 * Stateful, functional module that interprets the draw language
 */

export default class {
  /*
  * Evaluate draw code with given settings object, returns a error object
  *
  * containing debug info in case of failure
  * @param {String} code
  * @param {Object} settings
  * @return {Object|void}
  */
  run(code: string) {
    function evalInContext (code: string) {
      for (const key in language) {
        Function(`key`)()
      }
      Function(code)()
    }

    try {
      evalInContext.call({}, code)
    } catch (err) {
      console.error(err)
      // Trace back error location from compiled source map
      const jsLoc = this.getErrorLocation(err)
      return {
        message: err.message,
        loc: jsLoc,
        type: 'execution',
      }
    }
  }

  /*
  * Dirty-parse error location though error stack
  *
  * @param {Error} err
  * @return [{Number}]
  */
  getErrorLocation(err: Error) {
    if (err.stack != null) {
      const trace = err.stack.split('\n')
      .map(function(line: string) {
        return line.match(ERROR_LOC_REGEX)
      })
      .filter(function(match) {
        return match !== null
      })
      
      if (trace.length > 0) {
        const traceTop = trace[0]
        if (traceTop != null) {
          const x = parseInt(traceTop[2], 10) - 1
          const y = parseInt(traceTop[3], 10) - 1
          return [x, y]
        }
      } else {
        return null
      }
    }
  }

}