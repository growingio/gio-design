import React from 'react';
import { isNull, noop } from 'lodash';
import classnames from 'classnames';
import { Option, MaybeArray } from '../interface';
import Tooltip from '../../tooltip';
import Checkbox from '../../../checkbox';

interface GroupProps {
  option: Option;
  prefixCls: string;
  groupStyle?: React.CSSProperties;
}

interface TooltipProps {
  render: JSX.Element & React.ReactNode;
  getContainer?: (node: HTMLElement) => HTMLElement;
  prefixCls?: string;
  tooltip?: string;
}

interface OptionProp {
  option: Option;
  selected: MaybeArray<string | number> | null | undefined;
  prefixCls?: string;
  labelRenderer: (option: Option, isGruop: false) => React.ReactNode;
  onOptionClick?: (selectedValue: string | number) => void;
  index: number;

  optionStyle?: React.CSSProperties;
  multiple?: boolean;
  children?: React.ReactNode;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

// ================= RenderGroup =====================
const RenderGroup: React.ForwardRefRenderFunction<unknown, GroupProps> = (props, ref) => {
  const {
    option: { value, label },
    prefixCls,
    groupStyle,
  } = props;

  return (
    <div ref={ref as any} className={`${prefixCls}-list-group`} style={groupStyle}>
      {label !== undefined ? label : value}
    </div>
  );
};

// ================= RenderOption =====================
const RenderOption: React.ForwardRefRenderFunction<unknown, OptionProp> = (props, ref) => {
  const {
    option: { value, disabled, tooltip, groupValue, groupLabel, label, ...restOption },
    selected,
    onOptionClick,
    labelRenderer,
    prefixCls,
    optionStyle,
    multiple,
    index,
    activeIndex,
    setActiveIndex,
  } = props;
  const isSelected =
    typeof selected === 'string' || typeof selected === 'number' || isNull(selected) || typeof selected === 'undefined'
      ? selected === value
      : selected.includes(value);
  const onClick = (e: React.MouseEvent) => {
    onOptionClick?.(value);
    e.preventDefault();
  };
  const labelNode = labelRenderer(
    {
      value,
      disabled,
      tooltip,
      groupValue,
      groupLabel,
      label,
      ...restOption,
    },
    false
  );
  return (
    <div ref={ref as any} className={`${prefixCls}-list-option-container`} style={optionStyle}>
      <div
        onMouseEnter={() => setActiveIndex(index)}
        className={classnames(`${prefixCls}-list-option`, {
          [`${prefixCls}-list-option-isSelected`]: isSelected,
          [`${prefixCls}-list-option-isHover`]: !disabled && index === activeIndex,
          [`${prefixCls}-list-option-disabled`]: disabled,
          [`${prefixCls}-list-option-nomargin`]: index === 0,
        })}
        onClick={disabled ? undefined : onClick}
        onKeyDown={noop}
        aria-hidden="true"
      >
        {multiple && (
          <div style={{ marginTop: '-4px' }}>
            <Checkbox checked={isSelected} disabled={disabled} onChange={noop} />
          </div>
        )}
        <span className={`${prefixCls}-gap-10`} />
        {labelNode}
      </div>
    </div>
  );
};

// ================= RenderTooltip =====================
const RenderTooltip: React.ForwardRefRenderFunction<unknown, TooltipProps> = (props, ref) => {
  const { tooltip, render, getContainer } = props;
  if (tooltip) {
    return (
      <div ref={ref as any}>
        <Tooltip title={tooltip} destroyTooltipOnHide placement="right" getTooltipContainer={getContainer}>
          <div>{render}</div>
        </Tooltip>
      </div>
    );
  }
  return <div ref={ref as any}>{render}</div>;
};
export const ForwardRenderGroup = React.forwardRef(RenderGroup);
export const ForwardRenderOption = React.forwardRef(RenderOption);
export const ForwardRenderTooltip = React.forwardRef(RenderTooltip);
