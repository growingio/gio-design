import { slice } from 'lodash';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { List, OptionProps } from '../list';
import { ListContext } from '../list/context';

export const ITEM_KEY = '__GIO_SELECTION_KEY';

interface RecentProps {
  title?: string;
  max?: number;
}

const Recent: React.FC<RecentProps> & { isRecent: boolean } = (props) => {
  const { max = 5, title = '最近使用' } = props;
  const [mayBeArray, setMayBearray] = useState<Map<string, OptionProps> | undefined>(new Map());
  const context = useContext(ListContext);
  const { options } = context;
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
  return <List title={title} id={ITEM_KEY} options={listOptions} value="" onChange={handleOnChange} />;
};
Recent.isRecent = true;
export default Recent;
