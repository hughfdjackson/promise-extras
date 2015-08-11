'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

var pe = require('../');

describe('Object of Promises functions', function(){
  describe('objectAll', objectAllTest);
  describe('objectFulfilled', objectFulfilledTest);
  describe('objectRejected', objectRejectedTest);
});

function objectAllTest(){
  it('should fulfill when all object properties fulfill, gathering results into an object', function(){
    var input = {
      x: Promise.resolve(1),
      y: Promise.resolve(2),
      z: Promise.resolve(3)
    };
    var expectedOutput = {
      x: 1,
      y: 2,
      z: 3
    };

    return pe.objectAll(input).should.eventually.eql(expectedOutput);
  });

  it('should reject with the first failure', function(){
    var input = {
      x: Promise.resolve(1),
      y: pe.delay(100).then(function(){ throw 2 }),
      z: Promise.reject(3)
    };
    var expectedFailure = 3;

    return pe.objectAll(input).should.be.rejectedWith(expectedFailure);
  });

  it('should treat non-promise properties as automatic fulfilled', function(){
    var input = {
      x: 1,
      y: 2,
      z: 3
    };

    return pe.objectAll(input).should.eventually.eql(input);
  });
}

function objectFulfilledTest(){
  it('should fulfill with only those properties that fulfill', function(){
    var input = {
      x: Promise.resolve(1),
      y: Promise.reject(2),
      z: 3
    };
    var expectedOutput = {
      x: 1,
      z: 3
    };

    return pe.objectFulfilled(input).should.eventually.eql(expectedOutput);
  });

  it('should fulfill with an empty object if it doesn\'t become fulfilled', function(){
    var input = {
      x: Promise.reject(1),
      y: Promise.reject(2),
      z: Promise.reject(3)
    };
    var expectedOutput = {};

    return pe.objectFulfilled(input).should.eventually.eql(expectedOutput);
  });
}

function objectRejectedTest(){
  it('should fulfill with only those properties that reject', function(){
    var input = {
      x: Promise.resolve(1),
      y: Promise.reject(2),
      z: 3
    };
    var expectedOutput = {
      y: 2
    };

    return pe.objectRejected(input).should.eventually.eql(expectedOutput);
  });

  it('should fulfill with an empty object if all properties fulfill', function(){
    var input = {
      x: Promise.resolve(1),
      y: Promise.resolve(2),
      z: 3
    };
    var expectedOutput = {};

    return pe.objectRejected(input).should.eventually.eql(expectedOutput);
  });
}
