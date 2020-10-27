import { toArray, hasValidName } from '../util';

describe('toArray', () => {
  it('should convert string to array', () => {
    expect(toArray('abc')).toContainEqual('abc');
  });

  it('should ignore undefined and false value', () => {
    expect(toArray(false)).toHaveLength(0);
    expect(toArray(undefined)).toHaveLength(0);
  });
});

describe('hasValidName', () => {
  it('should reject undefined null value', () => {
    expect(hasValidName(undefined)).toBeFalsy();
    // eslint-disable-next-line
    const warn = console.assert;
    // eslint-disable-next-line
    console.warn = jest.fn();
    expect(hasValidName(null)).toBeFalsy();
    // eslint-disable-next-line
    console.warn = warn;
  });
  it('should accept a string or string[] value', () => {
    expect(hasValidName('abc')).toBeTruthy();
    expect(hasValidName(['abc'])).toBeTruthy();
  });
});
