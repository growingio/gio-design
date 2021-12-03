import { useLocale } from '@gio-design/utils';
import { slice } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { List, OptionProps } from '../list';
import { PREFIX } from '../list/constants';
import { ListContext } from '../list/context';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import defaultLocaleTextObject from './locales/zh-CN';

export const ITEM_KEY = '__GIO_SELECTION_KEY';

interface RecentProps {
  title?: string;
  max?: number;
}

const Recent: React.FC<RecentProps> & { isRecent: boolean } = (props) => {
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('ListPicker') || defaultLocaleTextObject;
  const { max = 5, title = localeTextObject.recent } = props;
  const [mayBeArray, setMayBearray] = useState<Map<string, OptionProps> | undefined>(new Map());
  const selectionPrefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const context = useContext(ListContext);
  const { options, model } = context;
  const localStorageValue = window?.localStorage?.getItem(ITEM_KEY) || '[]';
  const matchValue = JSON.parse(localStorageValue); // localStorage.getItem('__GIO_SELECTION_KEY')
  useEffect(() => {
    setTimeout(() => {
      setMayBearray(options);
    }, 0);
  }, [options]);
  const listOptions: OptionProps[] = useMemo(
    () =>
      slice(
        matchValue?.reduce((prev: OptionProps[], curr: string) => {
          if (mayBeArray?.has(curr)) {
            return [...prev, mayBeArray?.get(curr)];
          }
          return [...prev];
        }, []),
        0,
        max
      ),

    [matchValue, max, mayBeArray]
  );
  const handleOnChange = (value?: string | string[], opts?: OptionProps | OptionProps[]) =>
    context?.onChange?.(value, opts);
  if (!!listOptions?.length && model !== 'multiple') {
    return (
      <div className={`${selectionPrefixCls}--item`}>
        {title && <div className={`${selectionPrefixCls}--title`}>{title}</div>}
        <List title={title} id={ITEM_KEY} options={listOptions} value="" onChange={handleOnChange} />
      </div>
    );
  }
  return <></>;
};
Recent.isRecent = true;
export default Recent;
