import { shallowEqualArray } from './helpers';

export default (func: (...args: any[]) => any): ((...args: any[]) => any) => {
  let lastArgs: any[];
  let lastValue: any;

  return (...args) => {
    if (shallowEqualArray(args, lastArgs)) {
      return lastValue;
    }
    lastArgs = args;
    lastValue = func(...Array.from(args));
    return lastValue;
  };
};
