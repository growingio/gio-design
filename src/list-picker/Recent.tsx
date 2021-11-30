import { slice } from 'lodash';
import React, { useContext } from 'react';
import { List, OptionProps } from '../list';
import { ListContext } from '../list/context';

export const ITEM_KEY = '__GIO_SELECTION_KEY';

interface RecentProps {
  title?: string;
  max?: number;
}

const Recent: React.FC<RecentProps> & { isRecent: boolean } = (props) => {
  const { max = 5, title = '最近使用' } = props;
  const context = useContext(ListContext);
  const localStorageValue = window?.localStorage?.getItem(ITEM_KEY) || '[]';
  const matchValue = JSON.parse(localStorageValue); // localStorage.getItem('__GIO_SELECTION_KEY')
  const mayBeArray = Array.from((context?.options ?? new Map())?.values());
  const options = slice(
    mayBeArray?.filter((value?: OptionProps) => matchValue?.includes(value?.value)),
    0,
    max
  );
  const handleOnChange = (value?: string | string[], opts?: OptionProps | OptionProps[]) =>
    context?.onChange?.(value, opts);
  return <List title={title} id={ITEM_KEY} options={options} value="" onChange={handleOnChange} />;
};
Recent.isRecent = true;
export default Recent;
