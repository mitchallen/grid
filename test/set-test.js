/**
    Module: @mitchallen/grid
      Test: set-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../index";

describe('module set test', function() {

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

    it('set with valid parameters should return true', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        var result = obj.set(0,0,5);
        result.should.eql(true);
        done();
    });

    it('set called twice should return second value', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        let tX = 0;
        let tY = 0;
        let tValues = [ 5, 10 ];
        var condition = obj.set(tX,tY,tValues[0]);
        condition.should.eql(true);
        condition = obj.set(tX,tY,tValues[1]);
        condition.should.eql(true);
        var result = obj.get(tX,tY);
        result.should.eql(tValues[1]);
        done();
    });

    it('set with x and y parameters set to size minus one should return true', function(done) {
        let sizeX = 10;
        let sizeY = 20;
        var obj = _module.create({ x: sizeX, y: sizeY });
        should.exist(obj);
        var result = obj.set(sizeX-1,sizeY-1,5);
        result.should.eql(true);
        done();
    });

    it('set with negative cell value should return true', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        var result = obj.set(0,0,-1);
        result.should.eql(true);
        done();
    });

    it('set with string value should return true', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        var result = obj.set(0,0,"foo");
        result.should.eql(true);
        done();
    });

    it('set with object value should return true', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        var result = obj.set(0,0,{ name: "foo" });
        result.should.eql(true);
        done();
    });
});
