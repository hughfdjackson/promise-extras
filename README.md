
JavaScript's core libraries tend to be quite spare - and [ES2015's Promise](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects) is no exception.  It packs in just *two* utilities to work with multiple Promises (`.all` and `.race`).  `promise-extras` delivers the rest as a library.

This library assumes there is a `Promise` constructor in global scope.  If you don't have one, you can include [es6-promise](https://github.com/jakearchibald/es6-promise).

# API

## .array

### .array.allSettled

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

### .array.fulfilled

Returns an array containing values for only those inputs that fulfilled.

```javascript
var pe = require('promise-extras');

pe.array.fulfilled([Promise.resolve(1), Promise.reject(2), 3])
  .then(console.log);

/* console.log:
  [1, 3];
*/
```

### .array.rejected

Like [.array.fulfilled](#arrayfulfilled), but resolves with only those inputs that become rejected.

```javascript
var pe = require('promise-extras');

pe.array.rejected([Promise.resolve(1), Promise.reject(2), 3])
  .then(console.log);

/* console.log:
  [2]
*/
```
