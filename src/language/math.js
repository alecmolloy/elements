var math = Object.getOwnPropertyNames(Math);
for (var key in math) {
    module.exports[math[key]] = Math[math[key]];
}

/*
 * Get a random number between two numbers, rounded to an integer unless
 * float attribute is set to true
 *
 * @param {Number}* min
 * @param {Number}* max
 * @param {Boolena}* float
 * @return {Number}
 */
module.exports.random = function(min, max, float) {
    var out;

    if (typeof min !== 'number' || typeof max !== 'number') {
        return Math.random();
    }

    out = Math.random() * (max - min) + min;

    if (float) {
        return out;
    }

    return Math.floor(out);
};
