/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

module.exports.create = (spec) => {

    spec = spec || {};

    let _x = spec.x || 0;
    let _y = spec.y || 0;

    _x = Math.max( _x, 0 );
    _y = Math.max( _y, 0 );

    var _array = [];
    while(_array.push([]) < _x);
    if(!_array) {
        return null;
    }

    var obj = {};

    Object.defineProperties( obj, {
        "xSize": {
            writeable: false,
            value: _x,
            enumerable: true
        },
        "ySize": {
            writeable: false,
            value: _y,
            enumerable: true
        },
    });

    return Object.assign( obj, {
        log: function() { 
            console.log("size: %d, %d", _x, _y);
            console.log(_array); 
        },
        isCell(x,y) {
            return x >= 0 && x < _x && y >= 0 && y < _y;
        },
        set(x,y,value) {
            if(!this.isCell(x,y)) { return false; }
            _array[x][y] = value;
            return true;
        },
        get(x,y) {
            if(!this.isCell(x,y)) { return null; }
            return _array[x][y];
        },
        fill(value) {
            for(var x = 0; x < _x; x++) {
                for(var y = 0; y < _y; y++) {
                    _array[x][y] = value;
                }
            }
        },
        cloneArray() {
            var _clone = [];
            while(_clone.push([]) < _x);
            for(var x = 0; x < _x; x++) {
                for(var y = 0; y < _y; y++) {
                    _clone[x][y] = _array[x][y];
                }
            }
            return _clone;
        }
    });
};
