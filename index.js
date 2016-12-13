/**
    Module: @mitchallen/grid
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var baseGrid = require('./lib/base'),
    squareGrid = require('./lib/square'),
    circleGrid = require('./lib/circle');

var createGrid = (spec) => {
    console.warn("@mitchallen/grid: .create is deprecated. Use .Square instead.");
    return squareGrid( spec );
};

module.exports = {
    create: createGrid,
    Square: squareGrid,
    Circle: circleGrid,
    Hexagon: squareGrid,
};

