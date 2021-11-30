import { noop } from 'lodash';
import React from 'react';
import { List } from '.';
import { OptionProps, ListProps } from './interfance';

export interface ListContextProps {
  value?: string | string[];
  model?: 'single' | 'cascader' | 'multiple';
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  options?: Map<string, OptionProps>;
  setOptions?: (options?: OptionProps[]) => void;
  getOptionByValue?: (optValue?: string) => OptionProps | undefined;
  getOptionsByValue?: (optValue?: string | string[]) => OptionProps | OptionProps[] | undefined;
  getLabelByValue?: (val?: string | string[], separator?: string) => any;
}
const defaultList: ListContextProps = {
  value: '',
  model: undefined,
  onChange: noop,
  setOptions: noop,
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
