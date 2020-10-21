import isNil from 'lodash/isNil';
import keys from 'lodash/keys';
import kebabCase from 'lodash/kebabCase';

export default {};

export const getAttrName = (cls: string, prefixCls?: string): string => {
  if (!prefixCls) {
    return cls;
  }
  return `${prefixCls}-${kebabCase(cls)}`;
};

interface ObjType<T = unknown> {
  [key: string]: T;
}

export const dataMap = <T extends ObjType = ObjType>(obj: T, prefixCls: string): ObjType => {
  const cls: ObjType = {};
  keys(obj).forEach((key) => {
    cls[getAttrName(key, prefixCls)] = isNil(obj[key]) ? false : obj[key].toString();
  });

  return cls;
};

export const clip = (min: number, max: number, value: number): number => {
  return Math.max(min, Math.min(max, value));
};

export const isNumber = (n: unknown): boolean => typeof n === 'number';
