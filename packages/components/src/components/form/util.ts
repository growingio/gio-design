import { NamePath } from 'rc-field-form/lib/interface';

export const toArray = <T>(obj: T | T[] | false): T[] => {
  if (obj === false || obj === undefined) {
    return [];
  }

  return Array.isArray(obj) ? obj : [obj];
};

export const hasValidName = (name?: NamePath): boolean => {
  
  return !(name === undefined || name === null);
};

export default {};
