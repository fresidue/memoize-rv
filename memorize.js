'use strict';

const defaultEqualityCheck = (a, b) => a === b;

const memorize = (func, equalityCheck) => {
  let previous = null;
  const equals = equalityCheck || defaultEqualityCheck;
  // use function for access to arguments
  const memorized = function () {
    const current = func.apply(null, arguments);
    if (equals(current, previous)) {
      return previous;
    } else {
      previous = current;
      return current;
    }
  };
  return memorized;
};

module.exports = {
  memorize
};
