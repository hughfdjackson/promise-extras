'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

var pe = require('../');

describe('Promise creation functions', function(){
  describe('delay', delayTest);
});

function delayTest(){
  it('should resolve a Promise after a given amount of time', function(){
    // JavaScript does not allow us to guarantee *exact* amounts of time,
    // so we're going to test for 'at least' the minimum threshold
    var startTime = Date.now();
    var delayTime = 10

    return pe.delay(delayTime).then(function(){
      (Date.now() - startTime  >= delayTime).should.be.true;
    });
  });
}
