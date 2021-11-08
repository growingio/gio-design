import React, { useMemo } from 'react';
import { isEmpty, noop } from 'lodash';
import { RightFilled } from '@gio-design/icons';
import Popover from '../../popover';
import { CascaderItemProps } from '../../cascader/interfance';
import BaseItem from './baseItem';
import { ListProps } from '../interfance';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
// 1.2
const CascaderItem: React.FC<CascaderItemProps> = (props) => {
  const {
    label,
    value,
    children,
    selectValue: initValue = '',
    selectedParent = [],
    disabled = false,
    onClick,
    ...rest
  } = props;
  const prefixCls = usePrefixCls('cascader--new');
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
      isMultiple: false,
      isCascader: true,
      className: prefixCls,
      disabled,
      selectedParent: isSelected ? selectedParent.concat([value]) : selectedParent,
      onChange: (val: string | number) => onClick?.(`${value}.${val}`),
    });
  const prefixClsItem = `${prefixCls}--item`;
  const PopoverRender = (trigger: React.ReactNode): React.ReactElement => {
    if (React.isValidElement(children)) {
      return (
        <div className={prefixClsItem}>
          <Popover placement="rightTop" trigger="hover" content={contentRender(children)}>
            {trigger as React.ReactElement}
          </Popover>
        </div>
      );
    }
    return trigger as React.ReactElement;
  };
  const renderItem = (
    <BaseItem
      label={label}
      value={value}
      disabled={disabled}
      {...rest}
      suffix={React.isValidElement(children) ? <RightFilled size="14px" /> : undefined}
      onChange={noop}
      onClick={React.isValidElement(children) ? noop : onClick}
      selected={isSelected}
    />
  );
  return PopoverRender(renderItem);
};

export default CascaderItem;
