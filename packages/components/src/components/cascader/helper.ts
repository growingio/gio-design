import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import { NodeData } from './menu-item';

export const withPrefix = (prefix?: string) => (value?: string, sep = '-') => {
  return [prefix, value].filter((s) => !!s).join(sep);
};

export const makeSearchParttern = (word = '', ignoreCase = true) => {
  // 过滤掉正则表达式的特殊字符
  const escapedWord = word.replace(/([()[\]{}.?+*^$|\\<>!])/g, '\\$1');
  return new RegExp(escapedWord, ignoreCase ? 'gi' : 'g');
};

export const isHit = (label: string, word: string, ignoreCase = true) => {
  if (!word) {
    return true;
  }
  return label.search(makeSearchParttern(word, ignoreCase)) >= 0;
};

export const useDynamicData = <T>(originDataSource: T) => {
  const [dataSource, setDataSource] = useState(originDataSource);

  useEffect(() => {
    setDataSource(originDataSource);
  }, [originDataSource]);

  return [dataSource, setDataSource] as const;
};

export const toInt = (s: string | React.ReactText) => (s ? parseInt(s as string, 10) : 0);

export const deepFilter = (d: NodeData, parttern: RegExp) => {
  const currentMatch = d.label.match(parttern);
  if (currentMatch) {
    return true;
  }
  if (isEmpty(d.children)) {
    return false;
  }

  const someChildMatch = d.children?.some((c) => deepFilter(c, parttern));

  return someChildMatch;
};

export const dataFilter = (data: NodeData[], parttern: RegExp, deepSearch = false) => {
  if (!parttern) {
    return data;
  }

  if (!deepSearch) {
    return data.filter((d) => d.label.match(parttern));
  }

  return data.filter((d) => deepFilter(d, parttern));
};
