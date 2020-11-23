import React from 'react';
import { get } from 'lodash';
import { List, AutoSizer } from 'react-virtualized';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import SelectOption from './option';
import Group from './Group';
import withGroupedOptions from './utils/withGroupedOptions';
import { SelectListProps } from './interface';

class SelectList extends React.Component<SelectListProps & ConfigConsumerProps> {
  public static defaultProps: Partial<SelectListProps & ConfigConsumerProps> = {
    disabledOptions: [],
    isMultiple: false,
    height: 450,
  };

  public ref: React.RefObject<HTMLDivElement>;

  public constructor(props: SelectListProps & ConfigConsumerProps) {
    super(props);
    this.ref = React.createRef();
  }

  private getPopupContainer = () => this.ref.current as HTMLElement;

  private renderList = () => {
    const { height, disabledOptions, rowHeight, options, value, prefixCls } = this.props;
    const getRowHeight = ({ index }: { index: number }) => {
      if (typeof rowHeight === 'function') {
        return rowHeight(options[index]);
      }
      return rowHeight;
    };
    return (
      <AutoSizer style={{ width: '100%', height }}>
        {({ width }) => (
          <List
            value={value}
            width={width}
            height={height}
            rowCount={options.length}
            rowHeight={typeof rowHeight === 'function' ? getRowHeight : rowHeight}
            rowRenderer={this.renderListItem(options)}
            disabledOptions={disabledOptions}
            className={`${prefixCls}-list`}
          />
        )}
      </AutoSizer>
    );
  };

  private checkIsMax = (option: any) => {
    const { isMultiple, value, max } = this.props;
    if (Array.isArray(value) && !this.getSelected(option) && isMultiple && max) {
      return value.length >= max;
    }
    return false;
  };

  private renderListItem = (options: any) => ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const {
      isMultiple,
      required,
      value,
      valueKey,
      renderKey,
      disabledOptions,
      labelRenderer,
      getGroupIcon,
      allowDuplicate,
    } = this.props;
    const option = options[index];
    const isGroup = get(option, 'type') === 'groupLabel';
    const label = labelRenderer ? labelRenderer(option) : get(option, 'label') || option;
    const optionKey = renderKey || valueKey;
    const key = optionKey ? option[optionKey] : option;

    const isSelectedAndRequired = this.getSelected(option) && required && (isMultiple ? value?.length === 1 : true);

    const isMax = this.checkIsMax(option);

    const disabled =
      isSelectedAndRequired ||
      isMax ||
      disabledOptions.indexOf(valueKey ? option[valueKey] : option) > -1 ||
      option.disabled;

    const groupIcon = getGroupIcon ? getGroupIcon(option.group) : null;

    return isGroup ? (
      <Group
        key={option.label}
        name={option.label}
        option={option}
        style={{ ...style, height: (style.height as number) - 4 }}
        icon={groupIcon}
        isSelected={this.getSelected(option)}
        isMultiple={!!isMultiple}
        labelRenderer={labelRenderer}
      />
    ) : (
      <SelectOption
        key={key}
        style={{ ...style, height: (style.height as number) - 4 }}
        option={option}
        title={!labelRenderer ? label : undefined}
        isSelected={this.getSelected(option)}
        isMultiple={!!isMultiple}
        allowDuplicate={allowDuplicate}
        onSelect={this.handleSelect}
        onClick={this.handleClick}
        disabled={disabled}
        hasGroupIcon={!!groupIcon}
        getPopupContainer={this.getPopupContainer}
      >
        {label}
      </SelectOption>
    );
  };

  private handleClick = (value: any) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(value);
    }
  };

  private handleSelect = (option: any) => {
    const { isMultiple, allowDuplicate, onSelect, onDeselect, onChange, value } = this.props;

    const isMax = this.checkIsMax(option);

    if (isMax) {
      return;
    }

    const selectedValue = this.getValue(option);
    const isSelected = this.getSelected(option);
    let values;
    if (isSelected && !allowDuplicate) {
      if (onDeselect) {
        onDeselect(selectedValue, value, option);
      }
      values = isMultiple ? value.filter((v: any) => v !== selectedValue) : null;
    } else {
      if (onSelect) {
        onSelect(selectedValue, value, option);
      }
      values = isMultiple ? [...(value || []), selectedValue] : selectedValue;
    }
    if (onChange) {
      onChange(values);
    }
  };

  private getValue = (option: any) => {
    const { valueKey } = this.props;
    return valueKey ? option[valueKey] : option;
  };

  private getSelected = (option: any) => {
    const { value, getSelected, isMultiple, valueKey } = this.props;
    if (getSelected) {
      return getSelected(option, value);
    }
    const target = valueKey ? option[valueKey] : option;

    return isMultiple ? value && value.indexOf(target) > -1 : value === target;
  };

  public render() {
    const { prefixCls } = this.props;
    return (
      <div className={`${prefixCls}-list-wrapper`} ref={this.ref}>
        {this.renderList()}
      </div>
    );
  }
}

const WithGroupList = withGroupedOptions(
  withConfigConsumer<SelectListProps>({ subPrefixCls: 'select' })(SelectList)
);

export default WithGroupList;
