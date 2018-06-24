# memoize-rv

within contexts like react and redux where immutability is a key concern, and where expensive events like rendering are triggered when strict object equality is broken, it would be nice to keep the previous value whenever possible. This is especially true if repeated calculations are likely to generate the same results (but housed in a new container).
This is NOT for use with async functions/promises.

`npm install --save memoize-rv`

## api

```js
const mem = require('memoize-rv');
```

#### mem(func, [equalityCheck])

returns a function `memFunc` that can be used in place of `func`.

When `memFunc` is first evaluated, the return value is stored. Upon repeated evaluation, if the return value is deemed equal to the stored value, then the new value is simply discarded, and the stored value is both kept and returned in place of the new value.

The default equality check is simply `(rv, stored) => rv === stored`, but a custom 'equality check' function is the optional second argument.

## usage
Given a function `func` of some sort
```js
const func = (a, b) => [a, b];
```
This creates a memoized version of `func`, with default `===` check.
```js
const memFunc = mem(func);
const val1 = memFunc(1, 2); // [1, 2]
const val2 = memFunc(1, 2); // [1, 2]
// however
const areDifferent = (val1 === val2); // false
```
But if we instead look at the equality of the components with a custom equality operator
```js
const eq = (a, b) => ((a && b) && a[0] === b[0] && a[1] === b[1]);
const memFuncEq = mem(func, eq);
const valEq1 = memFuncEq(1, 2); // [1, 2]
const valEq2 = memFuncEq(1, 2); // [1, 2]
// now they are evaluated equal
const areSame = valEq1 === valEq2; // true
```
### license
memoize-rv is under the MIT license. See license file.
