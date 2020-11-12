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

  constructor(props: SelectCoreProps) {
    super(props);
    this.state = {
      options: [],
      value: undefined,
      keyword: '',
      stateChanged: false,
    };
  }

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

    return { ...state, options: nextProps.options };
  }

  public componentDidMount(): void {
    const { value, options } = this.props;
    this.setState({
      value,
      options,
    });
  }

  private handleSelect = (value: any) => {
    const { onChange, stateless = false, isMultiple } = this.props;
    if (isMultiple || !stateless) {
      if (stateless) {
        // eslint-disable-next-line no-console
        console.warn("stateless can't be used to multiple mode");
      }
      this.setState({ value, stateChanged: true });
    }
    onChange(value);
  };

  public render(): React.ReactElement {
    const {
      disabledOptions,
      valueKey,
      renderKey,
      isMultiple,
      allowDuplicate,
      required,
      max,
      height,
      getGroupIcon,
      onClick,
      onSelect,
      onDeselect,
      emptyPlaceholder,
      labelRenderer,
      rowHeight,
    } = this.props;
    const { options, value } = this.state;
    if (this.state && options?.length) {
      return (
        <div className="gio-select-core">
          <SelectList
            options={options}
            disabledOptions={disabledOptions}
            value={value}
            valueKey={valueKey}
            renderKey={renderKey}
            isMultiple={isMultiple}
            allowDuplicate={allowDuplicate}
            required={required}
            max={max}
            height={height}
            onSelect={onSelect}
            onClick={onClick}
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
}

export default SelectCore;
