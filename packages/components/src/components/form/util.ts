export const toArray = <T>(obj: T | T[] | false): T[] => {
  if (obj === false || obj === undefined) {
    return [];
  }

  return Array.isArray(obj) ? obj : [obj];
};

export default {};
