export function isNumber(v: any): boolean {
  return !isNaN(v - parseFloat(v));
}

export function shallowEqualArray(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function blurActiveElement(): void {
  const activeEle: any = document.activeElement;
  activeEle.blur();
}

export default {
  isNumber,
  shallowEqualArray,
  blurActiveElement,
};
