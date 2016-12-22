    
"use strict";
var gridFactory = require("@mitchallen/grid");
var xSize = 5;
var ySize = 10;
var value = 100;
var i = xSize - 1;
var j = ySize - 1;
var grid = gridFactory.Square( { x: xSize, y: ySize } );
if(!grid) {
    console.error("couldn't create grid");
}
if(! grid.isCell( i, j ) ) {
    console.error("parameters not within grid");
}
if(! grid.set( i, j, value )) {
    console.error("couldn't set grid value");
}
let result = grid.get( i, j );
if(! result) {
    console.error("couldn't get grid value");
} else {
        console.log("grid value: ", result );
}