import React from 'react';
import List, { OptionProps } from '../list';
import { SelectionProps, StaticListPickerProps } from './interfance';

const StaticListPicker: React.FC<StaticListPickerProps & { needConfim?: boolean }> = (props) => {
  const { children, model, isSelection, options, ...rest } = props;
  // children has filter options, custom filter model such as :search | select | tab | other
  return (
    <>
      {children}
      {isSelection ? (
        <List.Selection>
          {(options as SelectionProps[]).map((option: SelectionProps) => (
            <List
              {...rest}
              id={option.selectionValue}
              title={option.selectionTitle}
              options={option.options}
              model={model}
            />
          ))}
        </List.Selection>
      ) : (
        <List {...rest} options={options as OptionProps[]} model={model} />
      )}
    </>
  );
};

export default StaticListPicker;
