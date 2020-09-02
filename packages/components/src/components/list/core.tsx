import React from 'react';
import SelectList from './list';
import { SelectCoreProps } from './interface';

interface State {
  options: any[];
  value?: string | string[];
  keyword: string;
  stateChanged: boolean;
}

class SelectCore extends React.Component<SelectCoreProps, State> {
  public static defaultProps: Partial<SelectCoreProps> = {
    showSearch: true,
    // searchableFields: ['name'],
    valueKey: 'value',
    isMultiple: false,
    isLoading: false,
    required: false,
    height: 400,
    rowHeight: 44,
    emptyPlaceholder: '没有找到相关结果',
  };

  public static getDerivedStateFromProps(nextProps: SelectCoreProps, state: State) {
    if (state.stateChanged) {
      return { stateChanged: false };
    }

    if (nextProps.value) {
      return {
        value: nextProps.value,
        options: nextProps.options,
      };
    }

    return state;
  }

  public state: State = {
    options: [],
    value: undefined,
    keyword: '',
    stateChanged: false,
  };

  public componentDidMount() {
    this.setState({
      value: this.props.value,
      options: this.props.options,
    });
  }

  public render() {
    const {
      disabledOptions,
      valueKey,
      renderKey,
      isMultiple,
      allowDuplicate,
      required,
      max,
      width,
      height,
      getGroupIcon,
      onSelect,
      onDeselect,
      emptyPlaceholder,
      labelRenderer,
      rowHeight,
    } = this.props;
    if (this.state.options && this.state.options.length) {
      return (
        <div className="gio-select-core">
          <SelectList
            options={this.state.options}
            disabledOptions={disabledOptions}
            value={this.state.value}
            valueKey={valueKey}
            renderKey={renderKey}
            isMultiple={isMultiple}
            allowDuplicate={allowDuplicate}
            required={required}
            max={max}
            width={width}
            height={height}
            onSelect={onSelect}
            onDeselect={onDeselect}
            onChange={this.handleSelect}
            getGroupIcon={getGroupIcon}
            labelRenderer={labelRenderer}
            rowHeight={rowHeight}
          />
        </div>
      );
    }

    return (
      <div className="gio-select-core">
        <div style={{ padding: '50% 10px 0', textAlign: 'center', height }}>{emptyPlaceholder}</div>
      </div>
    );
  }

  private handleSelect = (value: any) => {
    this.setState({ value, stateChanged: true });
    this.props.onChange(value);
  };
}

export default SelectCore;
