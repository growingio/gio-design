import React, { DOMAttributes, useContext, useEffect, useMemo } from 'react';
import { isEmpty, noop } from 'lodash';
import { RightFilled } from '@gio-design/icons';
import classNames from 'classnames';
import Popover from '../../popover';
import { CascaderItemProps, OptionProps, ListProps } from '../interfance';
import BaseItem from './baseItem';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import WithRef from '../../utils/withRef';
import List from '../List';
import { convertChildrenToData, generateSelectParent, generateString } from '../util';
import { ListContext } from '../context';

const CascaderItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  CascaderItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> = (props, ref?) => {
  const {
    label,
    value,
    children,
    childrens = [],
    selectValue: initValue = '',
    selectParent,
    disabled = false,
    onClick: propsOnClick,
    ...rest
  } = props;
  const prefixCls = usePrefixCls('cascader--new');
  const popoverClassName = `${prefixCls}--cascader--content`;
  const isSelected = initValue?.startsWith(generateString(value, selectParent));
  const { setOptions } = useContext(ListContext);
  const childSelectPrent = generateSelectParent(label, value, selectParent);
  const childNodeOptions = convertChildrenToData(children);
  const mergedOptions = useMemo(() => [...childNodeOptions, ...childrens], [childNodeOptions, childrens]);

  useEffect(() => {
    setOptions?.(mergedOptions as OptionProps[]);
  }, [mergedOptions, setOptions]);

  // list
  const prefixClsItem = `${prefixCls}--item`;
  const onClick = () => (!disabled ? propsOnClick?.(generateString(value, selectParent)) : noop);

  const content = () => {
    if (!isEmpty(childrens)) {
      return (
        <List model="cascader" className={prefixCls} disabled={disabled}>
          {childrens?.map((child) => (
            <CascaderItem
              label={child?.label}
              value={child?.value}
              childrens={child?.childrens as CascaderItemProps[]}
              selectParent={childSelectPrent}
              disabled={disabled}
            />
          ))}
        </List>
      );
    }

    if (React.isValidElement(children)) {
      return React.cloneElement<ListProps>(children, {
        ...children.props,
        model: 'cascader',
        disabled,
        className: classNames(children.props?.className, prefixCls),
        children: React.Children.toArray(children?.props.children).map((child) =>
          React.cloneElement<OptionProps>(child as React.ReactElement, {
            selectParent: childSelectPrent,
          })
        ),
      });
    }
    return <></>;
  };

  const PopoverRender = (element: React.ReactNode): React.ReactElement => {
    if (!isEmpty(childrens) || React.isValidElement(children)) {
      return (
        <div className={prefixClsItem}>
          <Popover
            placement="rightTop"
            overlayClassName={popoverClassName}
            content={content()}
            getContainer={(node) => node || document.body}
          >
            {element}
          </Popover>
        </div>
      );
    }

    return <>{element}</>;
  };
  const renderItem = (
    <BaseItem
      {...rest}
      ref={ref}
      label={label}
      value={value}
      disabled={disabled}
      suffix={React.isValidElement(children) || !isEmpty(childrens) ? <RightFilled size="14px" /> : undefined}
      onChange={noop}
      onClick={React.isValidElement(children) || !isEmpty(childrens) ? noop : onClick}
      selected={isSelected}
      wrapper={PopoverRender}
    />
  );
  return renderItem;
};

export default WithRef(CascaderItem);
