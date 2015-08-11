'use strict';

var arrayOfPromises = require('./array-of-promises');
var objectOfPromises = require('./object-of-promises');
var createPromises = require('./create-promises');

module.exports = {
  allSettled: arrayOfPromises.allSettled,
  fulfilled: arrayOfPromises.fulfilled,
  rejected: arrayOfPromises.rejected,

  objectAll: objectOfPromises.objectAll,
  objectFulfilled: objectOfPromises.objectFulfilled,
  objectRejected: objectOfPromises.objectRejected,
  
  delay: createPromises.delay
};
