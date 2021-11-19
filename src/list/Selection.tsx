import classNames from 'classnames';
import React, { useMemo } from 'react';
import { ListProps, SelectionProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import { getFlattenOptions } from '../list-picker/util';
import List from './List';
import { OptionProps } from '.';

const Selection: React.FC<SelectionProps> & { isSelection: boolean } = (props) => {
  const { className, style, options = [], children, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const childrens = React.Children.toArray(children);
  const isSelection = options?.every((val) => 'groupId' in val) ?? false;
  console.log('isSelection', isSelection);
  const selectionOptions: { groupId: string; groupName: string; options: OptionProps[] }[] | OptionProps[] = useMemo(
    () => getFlattenOptions(options, isSelection),
    [isSelection, options]
  );
  console.log('selectionOptions', selectionOptions);
  // var cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }],
  // result = cars.reduce(function (r, a) {
  //     r[a.make] = r[a.make] || [];
  //     r[a.make].push(a);
  //     return r;
  // }, Object.create(null));

  // console.log(result);
  if (options.length) {
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        {isSelection &&
          (selectionOptions as { groupId: string; groupName: string; options: OptionProps[] }[])?.map((option) => (
            <div className={`${prefixCls}--item`}>
              {option?.groupId && <div className={`${prefixCls}--title`}>{option?.groupName}</div>}
              <List options={option.options} />
            </div>
          ))}
        {!isSelection && <List options={selectionOptions as OptionProps[]} />}
      </div>
    );
  }

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {childrens?.map((node: React.ReactElement<ListProps>) => (
        <div className={`${prefixCls}--item`}>
          {node?.props?.title && <div className={`${prefixCls}--title`}>{node?.props?.title}</div>}
          {React.cloneElement(node, {
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
