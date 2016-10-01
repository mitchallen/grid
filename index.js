/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

module.exports.create = function (spec) {
    if(!spec) {
        return null;
    }
    let _x = spec.x;
    let _y = spec.y;
    if(!_x || !_y) {
        return null;
    }
    if(_x < 0 || _y < 0) {
        return null;
    }
    var _array = [];
    while(_array.push([]) < _x);
    if(!_array) {
        return null;
    }
    return {
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
        }
    };
};
