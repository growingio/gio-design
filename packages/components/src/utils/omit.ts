function _omit<T, K extends keyof T>(obj: T, fields: Array<K>): Pick<T, Exclude<keyof T, K>> {
  const shallowCopy = { ...obj };
  fields.forEach((key) => {
    delete shallowCopy[key];
  });
  return shallowCopy;
}

export default _omit;
