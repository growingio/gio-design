import { noop } from 'lodash';
import React from 'react';
import List from './List';
import { OptionProps, ListProps, MaybeArray } from './interfance';

export interface ListContextProps {
  value?: string | (string | number)[] | number;
  model?: 'single' | 'cascader' | 'multiple';
  disabled?: boolean;
  isSelection?: boolean;
  isEmpty?: boolean;
  emptyNode?: React.ReactNode;
  selectParent?: any;
  onChange?: (value?: MaybeArray<string | number>, options?: OptionProps | OptionProps[]) => void;
  onClick?: (value?: string | number, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => void;
  options?: Map<string | number, OptionProps>;
  recentId?: string;
  prefix?: (option?: OptionProps) => string | React.ReactNode;
  suffix?: (option?: OptionProps) => string | React.ReactNode;
  setRecentId?: (value?: string) => void;
  setOptions?: (options?: OptionProps[]) => void;
  getOptionByValue?: (optValue?: string | number) => OptionProps | undefined;
  getOptionsByValue?: (optValue?: MaybeArray<string | number>) => OptionProps | OptionProps[] | undefined;
  getLabelByValue?: (val?: MaybeArray<string | number>, separator?: string) => any;
}
const defaultList: ListContextProps = {
  value: '',
  model: 'single',
  disabled: false,
  selectParent: undefined,
  isSelection: false,
  recentId: undefined,
  onChange: noop,
  onClick: noop,
  setOptions: noop,
  prefix: undefined,
  suffix: undefined,
  emptyNode: undefined,
  getOptionByValue: undefined,
  getOptionsByValue: undefined,
  getLabelByValue: undefined,
};
export const ListContext = React.createContext<ListContextProps>(defaultList);

export const ListConsumer: React.FC<ListProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <ListContext.Consumer>
      {(context) =>
        React.cloneElement(<List {...rest}>{children}</List>, {
          value: context.value,
          onChange: context.onChange,
        })
      }
    </ListContext.Consumer>
  );
};
export default {
  context: ListContext,
  consumer: ListConsumer,
};
