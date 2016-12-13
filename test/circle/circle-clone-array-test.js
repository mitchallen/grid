/**
    Module: @mitchallen/grid-circle
      Test: clone-array-test
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../../index";

describe('Circle cloneArray method', function() {

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

   it('should return a clone of the internal array', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        should.exist(obj);
        let fillValue = 999;
        obj.fill(fillValue);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[ring][pos].should.eql(tValue);
        arr[0][0].should.eql(fillValue);
        done();
    });


    it('return should not be reference to original', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: 5 });
        should.exist(obj);
        let fillValue = 999;
        obj.fill(fillValue);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[ring][pos].should.eql(tValue);
        arr[0][0].should.eql(fillValue);
        let cValue = 5000;
        arr[0][0] = cValue;
        arr[0][0].should.eql(cValue);
        obj.get(0,0).should.eql(fillValue);
        done();
    });

    it('should return a clone of the internal array for a one ring grid', function(done) {
        var obj = _module.Circle({ rings: 1 });
        should.exist(obj);
        let ring = 0;
        let pos = 0;
        let tValue = 100;
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[ring][pos].should.eql(tValue);
        done();
    });

    it('should return matching string objects', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        should.exist(obj);
       let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = "foo";
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[ring][pos].should.eql(tValue);
        done();
    });

    it('should return matching objects', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        should.exist(obj);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tName = "foo";
        let tValue = { name: tName };
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        var result = arr[ring][pos];
        result.should.eql(tValue);
        result.name.should.eql(tName);
        done();
    });

    it('should return matching date objects', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        should.exist(obj);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let tValue = new Date();
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        arr[ring][pos].should.eql(tValue);
        done();
    });

    it('should return matching function objects', function(done) {
        let rings = 5;
        var obj = _module.Circle({ rings: rings });
        should.exist(obj);
        let ring = rings - 1;
        let pos = obj.ringSize(ring) - 1;
        let fReturn = 123;
        let tValue = function() { return fReturn; };
        var result = obj.set(ring,pos,tValue);
        result.should.eql(true);
        var arr = obj.cloneArray();
        var fResult = arr[ring][pos];
        fResult.should.eql(tValue);
        fResult().should.eql(fReturn);
        done();
    });
});
