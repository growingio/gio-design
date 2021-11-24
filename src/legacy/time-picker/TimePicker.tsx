import React, { Component, ReactNode } from 'react';
import Trigger from 'rc-trigger';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import Panel from './Panel';
import placements, { defaultAlign } from './placements';
import { TimePickerProps } from './interface';

export function noop() {
  /* ... */
}

function refFn(field: string, component: ReactNode) {
  this[field] = component;
}

interface TimePickerState {
  open?: boolean;
  value?: Moment;
}

class Picker extends Component<TimePickerProps, TimePickerState> {
  public static defaultProps = {
    clearText: 'clear',
    prefixCls: 'gio-time-picker-legacy',
    defaultOpen: false,
    inputReadOnly: false,
    style: {},
    className: '',
    inputClassName: '',
    popupClassName: '',
    popupStyle: {},
    align: defaultAlign,
    defaultOpenValue: moment(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    onChange: noop,
    onAmPmChange: noop,
    onOpen: noop,
    onClose: noop,
    onFocus: noop,
    onBlur: noop,
    addon: noop,
    use12Hours: false,
    focusOnOpen: false,
    onKeyDown: noop,
  };

  private saveInputRef: any;

  private savePanelRef: any;

  private picker: any;

  public constructor(props: TimePickerProps) {
    super(props);
    this.saveInputRef = refFn.bind(this, 'picker');
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = props;
    this.state = {
      open,
      value,
    };
  }

  public static getDerivedStateFromProps(props: TimePickerProps, state: TimePickerState) {
    const newState: any = {};
    if ('value' in props) {
      newState.value = props.value;
    }
    if (props.open !== undefined) {
      newState.open = props.open;
    }
    return Object.keys(newState).length > 0
      ? {
          ...state,
          ...newState,
        }
      : null;
  }

  private onPanelChange = (value: Moment) => {
    this.setValue(value);
  };

  private onAmPmChange = (ampm: any) => {
    const { onAmPmChange } = this.props;
    onAmPmChange(ampm);
  };

  private onClear = (event: any) => {
    event.stopPropagation();
    this.setValue(undefined);
    this.setOpen(false);
  };

  private onVisibleChange = (open: boolean) => {
    this.setOpen(open);
  };

  private onEsc = () => {
    this.setOpen(false);
    this.focus();
  };

  private onKeyDown = (e: any) => {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  };

  private setValue(value?: Moment) {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    if (onChange) {
      onChange(value);
    }
  }

  private getFormat() {
    const { format, showHour, showMinute, showSecond, use12Hours } = this.props;
    if (format) {
      return format;
    }

    if (use12Hours) {
      const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
        .filter((item) => !!item)
        .join(':');

      return fmtString.concat(' a');
    }

    return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter((item) => !!item).join(':');
  }

  private getPanelElement() {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      inputReadOnly,
      showHour,
      showMinute,
      showSecond,
      defaultOpenValue,
      clearText,
      addon,
      use12Hours,
      focusOnOpen,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
      clearIcon,
    } = this.props;
    const { value } = this.state;
    return (
      <Panel
        clearText={clearText}
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={value}
        inputReadOnly={inputReadOnly}
        onChange={this.onPanelChange}
        onAmPmChange={this.onAmPmChange}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        showMinute={showMinute}
        showSecond={showSecond}
        onEsc={this.onEsc}
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        addon={addon}
        focusOnOpen={focusOnOpen}
        onKeyDown={onKeyDown}
        clearIcon={clearIcon}
      />
    );
  }

  private getPopupClassName() {
    const { showHour, showMinute, showSecond, use12Hours, prefixCls, popupClassName } = this.props;
    let selectColumnCount = 0;
    if (showHour) {
      selectColumnCount += 1;
    }
    if (showMinute) {
      selectColumnCount += 1;
    }
    if (showSecond) {
      selectColumnCount += 1;
    }
    if (use12Hours) {
      selectColumnCount += 1;
    }
    // Keep it for old compatibility
    return classNames(
      popupClassName,
      {
        [`${prefixCls}-panel-narrow`]: (!showHour || !showMinute || !showSecond) && !use12Hours,
      },
      `${prefixCls}-panel-column-${selectColumnCount}`
    );
  }

  private setOpen(open: boolean) {
    const { onOpen, onClose } = this.props;
    const { open: currentOpen } = this.state;
    if (currentOpen !== open) {
      if (!('open' in this.props)) {
        this.setState({ open });
      }
      if (open) {
        onOpen && onOpen({ open });
      } else {
        onClose && onClose({ open });
      }
    }
  }

  private focus() {
    this.picker.focus();
  }

  // private blur() {
  //   this.picker.blur();
  // }

  private renderClearButton() {
    const { value } = this.state;
    const { prefixCls, allowEmpty, clearIcon, clearText, disabled } = this.props;
    if (!allowEmpty || !value || disabled) {
      return null;
    }

    if (React.isValidElement(clearIcon)) {
      const { onClick } = clearIcon.props || {};
      const clearIconNode = React.cloneElement(clearIcon, {
        onClick: (...args: any) => {
          if (onClick) {
            onClick(...args);
          }
          if (args && args[0]) {
            this.onClear(args[0]);
          }
        },
      });

      return (
        <span role="button" className={`${prefixCls}-clear`}>
          {clearIconNode}
        </span>
      );
    }

    return (
      <button
        type="button"
        className={`${prefixCls}-clear`}
        title={clearText}
        onClick={this.onClear}
        tabIndex={0}
        aria-hidden="true"
      >
        {clearIcon}
      </button>
    );
  }

  public render() {
    const {
      prefixCls,
      placeholder,
      placement = 'bottomRight',
      id,
      disabled,
      transitionName,
      className,
      inputReadOnly,
      name,
      inputIcon,
      inputClassName,
      getPopupContainer,
      autoComplete,
      onFocus,
      onBlur,
      autoFocus,
      style,
      align,
      popupStyle,
    } = this.props;
    const { open, value } = this.state;
    const popupClassName = this.getPopupClassName();
    return (
      <Trigger
        prefixCls={`${prefixCls}-panel`}
        popupClassName={popupClassName}
        popupStyle={popupStyle}
        popup={this.getPanelElement()}
        popupAlign={align}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupTransitionName={transitionName}
        popupVisible={open}
        onPopupVisibleChange={this.onVisibleChange}
      >
        <span className={classNames(prefixCls, className)} style={style}>
          <input
            className={classNames(`${prefixCls}-input`, inputClassName, {
              [`${prefixCls}-input-focus`]: open,
            })}
            ref={this.saveInputRef}
            type="text"
            placeholder={placeholder}
            name={name}
            onKeyDown={this.onKeyDown}
            disabled={disabled}
            value={(value && value.format(this.getFormat())) || ''}
            autoComplete={autoComplete}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
            onChange={noop}
            readOnly={!!inputReadOnly}
            id={id}
            required
          />
          <span role="button" className={`${prefixCls}-addon-icon`}>
            {inputIcon}
          </span>
          {this.renderClearButton()}
        </span>
      </Trigger>
    );
  }
}

export default Picker;
