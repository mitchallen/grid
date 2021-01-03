/**
    Module: @mitchallen/grid
      Test: square-smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    // modulePath = "../../modules/index";
    modulePath = "../../dist/grid";

describe('Square smoke test', function() {

    var _module = null;

    before(function(done) {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _module = require(modulePath);
        done();
    });

    after(function(done) {
        // Call after all tests
        done();
    });

    beforeEach(function(done) {
        // Call before each test
        done();
    });

    afterEach(function(done) {
        // Call after eeach test
        done();
    });

    it('module should exist', function(done) {
        should.exist(_module);
        done();
    });

    it('.Square method with no spec should return valid object', function(done) {
        var obj = _module.Square();
        should.exist(obj);
        done();
    });

    it('.Square method with valid x and y parameters should return object', function(done) {
        var obj = _module.Square({ x: 5, y: 5 });
        should.exist(obj);
        done();
    });

    it('xSize should return size of x dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        obj.xSize.should.eql(sizeX);
        done();
    });

    it('ySize should return size of y dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        obj.ySize.should.eql(sizeY);
        done();
    });

    it('rows should return size of x dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        obj.rows.should.eql(sizeX);
        done();
    });

    it('rowSize should return size of y dimension', function(done) {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        obj.rowSize(0).should.eql(sizeY);
        done();
    });

    it('isCell method with valid x and y parameters should return true', function(done) {
        let sizeX = 5;
        let sizeY = 5;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        should.exist(obj);
        var result = obj.isCell(sizeX-1, sizeY-1);
        result.should.eql(true);
        done();
    });

    it('set method with valid parameter should return true', function(done) {
        var obj = _module.Square({ x: 1, y: 1 });
        should.exist(obj);
        var result = obj.set(0,0,5);
        result.should.eql(true);
        done();
    });

    it('get method with valid parameter should return value', function(done) {
        var obj = _module.Square({ x: 1, y: 1 });
        should.exist(obj);
        let tX = 0;
        let tY = 0;
        let tValue = 5;
        var condition = obj.set(tX,tY,tValue);
        condition.should.eql(true);
        var result = obj.get(tX,tY);
        result.should.eql(tValue);
        done();
    });

    it('fill method with valid integer should fill grid with integer', function(done) {
        let xSize = 5;
        let ySize = 10;
        var obj = _module.Square({ x: xSize, y: ySize });
        should.exist(obj);
        let tValue = 999;
        var result = obj.fill(tValue);
        for(var x = 0; x < xSize; x++ ) {
            for(var y = 0; y < ySize; y++ ) {
                obj.get(x,y).should.eql(tValue);
            }
        }
        done();
    });

   it('cloneArray method should return a clone of the internal array', function(done) {
        var obj = _module.Square({ x: 1, y: 1 });
        should.exist(obj);
        let tX = 0;
        let tY = 0;
        let tValue = 100;
        var result = obj.set(tX,tY,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[tX][tY].should.eql(tValue);
        done();
    });

    it('log method should not throw exception', function(done) {
        let xSize = 4;
        let ySize = 5;
        var grid = _module.Square({ x: xSize, y: ySize });
        should.exist(grid);
        grid.fill(10)
        grid.set(0,0,20);
        grid.set(xSize - 1, ySize - 1,30);
        grid.log();
        done();
    });
});
