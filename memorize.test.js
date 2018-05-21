'use strict';

const expect = require('chai').expect;
const memorize = require('./memorize').memorize;
const _ = require('lodash');
const shallowEQ = require('shallowequal');

describe('Testing memorize.js', () => {

  it('returning same value should return same value..', () => {
    const same = {};
    const memd = memorize(() => same);
    const a = memd();
    const b = memd();
    expect(memd() === memd()).to.be.true;
  });

  it('returning different should return different', () => {
    const memd = memorize(() => ({}));
    expect(memd() === memd()).to.be.false;
  });

  it('returning different using shallowequal should return same value..', () => {
    const memd = memorize(() => ({}), shallowEQ);
    expect(memd() === memd()).to.be.true;
  });

  it('should handle shallowequal test with arrays of numbers', () => {
    const func = num => _.times(num, () => 1);
    const memd = memorize(func, shallowEQ);
    const a = memd(2);
    const b = memd(13);
    const c = memd(13);
    expect(a === b).to.be.false;
    expect(b === c).to.be.true;
  });

  it('should be expected that readme examples are true', () => {
    const func = (a, b) => [a, b];
    const memd = memorize(func);
    expect(memd(1, 2) === memd(1, 2)).to.be.false;
    const eq = (a, b) => ((a && b) && a[0] === b[0] && a[1] === b[1]);
    const memd2 = memorize(func, eq);
    expect(memd2(1, 2) === memd2(1, 2)).to.be.true;
  });
});
