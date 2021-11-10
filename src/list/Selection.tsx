import classNames from 'classnames';
import React from 'react';
import { OptionProps, ListProps, SelectionProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';

const Selection: React.FC<SelectionProps> & { isSelection: boolean } = (props) => {
  const { className, style, value, onChange, children, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const childrens = React.Children.toArray(children);

  const handleChange = (val?: string | string[], options?: OptionProps | OptionProps[]) => {
    onChange?.(val, options);
  };
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {childrens.map((node: React.ReactElement<ListProps>) => (
        <div className={`${prefixCls}--item`}>
          {node?.props?.title && <div className={`${prefixCls}--title`}>{node?.props?.title}</div>}
          {React.cloneElement(node, {
            value,
            onChange: handleChange,
            ...rest,
            ...node.props,
          })}
        </div>
      ))}
    </div>
  );
};
Selection.isSelection = true;
export default Selection;
