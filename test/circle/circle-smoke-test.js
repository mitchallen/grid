/**
    Module: @mitchallen/grid
      Test: smoke-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../../index";

describe('Circle smoke test', function() {

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

    it('Circle method with no spec should return valid object', function(done) {
        var obj = _module.Circle();
        should.exist(obj);
        done();
    });

    it('rings should match value in Circle parameter', function(done) {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        should.exist(obj);
        obj.rings.should.eql(r);
        done();
    });

    it('rows should return ring size', function(done) {
        let r = 6;
        var obj = _module.Circle({ rings: r });
        obj.rows.should.eql(r);
        done();
    });

    it('rowSize should return ringSize', function(done) {
        let r = 6;
        var obj = _module.Circle({ rings: r });
        obj.ringSize(0).should.eql(obj.rowSize(0));
        obj.ringSize(1).should.eql(obj.rowSize(1));
        obj.ringSize(2).should.eql(obj.rowSize(2));
        obj.ringSize(3).should.eql(obj.rowSize(3));
        obj.ringSize(4).should.eql(obj.rowSize(4));
        obj.ringSize(5).should.eql(obj.rowSize(5));
        done();
    });

    it('ring size should return expected values', function(done) {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        obj.ringSize(0).should.eql(1);
        obj.ringSize(1).should.eql(6);
        obj.ringSize(2).should.eql(12);
        obj.ringSize(3).should.eql(24);
        obj.ringSize(4).should.eql(24);
        obj.ringSize(5).should.eql(24);
        done();
    });

    it('fill should fill grid with value', function(done) {
        var r = 6;
        var obj = _module.Circle( { rings: r } );
        obj.fill(8);
        obj.log();
        done();
    });

    it('set should set cell value at ring 0 position 0', function(done) {
        var r = 6,
            obj = _module.Circle( { rings: r } ),
            ring = 0,
            pos = 0,
            v = 4;
        obj.set(ring,pos,v).should.eql(true);
        var result = obj.get(ring,pos)
        obj.log();
        done();
    });

    it('set should set cell value at ring 1 position 0', function(done) {
        var r = 6,
            obj = _module.Circle( { rings: r } ),
            ring = 1,
            pos = 0,
            v = 4;
        obj.set(ring,pos,v).should.eql(true);
        var result = obj.get(ring,pos)
        obj.log();
        done();
    });

    it('log should log the internal array', function(done) {
        var r = 3;
        var obj = _module.Circle( { rings: r } );
        obj.fill(8);
        obj.log();
        done();
    });
});
