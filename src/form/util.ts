import { NamePath } from 'rc-field-form/lib/interface';

export const toArray = <T>(obj: T | T[] | false): T[] => {
  if (obj === false || obj === undefined) {
    return [];
  }

  return Array.isArray(obj) ? obj : [obj];
};

export const hasValidName = (name?: NamePath | null): boolean => {
  if (name === null) {
    // eslint-disable-next-line
    console.warn('Form.Item', '`null` is passed as `name` property');
  }
  return !(name === undefined || name === null);
};

export default {};
