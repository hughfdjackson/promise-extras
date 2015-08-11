'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

var pe = require('../');

describe('Array of Promises functions', function(){
  describe('allSettled', allSettledTests);
  describe('fulfilled', fulfilledTests);
  describe('rejected', rejectedTests);
});


function fulfilledTests(){
  it('should return a Promise containing the results of only those inputs that fulfilled', function(){
    var inputs = [Promise.resolve(1), Promise.reject(2), 3];

    return pe.fulfilled(inputs).should.eventually.eql([1, 3]);
  });
}

function rejectedTests(){
  it('should return a Promise containing results of only those inputs that rejected', function(){
    var inputs = [Promise.resolve(1), Promise.reject(2), 3];

    return pe.rejected(inputs).should.eventually.eql([2]);
  });
}

function allSettledTests(){
  it('should return a Promise of fulfilled results when all inputs fulfilled', function(){
    var inputs = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    var expectedOutput = [{
      state: 'fulfilled',
      value: 1
    }, {
      state: 'fulfilled',
      value: 2
    }, {
      state: 'fulfilled',
      value: 3
    }];

    return pe.allSettled(inputs).should.eventually.eql(expectedOutput);
  });

  it('should return a Promise of rejected results when all inputs become rejected', function(){
    var inputs = [Promise.reject(1), Promise.reject(2), Promise.reject(3)];
    var expectedOutput = [{
      state: 'rejected',
      reason: 1
    }, {
      state: 'rejected',
      reason: 2
    }, {
      state: 'rejected',
      reason: 3
    }];

    return pe.allSettled(inputs).should.eventually.eql(expectedOutput);
  });

  it('should return a Promise of mixed results when the inputs resolve with mixed results', function(){
    var inputs = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];
    var expectedOutput = [{
      state: 'fulfilled',
      value: 1
    }, {
      state: 'rejected',
      reason: 2
    }, {
      state: 'fulfilled',
      value: 3
    }];

    return pe.allSettled(inputs).should.eventually.eql(expectedOutput);
  });

  it('should implicitly convert non-Promise values to resolved promises', function(){
    var inputs = [1, 2, 3];
    var expectedOutput = [{
      state: 'fulfilled',
      value: 1
    }, {
      state: 'fulfilled',
      value: 2
    }, {
      state: 'fulfilled',
      value: 3
    }];

    return pe.allSettled(inputs).should.eventually.eql(expectedOutput);
  });
}
