## memorize

memorize wraps a function, storing the immediately previous return value. Upon repeated evaluation, the next return value is compared to the previous (the default equality operator is '==='). If the current and previous values are found to be equal, the previous value is retained and returned again.

This is definitely reinventing the wheel, but is useful if the same object needs to be returned consecutively depending upon some condition.

### Usage
Using the default equality, the following should be different
```javascript
const memorize = require('memorize');
const func = (a, b) => [a, b];

const memd = memorize(func);
const shouldBeDifferent = memd(1, 2) === memd(1, 2); // false
```
But if we instead look at the equality of the components with a custom equality operator
```javascript
const eq = (a, b) => ((a && b) && a[0] === b[0] && a[1] === b[1]);
const memd2 = memorize(func, eq);
const shouldBeSame = memd2(1, 2) === memd2(1, 2); // true
```
### License
memorize is under the ISC license. See LICENSE file.
