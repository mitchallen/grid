
@mitchallen/grid
==
A simple 2D grid.
--
* * *
## Installation

You must use __npm__ __2.7.0__ or higher because of the scoped package name.

    $ npm init
    $ npm install @mitchallen/grid --save
  
* * *

## Usage


    "use strict";
    var gridFactory = require("@mitchallen/grid");
    var xSize = 5;
    var ySize = 10;
    var value = 100;
    var i = xSize - 1;
    var j = ySize - 1;
    var grid = gridFactory.create( { x: xSize, y: ySize } );
    if(! grid.isCell( i, j ) ) {
    	console.error("parameters not within grid");
    }
    if(! grid.set( i, j, value )) {
    	console.error("couldn't create grid");
    }
    let result = grid.get( i, j );
    if(! result) {
    	console.error("couldn't get grid value");
    } else {
    	console.log("grid value: ", result );
    }
    

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/grid.git](https://bitbucket.org/mitchallen/grid.git)
* [github.com/mitchallen/grid.git](https://github.com/mitchallen/grid.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.0 

* initial release

* * *
