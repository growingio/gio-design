import React, { DOMAttributes, useMemo } from 'react';
import { isEmpty, noop } from 'lodash';
import { RightFilled } from '@gio-design/icons';
import Popover from '../../popover';
import { CascaderItemProps, ListProps, OptionProps } from '../interfance';
import BaseItem from './baseItem';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import List from '../List';
import WithRef from '../../utils/withRef';

// 1.2
const CascaderItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  CascaderItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> = (props, ref?) => {
  const {
    label,
    value,
    children,
    childrens,
    selectValue: initValue = '',
    selectedParent = [],
    disabled = false,
    onClick,
    ...rest
  } = props;
  const prefixCls = usePrefixCls('cascader--new');
  const popoverClassName = `${prefixCls}--cascader--content`;
  // todo 需要改 这里实现的不好
  const arrValue = useMemo(() => initValue?.split('.'), [initValue]);
  const isParentChecked =
    (!isEmpty(selectedParent) && selectedParent?.every((parentValue, index) => arrValue?.[index] === parentValue)) ||
    arrValue?.[0] === value;
  const isSelected = isParentChecked && arrValue?.[selectedParent?.length ?? 0] === value;

  // list
  const contentRender = (node: React.ReactElement<ListProps>) =>
    React.cloneElement(node, {
      value: initValue,
      model: 'cascader',
      className: prefixCls,
      disabled: disabled as boolean,
      selectedParent: isSelected ? selectedParent.concat([value]) : selectedParent,
      onChange: (val?: string) => onClick?.(`${value}.${val}`),
    });
  const prefixClsItem = `${prefixCls}--item`;

  const content = () => {
    //
    if (React.isValidElement(children)) {
      return children;
    }
    return !isEmpty(childrens) ? (
      <List
        options={childrens as OptionProps[]}
        value={value}
        onChange={(val) => onClick?.(val as string)}
        model={childrens?.some((child) => 'childrens' in child) ? 'cascader' : undefined}
      />
    ) : (
      <></>
    );
  };

  const PopoverRender = (trigger: React.ReactNode): React.ReactElement => {
    if (childrens || React.isValidElement(children)) {
      return (
        <div className={prefixClsItem}>
          <Popover
            placement="rightTop"
            strategy="fixed"
            trigger="hover"
            overlayClassName={popoverClassName}
            content={contentRender(content())}
          >
            {trigger as React.ReactElement}
          </Popover>
        </div>
      );
    }

    return trigger as React.ReactElement;
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
    />
  );
  return PopoverRender(renderItem);
};

export default WithRef(CascaderItem);
