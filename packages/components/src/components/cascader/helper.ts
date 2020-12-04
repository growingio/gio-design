import React, { useEffect, useRef, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import findIndex from 'lodash/findIndex';

import { NodeData, KeyMapping } from './menu-item';

/**
 * 以分割符组合 前缀、后缀
 */
export const withPrefix = (prefix?: string) => (value?: string, sep = '-') => {
  return [prefix, value].filter((s) => !!s).join(sep);
};

/**
 * 以关键字生成正则运算表达式
 */
export const makeSearchParttern = (word = '', ignoreCase = true) => {
  // 过滤掉正则表达式的特殊字符
  const escapedWord = word.replace(/([()[\]{}.?+*^$|\\<>!])/g, '\\$1');
  return new RegExp(escapedWord, ignoreCase ? 'gi' : 'g');
};

/**
 * 是否命中搜索关键字，没关键字算命中
 */
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

export const toInt = (s?: string | React.ReactText) => (s ? parseInt(s as string, 10) : 0);

export const deepFilter = (d: NodeData, parttern: RegExp, labelKey = 'label') => {
  const currentMatch = (d[labelKey] as string).match(parttern);
  if (currentMatch) {
    return true;
  }
  if (isEmpty(d.children)) {
    return false;
  }

  const someChildMatch = d.children?.some((c) => deepFilter(c, parttern, labelKey)) as boolean;

  return someChildMatch;
};

export const dataFilter = (data = [] as NodeData[], parttern: RegExp, deepSearch = false, labelKey = 'label') => {
  if (!parttern) {
    return data;
  }

  if (!deepSearch) {
    return data.filter((d) => (d[labelKey] as string).match(parttern));
  }

  return data.filter((d) => deepFilter(d, parttern, labelKey));
};

export const dataKeyMapping = (data: NodeData, keyMapping = {} as KeyMapping) => {
  const { label: labelKey = 'label', value: valueKey = 'value' } = keyMapping;
  const { [labelKey]: label, [valueKey]: value } = data;

  return { ...data, label: label as NodeData['label'], value: value as NodeData['value'] };
};

/**
 * 合并 ref
 */
export const useMergeRef = <T>(
  forwardRef: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null
) => {
  const innerRef = useRef<T>((null as unknown) as T);
  useEffect(() => {
    if (isFunction(forwardRef)) {
      forwardRef(innerRef.current);
    } else if (forwardRef) {
      // eslint-disable-next-line no-param-reassign
      forwardRef.current = innerRef.current;
    }
  }, [innerRef, forwardRef]);

  return innerRef;
};

export const useKeyboardNav = (wrapRef: React.MutableRefObject<HTMLElement>) => {
  useEffect(() => {
    const { current: wrapper } = wrapRef;
    if (!wrapper) return () => null;

    const handler = (e: KeyboardEvent) => {
      const { target: _target, key } = e;
      const targetEl = _target as HTMLDivElement;
      const cls = 'cascader-menu-item-inner';
      const isMenuItem = targetEl.classList.contains(cls);
      if (!isMenuItem) {
        return;
      }
      const silbing = wrapRef.current.querySelectorAll<HTMLElement>(`.${cls}`);
      const total = silbing.length;
      const idx = findIndex(silbing, (o) => o === targetEl);

      let nextEl = (null as unknown) as HTMLElement;
      switch (key) {
        case 'ArrowDown':
          nextEl = silbing[(idx + 1) % total];
          break;
        case 'ArrowUp':
          nextEl = silbing[(total + idx - 1) % total];
          break;
        case 'ArrowLeft': {
          const nextMenu = targetEl.closest('.cascader-menu')?.previousSibling as HTMLDivElement;
          nextEl = nextMenu?.querySelector(`[aria-expanded="true"] .${cls}`) as HTMLDivElement;
          break;
        }
        default:
          break;
      }

      if (nextEl) {
        e.preventDefault();
        nextEl.focus();
      }
    };
    wrapper.addEventListener('keydown', handler);
    return () => wrapper.removeEventListener('keydown', handler);
  }, [wrapRef]);
};

export const mergeKeyMapping = (keyMapping = {} as { label?: string; value?: string }) => ({
  label: 'label',
  value: 'value',
  ...keyMapping,
});
