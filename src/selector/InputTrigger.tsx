import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useSize } from '@gio-design/utils';
import { InputTriggerProps } from './interfaces';

function InputTrigger({
  actived,
  borderless,
  className,
  disabled,
  fitContent,
  itemRender,
  placeholder,
  size: customizeSize,
  style,
  suffix,
}: InputTriggerProps) {
  const size = useSize();
  const prefixCls = usePrefixCls('input-trigger');

  const mergedSize = customizeSize || size;
  const cls = classnames(
    prefixCls,
    `${prefixCls}--${mergedSize}`,
    {
      [`${prefixCls}--borderless`]: borderless,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--actived`]: actived,
      [`${prefixCls}--fit-content`]: fitContent,
    },
    className
  );

  const item = itemRender?.();
  return (
    <div className={cls} style={style}>
      {item ? (
        <span className={`${prefixCls}__item`}>{item}</span>
      ) : (
        <span className={`${prefixCls}__placeholder`}>{placeholder}</span>
      )}
      <span className={`${prefixCls}__suffix`}>{suffix}</span>
    </div>
  );
}

export default InputTrigger;
