(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GRID = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
    Module: @mitchallen/grid/../base.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

module.exports = spec => {

    spec = spec || {};

    let _rows = spec.rows || 0;

    _rows = Math.max(_rows, 0);

    var _array = [];
    while (_array.push([]) < _rows);
    if (!_array) {
        return null;
    }

    var obj = Object.create({}, {
        "rows": {
            writeable: false,
            value: _rows,
            enumerable: true
        }
    });

    return Object.assign(obj, {

        log: function () {
            console.log("size: %d: ", _rows);
            console.log(_array);
        },
        rowSize: function (row) {
            if (row < 0 || row >= _rows) {
                return 0;
            }
            return _array[row].length;
        },
        isCell: function (a, b) {
            var rs = this.rowSize(a);
            return a >= 0 && a < _rows && b >= 0 && b < rs;
        },
        set: function (a, b, value) {
            // problem for sparse arrays
            // if(!this.isCell(a,b)) { return false; }
            if (a < 0 || b < 0) return false;
            _array[a][b] = value;
            return true;
        },
        get: function (a, b) {
            if (!this.isCell(a, b)) {
                return null;
            }
            return _array[a][b];
        },
        fill: function (value) {
            for (var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for (var pos = 0; pos < rs; pos++) {
                    _array[row][pos] = value;
                }
            }
        },
        cloneArray: function () {
            var _clone = [];
            while (_clone.push([]) < _rows);
            for (var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for (var pos = 0; pos < rs; pos++) {
                    _clone[row][pos] = _array[row][pos];
                }
            }
            return _clone;
        }
    });
};

},{}],2:[function(require,module,exports){
/**
    Module: @mitchallen/grid/../square.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = require('./base');

module.exports = spec => {

    spec = spec || {};

    let _rings = spec.rings || 0;

    _rings = Math.max(_rings, 0);

    var obj = baseGrid({ rows: _rings });

    // prepare grid

    // Single cell on row 0.
    obj.set(0, 0, 0);

    // rings are rows
    var rowHeight = 1.0 / _rings;

    for (var i = 1; i < _rings; i++) {
        // console.log("row: %d", i );
        var radius = i / _rings;
        // console.log(" ... row: %d, radius: %d", i, radius );
        var circumference = 2 * Math.PI * radius;
        // console.log(" ... circumference:", circumference );
        var previousCount = obj.rowSize(i - 1);
        // console.log(" ... previousCount:", previousCount );
        var estimatedCellWidth = circumference / previousCount;
        // console.log(" ... estimatedCellWidth:", estimatedCellWidth );
        var ratio = Math.round(estimatedCellWidth / rowHeight);
        // console.log(" ... ratio:", ratio );
        var cells = previousCount * ratio;
        // console.log(" ... cells:", cells );
        for (var j = 0; j < cells; j++) {
            // _array[i].push(0);
            obj.set(i, j, 0);
        }
        // console.log(_array[i]);
    }

    Object.defineProperties(obj, {
        "rings": {
            writeable: false,
            value: _rings,
            enumerable: true
        }
    });

    return Object.assign(obj, {
        ringSize: function (ring) {
            // rings equal rows in base class
            return this.rowSize(ring);
        }
    });
};

},{"./base":1}],3:[function(require,module,exports){
/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = require('./base'),
    squareGrid = require('./square'),
    circleGrid = require('./circle');

var createGrid = spec => {
    console.warn("@mitchallen/grid: .create is deprecated. Use .Square instead.");
    return squareGrid(spec);
};

module.exports = {
    create: createGrid,
    Square: squareGrid,
    Circle: circleGrid,
    // For future expansion (mapped to square for now)
    Hexagon: squareGrid,
    Triangle: squareGrid
};

},{"./base":1,"./circle":2,"./square":4}],4:[function(require,module,exports){
/**
    Module: @mitchallen/grid/../square.js
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = require('./base');

module.exports = spec => {

    spec = spec || {};

    let _x = spec.x || 0;
    let _y = spec.y || 0;

    _x = Math.max(_x, 0);
    _y = Math.max(_y, 0);

    var obj = baseGrid({ rows: _x });

    for (var row = 0; row < _x; row++) {
        for (var col = 0; col < _y; col++) {
            obj.set(row, col, 0);
        }
    }

    Object.defineProperties(obj, {
        "xSize": {
            writeable: false,
            value: _x,
            enumerable: true
        },
        "ySize": {
            writeable: false,
            value: _y,
            enumerable: true
        }
    });

    return obj;
};

},{"./base":1}]},{},[3])(3)
});