/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = require('./lib/base');

var createGrid = (spec) => {
    console.warn("@mitchallen/grid: .create is deprecated. Use .Square instead.");
    return squareGrid( spec );
};

var squareGrid = (spec) => {

    spec = spec || {};

    let _x = spec.x || 0;
    let _y = spec.y || 0;

    _x = Math.max( _x, 0 );
    _y = Math.max( _y, 0 );

    var obj = baseGrid( { rows: _x } );

    for(var row = 0; row < _x; row++) {
        for(var col = 0; col < _y; col++) {
            obj.set(row,col,0);
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

var circleGrid = (spec) => {


    spec = spec || {};

    let _rings = spec.rings || 0;

    _rings = Math.max( _rings, 0 );

    var obj = baseGrid( { rows: _rings } );

    // prepare grid

    // Single cell on row 0.
    obj.set(0,0,0);

    // rings are rows
    var rowHeight = 1.0 / _rings;

    for( var i = 1; i < _rings; i++ ) {
        // console.log("row: %d", i );
        var radius = i / _rings;
        // console.log(" ... row: %d, radius: %d", i, radius );
        var circumference = 2 * Math.PI * radius;
        // console.log(" ... circumference:", circumference );
        var previousCount = obj.rowSize( i - 1 );
        // console.log(" ... previousCount:", previousCount );
        var estimatedCellWidth = circumference / previousCount;
        // console.log(" ... estimatedCellWidth:", estimatedCellWidth );
        var ratio = Math.round( estimatedCellWidth / rowHeight);
        // console.log(" ... ratio:", ratio );
        var cells = previousCount * ratio;
        // console.log(" ... cells:", cells );
        for(var j = 0; j < cells; j++ ) {
            // _array[i].push(0);
            obj.set(i,j,0);
        }
        // console.log(_array[i]);
    }

    Object.defineProperties( obj, {
        "rings": {
            writeable: false,
            value: _rings,
            enumerable: true
        },
    });

    return Object.assign( obj, {
        ringSize: function(ring) {
            // rings equal rows in base class
            return this.rowSize(ring);
        },
    });
};

module.exports = {
    create: createGrid,
    Square: squareGrid,
    Circle: circleGrid,
    Hexagon: squareGrid,
};

