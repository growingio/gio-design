import React from 'react';
import { get, isNumber } from 'lodash';
import { List, AutoSizer, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import SelectOption from './option';
import Group from './Group';
import withGroupedOptions from './utils/withGroupedOptions';
import { SelectListProps } from './interface';

class SelectList extends React.Component<SelectListProps & ConfigConsumerProps> {
  public static defaultProps: Partial<SelectListProps & ConfigConsumerProps> = {
    disabledOptions: [],
    isMultiple: false,
  };

  public ref: React.RefObject<HTMLDivElement>;

  public _cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 44,
  });

  public constructor(props: SelectListProps & ConfigConsumerProps) {
    super(props);
    this.ref = React.createRef();
  }

  private renderList = () => {
    const { height, disabledOptions, rowHeight, options, value, prefixCls } = this.props;
    const getRowHeight = ({ index }: { index: number }) => {
      if (typeof rowHeight === 'function') {
        return rowHeight(options[index]);
      }
      return rowHeight;
    };
    return (
      <AutoSizer style={{ width: '100%', height: '100%' }}>
        {({ width }) => (
          <List
            value={value}
            width={width}
            height={2000}
            style={{ height: height || '100%', overflow: 'auto', marginBottom: '-4px' }}
            rowCount={options.length}
            rowHeight={typeof rowHeight === 'function' ? getRowHeight : this._cache.rowHeight}
            deferredMeasurementCache={this._cache}
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

  private renderListItem =
    (options: any) =>
    ({ index, style, parent }: { index: number; style: React.CSSProperties; parent: any }) => {
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
        placement = 'left',
        getPopupContainer,
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
      return (
        <CellMeasurer key={key} cache={this._cache} parent={parent} columnIndex={0} rowIndex={index}>
          {isGroup ? (
            <Group
              key={option.label}
              name={option.label}
              option={option}
              style={{
                ...style,
                height: isNumber(style.height) ? (style.height as number) - 4 : style.height,
                paddingTop: index !== 0 ? '20px' : '0px',
              }}
              icon={groupIcon}
              isSelected={this.getSelected(option)}
              isMultiple={!!isMultiple}
              labelRenderer={labelRenderer}
            />
          ) : (
            <SelectOption
              key={key}
              style={{ ...style, height: isNumber(style.height) ? (style.height as number) - 4 : style.height }}
              option={option}
              title={!labelRenderer ? label : undefined}
              isSelected={this.getSelected(option)}
              isMultiple={!!isMultiple}
              allowDuplicate={allowDuplicate}
              onSelect={this.handleSelect}
              onClick={this.handleClick}
              disabled={disabled}
              hasGroupIcon={!!groupIcon}
              getPopupContainer={getPopupContainer}
              placement={placement}
            >
              {label}
            </SelectOption>
          )}
        </CellMeasurer>
      );
    };

  private handleClick = (value: any) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(value);
    }
  };

  private handleSelect = (option: any) => {
    const { isMultiple, allowDuplicate, onSelect, onDeselect, onChange, value, allowDeselect = true } = this.props;
    const isMax = this.checkIsMax(option);

    if (isMax) {
      return;
    }

    const selectedValue = this.getValue(option);
    const isSelected = this.getSelected(option);
    let values;
    if (isSelected && !allowDuplicate) {
      if (!allowDeselect) {
        return;
      }
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

const WithGroupList = withGroupedOptions(withConfigConsumer<SelectListProps>({ subPrefixCls: 'select' })(SelectList));

export default WithGroupList;
