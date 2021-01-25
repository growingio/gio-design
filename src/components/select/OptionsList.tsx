import React, { useMemo } from 'react';
import { isNull, noop } from 'lodash';
import classnames from 'classnames';
import VirtualList from './VirtualList';
import { OptionsListProps, Option, MaybeArray } from './interface';
import Tooltip from '../tooltip';
import Checkbox from '../checkbox';

interface GroupProps {
  option: Option;
  prefixCls: string;
  groupStyle: React.CSSProperties | undefined;
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
  labelRenderer?: (option: Option, isGruop: false) => React.ReactNode;
  onOptionClick?: (selectedValue: string | number) => void;
  optionStyle?: React.CSSProperties | undefined;
  multiple?: boolean;
  children?: React.ReactNode;
}

const RenderGroup: React.FC<GroupProps> = (props) => {
  const {
    option: { value, label },
    prefixCls,
    groupStyle,
  } = props;
  return (
    <div className={`${prefixCls}-list-group`} style={groupStyle} aria-hidden="true">
      {label !== undefined ? label : value}
    </div>
  );
};

const RenderOption: React.FC<OptionProp> = (props) => {
  const {
    option: { value, disabled, tooltip, groupValue, groupLabel, label, title, ...restOption },
    selected,
    onOptionClick,
    labelRenderer,
    prefixCls,
    optionStyle,
    multiple,
  } = props;
  const isSelected =
    typeof selected === 'string' || typeof selected === 'number' || isNull(selected) || typeof selected === 'undefined'
      ? selected === value
      : selected.includes(value);
  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    if (onOptionClick) {
      onOptionClick(value);
    }
  };
  const labelNode = labelRenderer
    ? labelRenderer(
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
      )
    : title || label;
  return (
    <div className={`${prefixCls}-list-option-container`} style={optionStyle}>
      <div
        className={classnames(`${prefixCls}-list-option`, {
          [`${prefixCls}-list-option-isSelected`]: isSelected,
          [`${prefixCls}-list-option-disabled`]: disabled,
        })}
        onClick={disabled ? undefined : onClick}
        onKeyDown={noop}
        aria-hidden="true"
      >
        {multiple && (
          <>
            <Checkbox checked={isSelected} disabled={disabled} onChange={noop} />
            <span style={{ width: 10 }} />
          </>
        )}
        {labelNode}
      </div>
    </div>
  );
};

const RenderTooltip: React.FC<TooltipProps> = (props) => {
  const { tooltip, render, getContainer } = props;
  if (tooltip) {
    return (
      <Tooltip title={tooltip} destroyTooltipOnHide placement="top" getTooltipContainer={getContainer}>
        {render}
      </Tooltip>
    );
  }
  return render;
};

const getFlattenOptions = (data: Option[], hasGroup: boolean) => {
  const groupMap = new Map();
  if (!hasGroup) return data;
  data?.map((cur: Option) => {
    const gValue = groupMap.get(cur.groupValue);
    if (gValue) {
      const { options, ...rest } = gValue;
      return groupMap.set(cur.groupValue, {
        options: [...options, cur],
        ...rest,
      });
    }
    return groupMap.set(cur.groupValue, {
      label: cur.groupLabel,
      value: cur.groupValue,
      isSelectOptGroup: true,
      options: [cur],
    });
  });
  const flattenOption: Option[] = [];
  groupMap.forEach((value) => {
    flattenOption.push(value);
    flattenOption.push(...value.options);
  });
  return flattenOption;
};
const OptionsList: React.FC<OptionsListProps> = (props) => {
  const { prefixCls, data, groupStyle, hasGroup, height, itemHeight, ...restProps } = props;

  const flattenOptions = useMemo(() => getFlattenOptions(data, hasGroup), [data, hasGroup]);
  return (
    <VirtualList
      itemKey="value"
      prefixCls={prefixCls}
      data={flattenOptions}
      height={height}
      itemHeight={itemHeight}
      {...restProps}
    >
      {(option: Option & { isSelectOptGroup: boolean }) => {
        return option.isSelectOptGroup ? (
          <RenderGroup option={option} prefixCls={prefixCls} groupStyle={groupStyle} />
        ) : (
          <RenderTooltip
            tooltip={option?.tooltip}
            render={<RenderOption option={option} prefixCls={prefixCls} {...restProps} />}
          />
        );
      }}
    </VirtualList>
  );
};

export default OptionsList;
