import { noop } from 'lodash';
import React from 'react';
import { List } from '.';
import { OptionProps, ListProps } from './interfance';

interface ListContextProps {
  value?: string | string[];
  model?: 'single' | 'cascader' | 'multiple';
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  options?: Map<string, OptionProps>;
  setOptions?: (options?: OptionProps[]) => void;
}
const defaultList: ListContextProps = {
  value: '',
  model: undefined,
  onChange: noop,
  setOptions: noop,
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
