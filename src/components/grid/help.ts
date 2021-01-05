import isNil from 'lodash/isNil';
import isNaN from 'lodash/isNaN';
import keys from 'lodash/keys';
import kebabCase from 'lodash/kebabCase';

export default {};

export const getAttrName = (cls: string, prefix?: string): string => {
  // if (!prefix) {
  //   return cls;
  // }
  return `${prefix}-${kebabCase(cls)}`;
};

interface ObjType {
  [key: string]: undefined | number | string | boolean;
}

type Ret<T> = {
  [P in keyof T]: string | boolean;
};

const falsely = <T>(o: T) => isNil(o) || isNaN(o);

export const dataMap = <T extends ObjType = ObjType>(obj: T, prefixCls: string): Ret<T> => {
  const cls = {} as Ret<T>;
  keys(obj).forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    cls[getAttrName(key, prefixCls) as keyof Ret<T>] = falsely(obj[key]) ? false : obj[key]!.toString();
  });

  return cls;
};

export const clip = (min: number, max: number, value: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const isNumber = <T = unknown>(n: T): boolean => typeof n === 'number';
