
JavaScript's core libraries tend to be quite spare - and [ES2015's Promise](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) is no exception.  It packs in just *two* utilities to work with multiple Promises (`.all` and `.race`).  `promise-extras` delivers the rest as a library.

This library assumes there is a `Promise` constructor in global scope.  If you don't have one, you can include [es6-promise](https://github.com/jakearchibald/es6-promise).  It also assumes that ES5 methods are available.  If you need to support pre-ES5 environment, you may need to include [es5-shim](https://github.com/es-shims/es5-shim).

# Installation

## npm

```
npm install @hughfdjackson/promise-extras
```

# API

## Array of Promises

### allSettled

Like [Q's .allSettled](https://github.com/kriskowal/q/wiki/API-Reference#promiseallsettled), takes an array of Promises and fulfills with an array describing the state of each of its inputs once they have settled.

```javascript
var pe = require('promise-extras');

pe.array.allSettled([Promise.resolve(1), Promise.reject(2), 3])
  .then(console.log);

/* console.log:
  [{
    state: 'fulfilled',
    value: 1
  }, {
    state: 'rejected',
    reason: 2
  }, {
    state: 'fulfilled',
    value: 3
  }];

*/
```

In keeping with ES2015's `Promise.all`, it implicitly converts 'regular' values to Promises via `Promise.resolve`.

### fulfilled

Returns an array containing values for only those inputs that fulfilled.

```javascript
pe.fulfilled([Promise.resolve(1), Promise.reject(2), 3])
  .then(console.log);

/* console.log:
  [1, 3];
*/
```

### rejected

Like [.fulfilled](#fulfilled), but resolves with only those inputs that become rejected.

```javascript
pe.rejected([Promise.resolve(1), Promise.reject(2), 3])
  .then(console.log);

/* console.log:
  [2]
*/
```


## Object of Promises

### objectAll

Equivalent to `Promise.all`, but accepting and returning an object instead.  As with `Promise.all`, any non-promise value is automatically treated as a fulfilled Promise.

```javascript
pe.objectAll({
    x: Promise.resolve(1),
    y: Promise.resolve(2),
    z: 3
  })
  .then(console.log);

/* console.log:
  {
    x: 1,
    y: 2,
    z: 3
  }
*/
```

The returned Promise will become rejected whenever any of the Promises.  As with `Promise.all`, it has fail-fast semantics, reporting only the first error that occurred.  

```javascript
pe.objectAll({
    x: Promise.resolve(1),
    y: pe.delay(100).then(function(){ throw 2 }),
    z: Promise.reject(3)
  })
  .catch(console.error);

/* console.error:
  3
*/
```

### objectFulfilled

The object equivalent of [fulfilled](#fulfilled).

```javascript
pe.objectFulfilled({
    x: Promise.resolve(1),
    y: Promise.reject(2),
    z: 3
  })
  .then(console.log);

/* console.log:
  {
    x: 1,
    z: 3
  }
*/
```

Note that if all inputs become rejected, the Promise `objectFulfilled` returns will fullfil with an empty object.

### objectRejected

The object equivalent of [rejected](#rejected).

```javascript
pe.objectRejected({
    x: Promise.resolve(1),
    y: Promise.reject(2),
    z: 3
  })
  .then(console.log)

/* console.log:
  {
    y: 2
  }
*/
```

## Creating Promises

### delay

Creates a Promise that becomes fulfilled after *at least* the specified number of milliseconds.

```javascript
var startTime = Date.now();

pe.delay(100).then(function(){
    console.log('Delayed by ', Date.now() - startTime);
  });

/* example console.log:
  104
/*
```
