import React, { Component } from 'react';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
// import Header from './Header';
import Combobox from './Combobox';
import { PanelProps } from './interface';

function noop() {}

function generateOptions(length: number, disabledOptions: number[], hideDisabledOptions: boolean, step = 1) {
  const arr = [];
  for (let value = 0; value < length; value += step) {
    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
      arr.push(value);
    }
  }
  return arr;
}

function toNearestValidTime(time: Moment, hourOptions: number[], minuteOptions: number[], secondOptions: number[]) {
  const hour = hourOptions.slice().sort((a, b) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0];
  const minute = minuteOptions.slice().sort((a, b) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0];
  const second = secondOptions.slice().sort((a, b) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0];
  return moment(`${hour}:${minute}:${second}`, 'HH:mm:ss');
}
interface PanelState {
  value: Moment;
  currentSelectPanel: any;
}
class Panel extends Component<PanelProps, PanelState> {
  public static defaultProps = {
    prefixCls: 'rc-time-picker-panel',
    onChange: noop,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    defaultOpenValue: moment(),
    use12Hours: false,
    addon: noop,
    onKeyDown: noop,
    onAmPmChange: noop,
    inputReadOnly: false,
  };

  public static state = {};

  static getDerivedStateFromProps(props: PanelProps, state: PanelState) {
    if ('value' in props) {
      return {
        ...state,
        value: props.value,
      };
    }
    return null;
  }

  private onChange = (newValue: Moment) => {
    const { onChange } = this.props;
    this.setState({ value: newValue });
    if (onChange) {
      onChange(newValue);
    }
  };

  private onAmPmChange = (ampm: any) => {
    const { onAmPmChange } = this.props;
    onAmPmChange(ampm);
  };

  private onCurrentSelectPanelChange = (currentSelectPanel: any) => {
    this.setState({ currentSelectPanel });
  };

  private disabledHours = () => {
    const { use12Hours, disabledHours } = this.props;
    let disabledOptions = disabledHours && disabledHours();
    if (use12Hours && Array.isArray(disabledOptions)) {
      if (this.isAM()) {
        disabledOptions = disabledOptions.filter((h) => h < 12).map((h) => (h === 0 ? 12 : h));
      } else {
        disabledOptions = disabledOptions.map((h) => (h === 12 ? 12 : h - 12));
      }
    }
    return disabledOptions;
  };

  // https://github.com/ant-design/ant-design/issues/5829
  // private close() {
  //   const { onEsc } = this.props;
  //   onEsc();
  // }

  private isAM() {
    const { defaultOpenValue } = this.props;
    const { value } = this.state;
    const realValue = value || defaultOpenValue;
    return realValue.hour() >= 0 && realValue.hour() < 12;
  }

  public render() {
    const {
      prefixCls,
      className,
      // placeholder,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      showHour,
      showMinute,
      showSecond,
      format,
      defaultOpenValue,
      // clearText,
      onEsc,
      addon,
      use12Hours,
      // focusOnOpen,
      // onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
      // inputReadOnly,
      // clearIcon,
    } = this.props;
    const { value } = this.state;
    const disabledHourOptions = this.disabledHours();
    const disabledMinuteOptions = disabledMinutes && disabledMinutes(value ? value.hour() : undefined);
    const disabledSecondOptions =
      disabledSeconds && disabledSeconds(value ? value.hour() : undefined, value ? value.minute() : undefined);
    const hourOptions = generateOptions(24, disabledHourOptions || [], !!hideDisabledOptions, hourStep);
    const minuteOptions = generateOptions(60, disabledMinuteOptions || [], !!hideDisabledOptions, minuteStep);
    const secondOptions = generateOptions(60, disabledSecondOptions || [], !!hideDisabledOptions, secondStep);

    const validDefaultOpenValue =
      defaultOpenValue && toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);

    return (
      <div className={classNames(className, `${prefixCls}-inner`)}>
        <Combobox
          prefixCls={prefixCls}
          value={value}
          defaultOpenValue={validDefaultOpenValue}
          format={format}
          onChange={this.onChange}
          onAmPmChange={this.onAmPmChange}
          showHour={showHour}
          showMinute={showMinute}
          showSecond={showSecond}
          hourOptions={hourOptions}
          minuteOptions={minuteOptions}
          secondOptions={secondOptions}
          disabledHours={this.disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
          use12Hours={use12Hours}
          onEsc={onEsc}
          isAM={this.isAM()}
        />
        {addon(this)}
      </div>
    );
  }
}

export default Panel;
