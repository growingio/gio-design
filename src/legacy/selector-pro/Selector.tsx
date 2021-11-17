import React from 'react';
import classnames from 'classnames';
import { UpFilled, DownFilled } from '@gio-design/icons';
import { useControlledState, usePrefixCls } from '@gio-design/utils';
import { SelectorProps } from './interfaces';
import useSize from '../../utils/hooks/useSize';
import './style';
import Button from '../button';
import Dropdown from '../dropdown';

function Selector({
  className,
  borderless = false,
  disabled = false,
  dropdownVisible,
  onDropdownVisibleChange,
  dropdownRender,
  style,
  valueRender,
  placeholder,
  overlayClassName,
  getContainer,
  size: customizeSize,
  mode = 'input',
  icon,
  type = 'secondary',
  destroyTooltipOnHide,
}: SelectorProps) {
  const prefixCls = usePrefixCls('selector-pro');
  const contextSize = useSize();
  const size = customizeSize || contextSize;
  const [visible, setVisible] = useControlledState(dropdownVisible, false);

  function handleVisibleChange(current: boolean) {
    setVisible(current);
    onDropdownVisibleChange?.(current);
  }

  const cls = classnames(
    prefixCls,
    `${prefixCls}--${size}`,
    {
      [`${prefixCls}--borderless`]: borderless,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--actived`]: visible,
    },
    className
  );

  const overlayCls = classnames(overlayClassName, `${prefixCls}-overlay-dropdown`);

  const item = valueRender();

  function renderChild() {
    if (mode === 'button') {
      return (
        <Button type={type} icon={icon} size={size as any} disabled={disabled}>
          {item || placeholder}
        </Button>
      );
    }

    return (
      <div className={cls} style={style}>
        {item ? (
          <span className={`${prefixCls}__item`}>{item}</span>
        ) : (
          <span className={`${prefixCls}__placeholder`}>{placeholder}</span>
        )}
        {visible ? (
          <UpFilled size="14px" className={`${prefixCls}__arrow`} />
        ) : (
          <DownFilled size="14px" className={`${prefixCls}__arrow`} />
        )}
      </div>
    );
  }

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomLeft"
      disabled={disabled}
      overlay={
        <div className={`${prefixCls}-dropdown`}>
          {typeof dropdownRender === 'function' ? dropdownRender() : dropdownRender}
        </div>
      }
      visible={visible}
      onVisibleChange={handleVisibleChange}
      overlayClassName={overlayCls}
      getContainer={getContainer}
      destroyTooltipOnHide={destroyTooltipOnHide}
    >
      {renderChild()}
    </Dropdown>
  );
}

export default Selector;
