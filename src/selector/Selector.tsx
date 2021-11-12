import React from 'react';
import classnames from 'classnames';
import { UpFilled, DownFilled, CloseCircleFilled } from '@gio-design/icons';
import { usePrefixCls, useControlledState } from '@gio-design/utils';
import Dropdown from '../legacy/dropdown';
import InputTrigger from './InputTrigger';
import { SelectorProps } from './interfaces';

function Selector({
  actived,
  allowClear = true,
  borderless,
  disabled,
  fitContent,
  itemRender,
  placeholder,
  size,
  suffix,
  onClear,
  onVisibleChange: onDropdownVisibleChange,
  overlayClassName,
  visible: dropdownVisible,
  trigger,
  ...restProps
}: SelectorProps) {
  const prefixCls = usePrefixCls('selector');
  const [visible, setVisible] = useControlledState(dropdownVisible, false);
  const [triggerHovered, setTriggerHovered] = React.useState<boolean>(false);

  const overlayCls = classnames(`${prefixCls}-overlay`, overlayClassName);

  function handleVisibleChange(current: boolean) {
    setVisible(current);
    onDropdownVisibleChange?.(current);
  }

  function renderSuffix() {
    if (allowClear && !disabled && itemRender?.() && triggerHovered) {
      return (
        <CloseCircleFilled
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClear?.();
          }}
        />
      );
    }

    if (suffix) {
      return suffix;
    }

    return visible ? <UpFilled /> : <DownFilled />;
  }

  function renderTrigger() {
    if (trigger) {
      return <div>{trigger}</div>;
    }
    return (
      <div
        onMouseEnter={() => {
          setTriggerHovered(true);
        }}
        onMouseLeave={() => {
          setTriggerHovered(false);
        }}
      >
        <InputTrigger
          actived={actived}
          borderless={borderless}
          disabled={disabled}
          fitContent={fitContent}
          size={size}
          placeholder={placeholder}
          itemRender={itemRender}
          suffix={renderSuffix()}
        />
      </div>
    );
  }

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      disabled={disabled}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      overlayClassName={overlayCls}
      {...restProps}
    >
      {renderTrigger()}
    </Dropdown>
  );
}

export default Selector;
