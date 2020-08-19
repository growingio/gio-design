// TODO: 4.0 - codemod should help to change `filterOption` to support node props.
import * as React from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';
import RcSelect, { Option, OptGroup, SelectProps as RcSelectProps } from 'rc-select';
import { OptionProps } from 'rc-select/lib/Option';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getIcons from './utils/iconUtil';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { Mode } from 'rc-select/lib/interface';

type RawValue = string | number;

export { OptionProps };

export type OptionType = typeof Option;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface InternalSelectProps<VT> extends Omit<RcSelectProps<VT>, 'mode'> {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE';
  bordered?: boolean;
}

export interface SelectProps<VT>
  extends Omit<InternalSelectProps<VT>, 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'> {
  mode?: 'multiple' | 'tags';
}

// We still use class here since `forwardRef` not support generic in typescript
class Select<ValueType extends SelectValue = SelectValue> extends React.Component<SelectProps<ValueType>> {
  public static Option = Option;

  public static OptGroup = OptGroup;

  public static SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  public static defaultProps = {
    transitionName: 'slide-up',
    choiceTransitionName: '',
    bordered: true,
  };

  public selectRef = React.createRef<RcSelect<ValueType>>();

  public focus = () => {
    if (this.selectRef.current) {
      this.selectRef.current.focus();
    }
  };

  public blur = () => {
    if (this.selectRef.current) {
      this.selectRef.current.blur();
    }
  };

  public getMode = () => {
    const { mode } = this.props as InternalSelectProps<ValueType>;

    if ((mode as any) === 'combobox') {
      return undefined;
    }

    if (mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE) {
      return 'combobox';
    }

    return mode;
  };

  public renderSelect = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    direction,
    virtual,
    dropdownMatchSelectWidth,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      notFoundContent,
      className,
      size: customizeSize,
      listHeight = 256,
      listItemHeight = 24,
      getPopupContainer,
      dropdownClassName,
      bordered,
    } = this.props as InternalSelectProps<ValueType>;

    const prefixCls = getPrefixCls('select', customizePrefixCls);
    const mode = this.getMode();

    const isMultiple = mode === 'multiple' || mode === 'tags';

    // ===================== Empty =====================
    let mergedNotFound: React.ReactNode;
    if (notFoundContent !== undefined) {
      mergedNotFound = notFoundContent;
    } else if (mode === 'combobox') {
      mergedNotFound = null;
    } else {
      mergedNotFound = null;
    }

    // ===================== Icons =====================
    const { suffixIcon, itemIcon, removeIcon, clearIcon } = getIcons({
      ...this.props,
      multiple: isMultiple,
      prefixCls,
    });

    const selectProps = omit(this.props, [
      'prefixCls',
      'suffixIcon',
      'itemIcon',
      'removeIcon',
      'clearIcon',
      'size',
      'bordered',
    ]);

    return (
      <SizeContext.Consumer>
        {(size) => {
          const mergedSize = customizeSize || size;
          const mergedClassName = classNames(className, {
            [`${prefixCls}-lg`]: mergedSize === 'large',
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-borderless`]: !bordered,
          });

          return (
            <RcSelect<ValueType>
              ref={this.selectRef}
              virtual={virtual}
              dropdownMatchSelectWidth={dropdownMatchSelectWidth}
              {...selectProps}
              listHeight={listHeight}
              listItemHeight={listItemHeight}
              mode={mode as Mode}
              prefixCls={prefixCls}
              direction={direction}
              inputIcon={suffixIcon}
              menuItemSelectedIcon={itemIcon}
              removeIcon={removeIcon}
              clearIcon={clearIcon}
              notFoundContent={mergedNotFound}
              className={mergedClassName}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              dropdownClassName={dropdownClassName}
            />
          );
        }}
      </SizeContext.Consumer>
    );
  };

  public render() {
    return <ConfigConsumer>{this.renderSelect}</ConfigConsumer>;
  }
}

export default Select;
