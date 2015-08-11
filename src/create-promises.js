'use strict';

var delay = function(milliseconds){
  return new Promise(function(resolve, _){
    setTimeout(resolve, milliseconds);
  });
}


module.exports = {
  delay: delay
}
