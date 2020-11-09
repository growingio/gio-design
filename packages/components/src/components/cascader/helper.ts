import { useEffect, useState } from 'react';

export const withPrefix = (prefix?: string) => (value?: string, sep = '-') => {
  return [prefix, value].filter((s) => !!s).join(sep);
};

export const makeSearchParttern = (word: string, ignoreCase = true) => {
  // 过滤掉正则表达式的特殊字符
  const escapedWord = word.replace(/([()[\]{}.?+*^$|\\<>!])/g, '\\$1');
  return new RegExp(escapedWord, ignoreCase ? 'i' : '');
};

export const isHit = (label: string, word: string, ignoreCase = true) => {
  if (!word) {
    return label;
  }
  return label.search(makeSearchParttern(word, ignoreCase)) + 1;
};

export const useDataSource = <T>(originDataSource: T) => {
  const [dataSource, setDataSource] = useState(originDataSource);

  useEffect(() => {
    setDataSource(originDataSource);
  }, [originDataSource]);

  return [dataSource, setDataSource] as const;
};
