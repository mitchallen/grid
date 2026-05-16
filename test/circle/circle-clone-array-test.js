/**
    Module: @mitchallen/grid-circle
      Test: clone-array-test
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const modulePath = "../../src/index";

describe('Circle cloneArray method', function() {

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

   it('should return a clone of the internal array', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        assert.ok(obj != null);
        let fillValue = 999;
        obj.fill(fillValue);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[ring][pos], tValue);
        assert.deepStrictEqual(arr[0][0], fillValue);
    });


    it('return should not be reference to original', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: 5 });
        assert.ok(obj != null);
        let fillValue = 999;
        obj.fill(fillValue);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[ring][pos], tValue);
        assert.deepStrictEqual(arr[0][0], fillValue);
        let cValue = 5000;
        arr[0][0] = cValue;
        assert.deepStrictEqual(arr[0][0], cValue);
        assert.deepStrictEqual(obj.get(0,0), fillValue);
    });

    it('should return a clone of the internal array for a one ring grid', function() {
        var obj = _module.Circle({ rings: 1 });
        assert.ok(obj != null);
        let ring = 0;
        let pos = 0;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[ring][pos], tValue);
    });

    it('should return matching string objects', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        assert.ok(obj != null);
       let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = "foo";
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[ring][pos], tValue);
    });

    it('should return matching objects', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        assert.ok(obj != null);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tName = "foo";
        let tValue = { name: tName };
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        var result = arr[ring][pos];
        assert.deepStrictEqual(result, tValue);
        assert.deepStrictEqual(result.name, tName);
    });

    it('should return matching date objects', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        assert.ok(obj != null);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = new Date();
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        assert.deepStrictEqual(arr[ring][pos], tValue);
    });

    it('should return matching function objects', function() {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        assert.ok(obj != null);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let fReturn = 123;
        let tValue = function() { return fReturn; };
        var result = obj.set(ring,pos,tValue);
        assert.deepStrictEqual(result, true);
        var arr = obj.cloneArray();
        var fResult = arr[ring][pos];
        assert.deepStrictEqual(fResult, tValue);
        assert.deepStrictEqual(fResult(), fReturn);
    });
});
