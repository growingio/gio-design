import { NodeData, Value } from './menu-item';

const hasOwnProperty = <T>(o: T, k: string) => o && Object.prototype.hasOwnProperty.call(o, k);
const pathKey = '-gioMenuPath';
const parentKey = '-gioParent';

const defineMenuPath = (o: NodeData, p: NodeData) => {
  if (hasOwnProperty(o, pathKey) && hasOwnProperty(o, parentKey)) {
    return;
  }

  Object.defineProperties(o, {
    [parentKey]: {
      get() {
        return p;
      },
    },
    [pathKey]: {
      get() {
        let parent: NodeData[] = [];
        if (hasOwnProperty(p, pathKey)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          parent = p[pathKey]!;
        }
        return parent.concat([p, o]);
      },
    },
  });
};

export const defineMenuPaths = (data: NodeData[]) => {
  data.forEach((d) => {
    if (Array.isArray(d.children)) {
      d.children.forEach((c) => defineMenuPath(c, d));
    }
    defineMenuPath(d, {} as NodeData);
  });

  return data;
};

// eslint-disable-next-line consistent-return
export const findData = (data: NodeData[], value: Value): NodeData | void => {
  if (!value) {
    return undefined;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.value === value) {
      return item;
    }
    if (Array.isArray(item.children)) {
      const child = findData(item.children, value);
      if (child) {
        return child;
      }
    }
  }
};

export const withPrefix = (prefix?: string) => (value?: string, sep = '-') => {
  return [prefix, value].filter((s) => !!s).join(sep);
};

export const makeSearchParttern = (word: string, ignoreCase = true) => new RegExp(word, ignoreCase ? 'i' : '');

export const isHit = (label: string, word: string, ignoreCase = true) => {
  if (!word) {
    return label;
  }
  return label.search(makeSearchParttern(word, ignoreCase)) + 1;
};
