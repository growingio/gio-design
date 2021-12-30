import { useLocale, usePrefixCls } from '@gio-design/utils';
import { filter as lodashFilter, isNil, slice } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { List, OptionProps } from '../list';
import { PREFIX } from '../list/constants';
import { ListContext } from '../list/context';
import defaultLocaleTextObject from './locales/zh-CN';

export const ITEM_KEY = '__GIO_SELECTION_KEY';

interface RecentProps {
  title?: string;
  max?: number;
  filter?: (option: OptionProps) => boolean;
}

const Recent: React.FC<RecentProps> & { isRecent: boolean } = (props) => {
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('ListPicker') || defaultLocaleTextObject;
  const { max = 5, title = localeTextObject.recent, filter: filterFc = (o) => !!o, ...rest } = props;
  const [mayBeArray, setMayBearray] = useState<Map<string | number, OptionProps> | undefined>(new Map());
  const selectionPrefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const context = useContext(ListContext);
  const { options, model } = context;
  const localKey = isNil(context?.recentId) ? ITEM_KEY : `${ITEM_KEY}_${context?.recentId}`;
  const localStorageValue = window?.localStorage?.getItem(localKey) || '[]';
  const matchValue = JSON.parse(localStorageValue); // localStorage.getItem('__GIO_SELECTION_KEY')
  useEffect(() => {
    setTimeout(() => {
      setMayBearray(options);
    }, 0);
  }, [options]);

  const matchOptions = useMemo(
    () =>
      matchValue?.reduce((prev: OptionProps[], curr: string) => {
        if (mayBeArray?.has(curr)) {
          return [...prev, mayBeArray?.get(curr)];
        }
        return [...prev];
      }, []),
    [matchValue, mayBeArray]
  );

  const listOptions: OptionProps[] = useMemo(
    () => slice(lodashFilter(matchOptions, filterFc), 0, max),

    [matchOptions, max, filterFc]
  );

  const handleOnChange = (value?: string | string[], opts?: OptionProps | OptionProps[]) =>
    context?.onChange?.(value, opts);
  if (!!listOptions?.length && model !== 'multiple') {
    return (
      <div className={`${selectionPrefixCls}--item`}>
        {title && <div className={`${selectionPrefixCls}--title`}>{title}</div>}
        <List
          data-testid="list-recent"
          title={title}
          id={ITEM_KEY}
          options={listOptions}
          value=""
          onChange={handleOnChange}
          {...rest}
        />
      </div>
    );
  }
  return <></>;
};

Recent.isRecent = true;
export default Recent;
