/**
    Module: @mitchallen/grid
      Test: create-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../index";

describe('module smoke test', function() {

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

    it('create with no spec should return null', function(done) {
        var obj = _module.create();
        should.not.exist(obj);
        done();
    });

    it('create with no x parameter should return null', function(done) {
        var obj = _module.create({ y: 5 });
        should.not.exist(obj);
        done();
    });

    it('create with no y parameter should return null', function(done) {
        var obj = _module.create({ x: 5 });
        should.not.exist(obj);
        done();
    });

    it('create with valid x and y parameters should return object', function(done) {
        var obj = _module.create({ x: 5, y: 5 });
        should.exist(obj);
        done();
    });

    it('create with x and y set to zero (0) should return null', function(done) {
        var obj = _module.create({ x: 0, y: 0 });
        should.not.exist(obj);
        done();
    });

    it('create with x set to zero (0) should return null', function(done) {
        var obj = _module.create({ x: 0, y: 1 });
        should.not.exist(obj);
        done();
    });

    it('create with y set to zero (0) should return null', function(done) {
        var obj = _module.create({ x: 1, y: 0 });
        should.not.exist(obj);
        done();
    });

    it('create with x and y set to one (1) should return object', function(done) {
        var obj = _module.create({ x: 1, y: 1 });
        should.exist(obj);
        done();
    });

    it('create with x and y set to negative value should return null', function(done) {
        var obj = _module.create({ x: -1, y: -1 });
        should.not.exist(obj);
        done();
    });

    it('create with x set to negative value should return null', function(done) {
        var obj = _module.create({ x: -1, y: 1 });
        should.not.exist(obj);
        done();
    });

    it('create with y set to negative value should return null', function(done) {
        var obj = _module.create({ x: 1, y: -1 });
        should.not.exist(obj);
        done();
    });
});
