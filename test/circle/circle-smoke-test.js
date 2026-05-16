/**
    Module: @mitchallen/grid
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const modulePath = "../../src/index";

describe('Circle smoke test', function() {

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

    it('Circle method with no spec should return valid object', function() {
        var obj = _module.Circle();
        assert.ok(obj != null);
    });

    it('rings should match value in Circle parameter', function() {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        assert.ok(obj != null);
        assert.deepStrictEqual(obj.rings, r);
    });

    it('rows should return ring size', function() {
        let r = 6;
        var obj = _module.Circle({ rings: r });
        assert.deepStrictEqual(obj.rows, r);
    });

    it('rowSize should return ringSize', function() {
        let r = 6;
        var obj = _module.Circle({ rings: r });
        assert.deepStrictEqual(obj.ringSize(0), obj.rowSize(0));
        assert.deepStrictEqual(obj.ringSize(1), obj.rowSize(1));
        assert.deepStrictEqual(obj.ringSize(2), obj.rowSize(2));
        assert.deepStrictEqual(obj.ringSize(3), obj.rowSize(3));
        assert.deepStrictEqual(obj.ringSize(4), obj.rowSize(4));
        assert.deepStrictEqual(obj.ringSize(5), obj.rowSize(5));
    });

    it('ring size should return expected values', function() {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        assert.deepStrictEqual(obj.ringSize(0), 1);
        assert.deepStrictEqual(obj.ringSize(1), 6);
        assert.deepStrictEqual(obj.ringSize(2), 12);
        assert.deepStrictEqual(obj.ringSize(3), 24);
        assert.deepStrictEqual(obj.ringSize(4), 24);
        assert.deepStrictEqual(obj.ringSize(5), 24);
    });

    it('fill should fill grid with value', function() {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        obj.fill(8);
        obj.log();
    });

    it('set should set cell value at ring 0 position 0', function() {
        var r = 6,
            obj = _module.Circle( { rings: r } ),
            ring = 0,
            pos = 0,
            v = 4;
        assert.deepStrictEqual(obj.set(ring,pos,v), true);
        var result = obj.get(ring,pos)
        obj.log();
    });

    it('set should set cell value at ring 1 position 0', function() {
        var r = 6,
            obj = _module.Circle( { rings: r } ),
            ring = 1,
            pos = 0,
            v = 4;
        assert.deepStrictEqual(obj.set(ring,pos,v), true);
        var result = obj.get(ring,pos)
        obj.log();
    });

    it('log should log the internal array', function() {
        var r = 3;
        var obj = _module.Circle( { rings: r } );
        obj.fill(8);
        obj.log();
    });
});
