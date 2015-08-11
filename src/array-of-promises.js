'use strict';

// allSettled
var fulfilledSettleReport = function(value) {
  return {
    state: 'fulfilled',
    value: value
  }
};

var rejectedSettleReport = function(error) {
  return {
    state: 'rejected',
    reason: error
  }
}

var settlePromise = function(promise) {
    return promise.then(fulfilledSettleReport).catch(rejectedSettleReport)
}

var resolveAndSettle = function(promise) {
  return settlePromise(Promise.resolve(promise));
}

var allSettled = function(promises) {
  return Promise.all(promises.map(resolveAndSettle));
}


// fulfilled
var isFulfilled = function(report) {
  return report.state === 'fulfilled';
}

var getValue = function(report) {
  return report.value;
}

var filterFulfilledAndGetValues = function(settledReports) {
  return settledReports.filter(isFulfilled).map(getValue);
}

var fulfilled = function(promises) {
    return allSettled(promises).then(filterFulfilledAndGetValues);
}

// rejected
var isRejected = function(report) {
  return report.state === 'rejected';
}

var getReason = function(report) {
  return report.reason;
}

var filterRejectedAndGetReasons = function(settledReports) {
  return settledReports.filter(isRejected).map(getReason);
}

var rejected = function(promises) {
  return allSettled(promises).then(filterRejectedAndGetReasons);
}

module.exports = {
  allSettled: allSettled,
  fulfilled: fulfilled,
  rejected: rejected
}
