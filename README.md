@mitchallen/grid
===============================

A 2D grid that uses zero-based indexing.
----------------------------------------------------

* * *
## Installation

You must use __npm__ __2.7.0__ or higher because of the scoped package name.

    $ npm init
    $ npm install @mitchallen/grid --save
  
* * *

## Usage

Create a new folder and do the following at the command line:

    $ npm init
    $ npm install @mitchallen/grid --save

In the same folder create a file called __index.js__ with the content below:

    "use strict";
    var gridFactory = require("@mitchallen/grid");
    
    var xSize = 5;
    var ySize = 10;
    var value = 100;
    var i = xSize - 1;
    var j = ySize - 1;
    
    var grid = gridFactory.create( { x: xSize, y: ySize } );
    
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
    
At the command line, execute the following:

    $ node index.js
  
An example similar to this exists on the __examples__ folder out on the repo.
  
* * *
    
## Methods

### create( spec ) 

Factory method that returns a grid object.

It takes one spec parameter that must be an object with __x__ and __y__ values specifying the size of the grid.

The __x__ and __y__ values can not be less than one (1).

The method will set xSize and ySize to 0 if no parameters are set

You can call __create__ multiple times to create multiple grids.

    var gridFactory = require("@mitchallen/grid");
    
    var grid1 = gridFactory.create( { x: 5, y: 10 } );
    var grid2 = gridFactory.create( { x: 7, y: 20 } );
    
	if(!grid1 || !grid2) ...
	
### grid.xSize

Returns the size of the x dimension.

	grid.xSize.should.eql(5);
	
### grid.ySize

Returns the size of the y dimension.

	grid.ySize.should.eql(10);

### grid.ySize

### grid.isCell( x, y )

The __x__ and __y__ parameters should be zero-based coordinates ranging from  zero (0) to axis size minus one. 

For example if the __x__ size value passed to the __create__ method is 5, then valid values for __x__ are __0__ through __4__. 

The method is called internally by __set__ and __get__.

    if(! grid.isCell( i, j ) ) {
    	console.error("parameters not within grid");
    }


### grid.set( x, y, value )

The __x__ and __y__ values are passed to the __isCell__ method internally for validation. If the parameters fail validation then a value of __false__ is returned. Otherwise __true__ is returned.

The __value__ parameter can be a number, a string or even an object.

    if(! grid.set( i, j, value )) {
    	console.error("couldn't set grid value");
    }

### grid.get( x, y )

The __x__ and __y__ values are passed to the __isCell__ method internally for validation. If the parameters fail validation then a __*null*__ object is returned. Otherwise the value of the cell (grid location) is returned.

The returned value can be a number, a string or even an object.

    let result = grid.get( i, j );
    
    if(! result) {
    	console.error("couldn't get grid value");
    } else {
    	console.log("grid value: ", result );
    }

### grid.fill(value)

Fills the grid with whatever is passed in as __value__. Value can be a number, a string or even an object. Any existing values in the grid will be replaced with the new fill value.

    let fillValue = "foo";
    
    var result = grid.fill(fillValue);
    
### grid.cloneArray()

Returns a clone of the internal array. This is not a reference. So changes to the cloned array should not change the original.

	let tX = 0;
	let tY = 0;
	let gridValue = 100;
	let cloneValue = 500;
	
	// Set a value in the original grid
	grid.set(tX,tY,gridValue);

	// Clone the grid	
	let arr = grid.cloneArray();
	
	// Verify value exists in clone
	arr[tX][tY].should.eql(gridValue);
	
	// Change value in clone
	arr[tX][tY] = cloneValue;
	
	// Verify new value is set in clone
	arr[tX][tY].should.eql(cloneValue);
	
	// Ensure that value does not alter original grid
	grid.get(tX,tY).should.eql(gridValue);
	
### grid.log()

Logs the size and contents of the internal array.

    grid.log();
    
Example output:

    size: 4, 5
    [ [ 20, 10, 10, 10, 10 ],
      [ 10, 10, 10, 10, 10 ],
      [ 10, 10, 10, 10, 10 ],
      [ 10, 10, 10, 10, 30 ] ]

* * *

## Examples

You can find examples in the repos listed below in the __examples__ folder.

* * *

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

#### Version 0.1.8

* removed redundant negative check

#### Version 0.1.7

* __create__ now sets defaults if parameters invalid instead of returning null

#### Version 0.1.6

* added the __xSize__ and __ySize__ properties

#### Version 0.1.5

* added __log__ method

#### Version 0.1.4

* added __cloneArray__ method

#### Version 0.1.3

* added __fill__ method

#### Version 0.1.2

* updated readme

#### Version 0.1.1

* updated example to use published package
* updated description in package.json

#### Version 0.1.0 

* initial release












* * *
