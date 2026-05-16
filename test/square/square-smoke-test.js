/**
    Module: @mitchallen/grid
      Test: square-smoke-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const modulePath = "../../src/index";

describe('Square smoke test', function() {

    var _module = null;

    before(function() {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _module = require(modulePath);
    });

    after(function() {
        // Call after all tests
    });

    beforeEach(function() {
        // Call before each test
    });

    afterEach(function() {
        // Call after eeach test
    });

    it('module should exist', function() {
        assert.ok(_module != null);
    });

    it('.Square method with no spec should return valid object', function() {
        var obj = _module.Square();
        assert.ok(obj != null);
    });

    it('.Square method with valid x and y parameters should return object', function() {
        var obj = _module.Square({ x: 5, y: 5 });
        assert.ok(obj != null);
    });

    it('xSize should return size of x dimension', function() {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        assert.deepStrictEqual(obj.xSize, sizeX);
    });

    it('ySize should return size of y dimension', function() {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        assert.deepStrictEqual(obj.ySize, sizeY);
    });

    it('rows should return size of x dimension', function() {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        assert.deepStrictEqual(obj.rows, sizeX);
    });

    it('rowSize should return size of y dimension', function() {
        let sizeX = 5;
        let sizeY = 6;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        assert.deepStrictEqual(obj.rowSize(0), sizeY);
    });

    it('isCell method with valid x and y parameters should return true', function() {
        let sizeX = 5;
        let sizeY = 5;
        var obj = _module.Square({ x: sizeX, y: sizeY });
        assert.ok(obj != null);
        var result = obj.isCell(sizeX-1, sizeY-1);
        assert.deepStrictEqual(result, true);
    });

    it('set method with valid parameter should return true', function() {
        var obj = _module.Square({ x: 1, y: 1 });
        assert.ok(obj != null);
        var result = obj.set(0,0,5);
        assert.deepStrictEqual(result, true);
    });

    it('get method with valid parameter should return value', function() {
        var obj = _module.Square({ x: 1, y: 1 });
        assert.ok(obj != null);
        let tX = 0;
        let tY = 0;
        let tValue = 5;
        var condition = obj.set(tX,tY,tValue);
        assert.deepStrictEqual(condition, true);
        var result = obj.get(tX,tY);
        assert.deepStrictEqual(result, tValue);
    });

    it('fill method with valid integer should fill grid with integer', function() {
        let xSize = 5;
        let ySize = 10;
        var obj = _module.Square({ x: xSize, y: ySize });
        assert.ok(obj != null);
        let tValue = 999;
        var result = obj.fill(tValue);
        for(var x = 0; x < xSize; x++ ) {
            for(var y = 0; y < ySize; y++ ) {
                assert.deepStrictEqual(obj.get(x,y), tValue);
            }
        }
    });

   it('cloneArray method should return a clone of the internal array', function() {
        var obj = _module.Square({ x: 1, y: 1 });
        assert.ok(obj != null);
        let tX = 0;
        let tY = 0;
        let tValue = 100;
        var result = obj.set(tX,tY,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[tX][tY], tValue);
    });

    it('log method should not throw exception', function() {
        let xSize = 4;
        let ySize = 5;
        var grid = _module.Square({ x: xSize, y: ySize });
        assert.ok(grid != null);
        grid.fill(10)
        grid.set(0,0,20);
        grid.set(xSize - 1, ySize - 1,30);
        grid.log();
    });
});
