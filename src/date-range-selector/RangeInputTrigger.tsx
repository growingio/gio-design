import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useSize } from '@gio-design/utils/es/hooks';
import { CalendarOutlined, CloseCircleFilled } from '@gio-design/icons';
import { NullableString, RangeInputTriggerProps } from './interfaces';

function RangeInputTrigger({
  actived,
  borderless,
  className,
  disabled,
  onClear,
  placeholder = [undefined, undefined],
  size: customizeSize,
  value = [undefined, undefined],
}: RangeInputTriggerProps) {
  const size = useSize();
  const prefixCls = usePrefixCls('range-input-trigger');
  const [hovered, setHovered] = React.useState<boolean>(false);

  const mergedSize = customizeSize || size;
  const cls = classnames(
    prefixCls,
    `${prefixCls}--${mergedSize}`,
    {
      [`${prefixCls}--borderless`]: borderless,
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--actived`]: actived,
    },
    className
  );
  const [start, end] = value;
  const [startPlaceholder, endPlaceholder] = placeholder;

  function renderItem(itemString: NullableString, placeholderString: NullableString) {
    return itemString ? (
      <span className={`${prefixCls}__item`}>{itemString}</span>
    ) : (
      <span className={`${prefixCls}__placeholder`}>{placeholderString}</span>
    );
  }

  function renderSuffix() {
    if (hovered && start && end) {
      return (
        <CloseCircleFilled
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            onClear?.();
          }}
        />
      );
    }
    return <CalendarOutlined />;
  }

  return (
    <div className={cls} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {renderItem(start, startPlaceholder)}
      <span className={`${prefixCls}__separator`} />
      {renderItem(end, endPlaceholder)}
      <span className={`${prefixCls}__suffix`}>{renderSuffix()}</span>
    </div>
  );
}

export default RangeInputTrigger;
