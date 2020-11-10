import { useEffect, useState } from 'react';

import { NodeData } from './menu-item';

export const withPrefix = (prefix?: string) => (value?: string, sep = '-') => {
  return [prefix, value].filter((s) => !!s).join(sep);
};

export const makeSearchParttern = (word: string, ignoreCase = true) => {
  // 过滤掉正则表达式的特殊字符
  const escapedWord = word.replace(/([()[\]{}.?+*^$|\\<>!])/g, '\\$1');
  return new RegExp(escapedWord, ignoreCase ? 'gi' : 'g');
};

export const isHit = (label: string, word: string, ignoreCase = true) => {
  if (!word) {
    return label;
  }
  return label.search(makeSearchParttern(word, ignoreCase)) + 1;
};

export const useDynamicData = <T>(originDataSource: T) => {
  const [dataSource, setDataSource] = useState(originDataSource);

  useEffect(() => {
    setDataSource(originDataSource);
  }, [originDataSource]);

  return [dataSource, setDataSource] as const;
};

export const toInt = (s: string | React.ReactText) => (s ? parseInt(s as string, 10) : 0);

export const dataFilter = (data: NodeData[], keyword?: string, ignoreCase?: boolean) => {
  if (!keyword) {
    return data;
  }

  const rSearch = makeSearchParttern(keyword, ignoreCase);
  return data.filter((d) => d.label.match(rSearch));
};
