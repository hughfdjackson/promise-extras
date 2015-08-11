'use strict';

var arrayOfPromises = require('./array-of-promises');

module.exports = {
  allSettled: arrayOfPromises.allSettled,
  fulfilled: arrayOfPromises.fulfilled,
  rejected: arrayOfPromises.rejected,
};
