'use strict';

var array = require('./array-of-promises');
var report = require('./settle-report')

// object utilities
var zipObject = function(keys, properties){
  return keys.reduce(function(object, key, i){
    object[key] = properties[i];
    return object;
  }, {});
};

var mapObject = function(o, fn){
  return Object.keys(o).reduce(function(object, key){
    object[key] = fn(o[key]);
    return object;
  }, {})
}

var filterObject = function(o, fn){
  return Object.keys(o).reduce(function(object, key){
    if ( fn(o[key]) === true ) object[key] = o[key];
    return object;
  }, {});
}

var keysAndValues = function(object){
  var keys = Object.keys(object);
  var values = keys.map(function(key){ return object[key] });

  return { keys: keys, values: values };
}


// objectSettled
var objectAllSettled = function(objectOfPromises){
  var keysAndPromises = keysAndValues(objectOfPromises);

  return array.allSettled(keysAndPromises.values).then(function(reports){
    return zipObject(keysAndPromises.keys, reports);
  });
}

// objectAll
var objectAll = function(objectOfPromises){
  var keysAndPromises = keysAndValues(objectOfPromises);

  return Promise.all(keysAndPromises.values).then(function(values){
    return zipObject(keysAndPromises.keys, values);
  });
};

// objectFulfilled
var filterFulfilledAndGetValues = function(settledReports){
  var fulfilledReports = filterObject(settledReports, report.isFulfilled);
  return mapObject(fulfilledReports, report.getValue);
}

var objectFulfilled = function(objectOfPromises){
  return objectAllSettled(objectOfPromises).then(filterFulfilledAndGetValues);
};


// objectRejected
var filterRejectedAndGetReasons = function(settledReports){
  var rejectedReports = filterObject(settledReports, report.isRejected);
  return mapObject(rejectedReports, report.getReason);
}

var objectRejected = function(objectOfPromises){
  return objectAllSettled(objectOfPromises).then(filterRejectedAndGetReasons);
}

module.exports = {
  objectAll: objectAll,
  objectFulfilled: objectFulfilled,
  objectRejected: objectRejected
}
