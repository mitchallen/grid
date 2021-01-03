/**
    Module: @mitchallen/grid
      Test: create-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

var request = require('supertest'),
    should = require('should'),
    // modulePath = "../../modules/index";
    modulePath = "../../dist/grid";

describe('create method', function() {

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

    it('should return object when missing spec parameter', function(done) {
        var obj = _module.Square();
        should.exist(obj);
        done();
    });

    it('should return object when called no spec x parameter', function(done) {
        var obj = _module.Square({ y: 5 });
        should.exist(obj);
        done();
    });

    it('should set xSize default when created with no x parameter', function(done) {
        var obj = _module.Square({ y: 5 });
        obj.xSize.should.eql(0);
        done();
    });

    it('should set ySize default when created with no y parameter', function(done) {
        var obj = _module.Square({ x: 5 });
        obj.ySize.should.eql(0);
        done();
    });

    it('should return object when called no spec y parameter', function(done) {
        var obj = _module.Square({ x: 5 });
        should.exist(obj);
        done();
    });

    it('should return object when called with valid x and y parameters', function(done) {
        var obj = _module.Square({ x: 5, y: 5 });
        should.exist(obj);
        done();
    });

    it('should return xSize that matches create parameter', function(done) {
        var x = 5;
        var obj = _module.Square({ x: x, y: 1 });
        obj.xSize.should.eql(x);
        done();
    });

    it('should return ySize that matches create parameter', function(done) {
        var y = 5;
        var obj = _module.Square({ x: 1, y: y });
        obj.ySize.should.eql(y);
        done();
    });

    it('should return object when called with x and y spec parameters set to zero (0) ', function(done) {
        var obj = _module.Square({ x: 0, y: 0 });
        should.exist(obj);
        done();
    });

    it('should return object when called with a spec x parameter set to zero (0)', function(done) {
        var obj = _module.Square({ x: 0, y: 1 });
        should.exist(obj);
        done();
    });

    it('should return object when called with a spec y parameter set to zero (0)', function(done) {
        var obj = _module.Square({ x: 1, y: 0 });
        should.exist(obj);
        done();
    });

    it('should return an object when called with x and y set to one (1)', function(done) {
        var obj = _module.Square({ x: 1, y: 1 });
        should.exist(obj);
        done();
    });

    it('should return object when called with x and y set to negative value', function(done) {
        var obj = _module.Square({ x: -1, y: -1 });
        should.exist(obj);
        done();
    });

    it('should normalize x when called with x and y set to negative value', function(done) {
        var obj = _module.Square({ x: -1, y: -1 });
        obj.xSize.should.eql(0);
        done();
    });

    it('should normalize y when called with x and y set to negative value', function(done) {
        var obj = _module.Square({ x: -1, y: -1 });
        obj.ySize.should.eql(0);
        done();
    });

    it('should return object when called with x set to negative value', function(done) {
        var obj = _module.Square({ x: -1, y: 1 });
        should.exist(obj);
        done();
    });

    it('should normalize x when called with x set to negative value', function(done) {
        var obj = _module.Square({ x: -1, y: 1 });
        obj.xSize.should.eql(0);
        done();
    });

    it('should return object when called with y set to negative value', function(done) {
        var obj = _module.Square({ x: 1, y: -1 });
        should.exist(obj);
        done();
    });

    it('should normalize y when called with y set to negative value', function(done) {
        var obj = _module.Square({ x: 1, y: -1 });
        obj.ySize.should.eql(0);
        done();
    });

});
