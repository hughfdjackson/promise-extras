'use strict';

var report = require('./settle-report');

// allSettled
var settlePromise = function(promise){
  return promise
    .then(report.fulfilledSettleReport)
    .catch(report.rejectedSettleReport)
};

var resolveAndSettle = function(promise){
  return settlePromise(Promise.resolve(promise));
};

var allSettled = function(promises){
  return Promise.all(promises.map(resolveAndSettle));
};


// fulfilled
var filterFulfilledAndGetValues = function(settledReports){
  return settledReports
    .filter(report.isFulfilled)
    .map(report.getValue);
};

var fulfilled = function(promises){
  return allSettled(promises).then(filterFulfilledAndGetValues);
};

// rejected
var filterRejectedAndGetReasons = function(settledReports){
  return settledReports
    .filter(report.isRejected)
    .map(report.getReason);
};

var rejected = function(promises){
  return allSettled(promises).then(filterRejectedAndGetReasons);
};

module.exports = {
  allSettled: allSettled,
  fulfilled: fulfilled,
  rejected: rejected
}
