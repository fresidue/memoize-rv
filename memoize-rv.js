// memoize-rv.js

const defaultEqualityCheck = (a, b) => a === b;

const mem = (func, equalityCheck) => {
  let previous = null;
  const equals = equalityCheck || defaultEqualityCheck;
  // use function for access to arguments
  const memd = function (...args) {
    const current = func(...args);
    if (equals(current, previous)) {
      return previous;
    } else {
      previous = current;
      return current;
    }
  };
  return memd;
};

module.exports = mem;
