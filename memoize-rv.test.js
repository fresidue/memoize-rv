// memoize-rv.test.js

const expect = require('chai').expect;
const mem = require('./memoize-rv');
const _ = require('lodash');
const shallowEQ = require('shallowequal');

describe('memoize-rv', () => {

  it('returning same value should return same value..', () => {
    const same = {};
    const memd = mem(() => same);
    const a = memd();
    const b = memd();
    expect(memd() === memd()).to.be.true;
  });

  it('returning different should return different', () => {
    const memd = mem(() => ({}));
    expect(memd() === memd()).to.be.false;
  });

  it('returning different using shallowequal should return same value..', () => {
    const memd = mem(() => ({}), shallowEQ);
    expect(memd() === memd()).to.be.true;
  });

  it('should handle shallowequal test with arrays of numbers', () => {
    const func = num => _.times(num, () => 1);
    const memd = mem(func, shallowEQ);
    const a = memd(2);
    const b = memd(13);
    const c = memd(13);
    expect(a === b).to.be.false;
    expect(b === c).to.be.true;
  });

  it('should be expected that readme examples are true', () => {
    const func = (a, b) => [a, b];
    const memd = mem(func);
    expect(memd(1, 2) === memd(1, 2)).to.be.false;
    const eq = (a, b) => ((a && b) && a[0] === b[0] && a[1] === b[1]);
    const memd2 = mem(func, eq);
    expect(memd2(1, 2) === memd2(1, 2)).to.be.true;
  });
});
