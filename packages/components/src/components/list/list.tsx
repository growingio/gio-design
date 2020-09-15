import React from 'react';
import SelectOption from './option';
import Group from './Group';
import { get } from 'lodash';
import withGroupedOptions from './utils/withGroupedOptions';
import { List } from 'react-virtualized';
import { SelectListProps } from './interface';

interface State {
  value: any | any[];
}

class SelectList extends React.Component<SelectListProps, {}> {
  public static defaultProps: Partial<SelectListProps> = {
    disabledOptions: [],
    isMultiple: false,
    width: 280,
    height: 450,
  };
  public ref: React.RefObject<HTMLDivElement>;
  public state: State = {
    value: null,
  };

  public constructor(props: SelectListProps) {
    super(props);
    this.ref = React.createRef();
  }

  public render() {
    return (
      <div className="gio-select-list-wrapper" ref={this.ref}>
        {this.renderList()}
      </div>
    );
  }

  private getPopupContainer = () => this.ref.current as HTMLElement;

  private renderList = () => {
    const { width, height, disabledOptions, rowHeight } = this.props;
    const getRowHeight = ({ index }: { index: number }) => {
      if (typeof rowHeight === 'function') {
        return rowHeight(this.props.options[index]);
      } else {
        return rowHeight;
      }
    };
    return (
      <List
        value={this.props.value}
        width={width}
        height={height}
        rowCount={this.props.options.length}
        rowHeight={typeof rowHeight === 'function' ? getRowHeight : rowHeight}
        rowRenderer={this.renderListItem(this.props.options)}
        disabledOptions={disabledOptions}
        className="gio-select-list"
      />
    );
  };

  private checkIsMax = (option: any) => {
    const { isMultiple, value, max } = this.props;
    if (Array.isArray(value) && !this.getSelected(option) && isMultiple && max) {
      return value.length >= max;
    } else {
      return false;
    }
  };

  private renderListItem = (options: any) => ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const { isMultiple, required, value, valueKey, renderKey, disabledOptions, labelRenderer } = this.props;
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

    const groupIcon = this.props.getGroupIcon ? this.props.getGroupIcon(option.group) : null;

    return isGroup ? (
      <Group
        key={option.label}
        name={option.label}
        option={option}
        style={{ ...style, height: (style.height as number) - 4, top: (style.top as number) + 8 }}
        icon={groupIcon}
        isSelected={this.getSelected(option)}
        isMultiple={!!this.props.isMultiple}
        labelRenderer={labelRenderer}
      />
    ) : (
      <SelectOption
        key={key}
        style={{ ...style, height: (style.height as number) - 4, top: (style.top as number) + 4 }}
        option={option}
        title={!labelRenderer ? label : undefined}
        isSelected={this.getSelected(option)}
        isMultiple={!!this.props.isMultiple}
        allowDuplicate={this.props.allowDuplicate}
        onSelect={this.handleSelect}
        disabled={disabled}
        hasGroupIcon={!!groupIcon}
        getPopupContainer={this.getPopupContainer}
      >
        {label}
      </SelectOption>
    );
  };

  private handleSelect = (option: any) => {
    const { isMultiple, allowDuplicate, onSelect, onDeselect, onChange } = this.props;

    const isMax = this.checkIsMax(option);

    if (isMax) {
      return;
    }

    const selectedValue = this.getValue(option);
    const isSelected = this.getSelected(option);
    let value;
    if (isSelected && !allowDuplicate) {
      if (onDeselect) {
        onDeselect(selectedValue, this.props.value, option);
      }
      value = isMultiple ? this.props.value.filter((v: any) => v !== selectedValue) : null;
    } else {
      if (onSelect) {
        onSelect(selectedValue, this.props.value, option);
      }
      value = isMultiple ? [...(this.props.value || []), selectedValue] : selectedValue;
    }
    if (onChange) {
      onChange(option);
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
}

const WithGroupList = withGroupedOptions(SelectList);

export default WithGroupList;
