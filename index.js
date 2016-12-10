/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = (spec) => {

    spec = spec || {};

    let _rows = spec.rows || 0;

    _rows = Math.max( _rows, 0 );

    var _array = [];
    while(_array.push([]) < _rows);
    if(!_array) {
        return null;
    }

    var obj = {};

    return Object.assign( obj, {
        log: function() { 
            console.log("size: %d: ", _rows );
            console.log(_array); 
        },
        rowSize: function(row) {
            if( row < 0 || row >= _rows ) {
                return 0;
            }
            return _array[row].length;
        },
        isCell: function(a,b) {
            var rs = this.rowSize(a);
            return a >= 0 && a < _rows && b >= 0 && b < rs;
        },
        set: function(a,b,value) {
            // problem for sparse arrays
            // if(!this.isCell(a,b)) { return false; }
            if(a < 0 || b < 0 ) return false;
            _array[a][b] = value;
            return true;
        },
        get: function(a,b) {
            if(!this.isCell(a,b)) { return null; }
            return _array[a][b];
        },
        fill: function(value) {
            for(var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for(var pos = 0; pos < rs; pos++) {
                    _array[row][pos] = value;
                }
            }
        },
        cloneArray: function() {
            var _clone = [];
            while(_clone.push([]) < _rows);
            for(var row = 0; row < _rows; row++) {
                var rs = this.rowSize(row);
                for(var pos = 0; pos < rs; pos++) {
                    _clone[row][pos] = _array[row][pos];
                }
            }
            return _clone;
        }
    });
}

var squareGrid = (spec) => {

    spec = spec || {};

    let _x = spec.x || 0;
    let _y = spec.y || 0;

    _x = Math.max( _x, 0 );
    _y = Math.max( _y, 0 );

    var obj = baseGrid( { rows: _x } );

    for(var row = 0; row < _x; row++) {
        for(var col = 0; col < _y; col++) {
            obj.set(row,col,0)
        }
    }

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

    return obj;
};

module.exports = {
    create: squareGrid,
    Square: squareGrid,
};

