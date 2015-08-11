'use strict';

var fulfilledSettleReport = function(value){
  return {
    state: 'fulfilled',
    value: value
  }
};

var rejectedSettleReport = function(error){
  return {
    state: 'rejected',
    reason: error
  }
};

var isFulfilled = function(report){
  return report.state === 'fulfilled';
};

var getValue = function(report){
  return report.value;
};

var isRejected = function(report){
  return report.state === 'rejected';
};

var getReason = function(report){
  return report.reason;
};

module.exports = {
  fulfilledSettleReport: fulfilledSettleReport,
  rejectedSettleReport: rejectedSettleReport,
  isFulfilled: isFulfilled,
  isRejected: isRejected,
  getValue: getValue,
  getReason: getReason
}
