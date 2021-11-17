import { noop } from 'lodash';
import React from 'react';
import { List } from '.';
import { OptionProps, ListProps } from './interfance';

interface ListContextProps {
  value?: string | string[];
  onChange?: (value?: string | string[], options?: OptionProps | OptionProps[]) => void;
  options?: Map<string, OptionProps>;
  setOptions?: (options?: OptionProps[]) => void;
}
const defaultList = {
  value: '',
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
